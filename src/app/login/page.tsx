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

        try {
            
            const response = await axios.post(url, body, config);
            if (response.data.access) {
                localStorage.setItem('access', response.data.access);
                localStorage.setItem('refresh', response.data.refresh);
                router.push('/home');
            }
        } catch(error){
            console.log(error)
        }



        setLoading(false);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#f7f7f5] px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg border-4 border-[#ff5734]/30 px-6 py-8">
                <h1 className="text-3xl font-retro font-bold text-center text-[#151313] mb-6">
                    ورود به <span className="text-[#ff5734]">کانسیس</span> 🐢
                </h1>

                <form onSubmit={handleLoginSubmit} className="space-y-4 font-retro text-[#151313]">
                    <div>
                        <label className="block mb-1 text-sm font-semibold">ایمیل</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="email@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-[#ccc] px-4 py-2 focus:ring-2 focus:ring-[#be94f5] focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-semibold">رمز عبور</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-[#ccc] px-4 py-2 focus:ring-2 focus:ring-[#be94f5] focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-[#ff5734] hover:bg-[#ff5734]/90 text-white font-bold text-lg py-3 rounded-xl transition-all duration-200"
                        disabled={loading}
                    >
                        {loading ? 'در حال ورود...' : '🚀 ورود'}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    هنوز ثبت‌نام نکردی؟{' '}
                    <a href="/register" className="text-[#be94f5] hover:underline">
                        ثبت‌نام
                    </a>
                </p>
            </div>
        </main>

    );
};

export default Login;
