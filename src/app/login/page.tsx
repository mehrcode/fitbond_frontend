'use client'
import React, { FormEvent, useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://fitbond-backend.onrender.com/api/token/",
                {
                    email,
                    password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )

            if (response.data.access) {
                localStorage.setItem("access", response.data.access)
                localStorage.setItem("refresh", response.data.refresh)
                router.push("/habitlog")
            }
        } catch (error) {
            alert("ورود ناموفق بود. لطفاً اطلاعات را بررسی کن.")
            console.error("Login error:", error)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded">
            <h1 className="text-xl font-bold mb-4">ورود به فیت‌ باند</h1>
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

export default Login;
