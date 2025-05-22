'use client'
import React, { FormEvent, useState } from 'react'
import axios from "axios"
import { useRouter } from "next/navigation"

const Login: React.FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("") // پاک کردن ارور قبلی

        const body = JSON.stringify({ email, password });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            timeout: 5000,
        };

        const url = "https://fitbond-backend.onrender.com/api/token/";

        try {
            const response = await axios.post(url, body, config);

            if (response.data.access) {
                localStorage.setItem("access", response.data.access);
                localStorage.setItem("refresh", response.data.refresh);
                router.push("/habitlog")
            } else {
                setError("ورود ناموفق بود.")
            }
        } catch (error: any) {
            console.log("Login failed:", error);
            setError("ورود ناموفق بود. لطفاً ایمیل و رمز را بررسی کن.")
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">ورود به فیت‌باند</h1>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder='ایمیل'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder='رمز عبور'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                />
                <button type='submit' className="w-full bg-blue-500 text-white py-2 rounded">
                    ورود
                </button>
            </form>
        </div>
    );
};

export default Login
