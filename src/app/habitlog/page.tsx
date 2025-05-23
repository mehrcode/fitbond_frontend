'use client'

import React, { useState, useEffect } from "react"
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
    user_id: string;
}

export default function Habitlog() {
    const [exerciseMinutes, setExerciseMinutes] = useState<number>(0);
    const [exerciseDescription, setExerciseDescription] = useState("");
    const [walkingSteps, setWalkingSteps] = useState<number>(0);
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    // 👇 دریافت توکن و userId فقط در مرورگر
    useEffect(() => {
        const storedToken = localStorage.getItem("access");
        setToken(storedToken);
        if (storedToken) {
            const decoded = jwtDecode<CustomJwtPayload>(storedToken);
            setUserId(decoded.user_id);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token || !userId) {
            alert("user not logged in.");
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
        };

        const body = {
            exercise_minutes: exerciseMinutes,
            exercise_description: exerciseDescription,
            walking_steps: walkingSteps,
        };

        try {
            const response = await axios.post(
                "http://localhost:8000/habit/logs/create/",
                body,
                config
            );

            if (response.data) {
                console.log(response.data);
            }
        } catch (error) {
            console.log("Error submitting log:", error);
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
