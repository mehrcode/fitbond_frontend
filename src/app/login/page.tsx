'use client'
import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // 👈 برای نمایش ارور
    const router = useRouter();

    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(""); // هر بار ریستش کنیم

        try {
            const response = await axios.post(
                "https://fitbond-backend.onrender.com/api/token/",
                {
                    email,
                    password
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }
            );

            localStorage.setItem("access", response.data.access);
            router.push("/habitlog");
        } catch (err: any) {
            console.error("Login failed:", err);
            if (err.response && err.response.status === 401) {
                setError("ایمیل یا رمز عبور اشتباه است.");
            } else {
                setError("مشکلی در ورود پیش آمد. دوباره امتحان کنید.");
            }
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">ورود به فیت‌باند</h2>
            <form onSubmit={handleLoginSubmit}>
                <input
                    type="email"
                    placeholder="ایمیل"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-3 px-3 py-2 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="رمز عبور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-3 px-3 py-2 border rounded"
                    required
                />
                {error && (
                    <div className="text-red-600 text-sm mb-3">{error}</div>
                )}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    ورود
                </button>
            </form>
        </div>
    );
}
