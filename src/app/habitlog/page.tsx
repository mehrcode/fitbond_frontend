'use client'
import React, { useState } from "react"
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
    user_id: string;
}

export default function Habitlog() {
    const [exerciseMinutes, setExerciseMinutes] = useState<number>(0);
    const [exerciseDescription, setExerciseDescription] = useState("");
    const [walkingSteps, setWalkingSteps] = useState<number>(0);
    // const [userId, setUserId] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        };
        
        const token = localStorage.getItem("access");
        const userId = token ? jwtDecode<CustomJwtPayload>(token).user_id : null;

        console.log(userId)

        const body = {
            exercise_minutes: exerciseMinutes,
            exercise_description: exerciseDescription,
            walking_steps: walkingSteps,
            // user_id: "4ce73c2c2df544fda6f52b98cee512db" // کد فرهنگ
            user_id: userId // پیشنهاد جیبوتی
        };

        if (!userId) {
            alert("user not logged in.");
            return;
        }

        const url = "http://127.0.0.1:8000/habit/logs/create/";

        const response = await axios.post(url, body, config)

        if (response.data) {
            console.log(response.data);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="p-4 max-w-md mx-auto bg-black">
                    <h2 className="text-xl font-bold mb-4">HabitLog</h2>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">دقایق ورزش</label>
                        <input
                            type="number"
                            value={exerciseMinutes}
                            onChange={(e) => setExerciseMinutes(Number(e.target.value))}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">نوع ورزش</label>
                        <input
                            type="text"
                            value={exerciseDescription}
                            onChange={(e) => setExerciseDescription(e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                            placeholder="مثلا یوگا یا پیلاتس"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-1 font-medium">تعداد قدم ها</label>
                        <input
                            type="number"
                            value={walkingSteps}
                            onChange={(e) => setWalkingSteps(Number(e.target.value))}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                        ثبت اطلاعات
                    </button>

                </div>
            </form>
        </div>
    );
}