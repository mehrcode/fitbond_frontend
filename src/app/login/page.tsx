'use client'
import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const body = { email, password };
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        };

        const url = process.env.NEXT_PUBLIC_API_URL + "/api/account/";
        const response = await axios.post(url, body, config);

        if (response.data.access) {
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            router.push('/home');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-100 to-yellow-100 p-6 text-gray-900">
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow space-y-6 text-right">
                <h1 className="text-2xl font-bold text-center text-pink-600">ورود به فیت‌باند 🐢</h1>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="ایمیل"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded text-right"
                        required
                    />
                    <input
                        type="password"
                        placeholder="رمز عبور"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded text-right"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-pink-400 text-white py-2 rounded hover:bg-pink-500 transition"
                        disabled={loading}
                    >
                        {loading ? 'لطفاً منتظر بمانید...' : 'ورود 🚀'}
                    </button>
                </form>
            </div>
        </div>

    );
};

export default Login;
