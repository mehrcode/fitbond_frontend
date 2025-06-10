'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            email,
            password1,
            password2,
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        };

        const url = 'http://127.0.0.1:8000/account/register/';

        try {
            const response = await axios.post(url, formData, config);
            if (response.data) {
                console.log(response.data);
                router.push('/login');
            }
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#f7f7f5] px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg border-4 border-[#ff5734]/30 px-6 py-8">
                <h1 className="text-3xl font-retro font-bold text-center text-[#151313] mb-6">
                    ثبت‌نام در <span className="text-[#ff5734]">کانسیس</span> 🎠
                </h1>

                <form onSubmit={handleRegisterSubmit} className="space-y-4 font-retro text-[#151313]">
                    <div>
                        <label className="block mb-1 text-sm font-semibold">ایمیل</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="email@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-[#ccc] px-4 py-2 focus:ring-2 focus:ring-[#be94f5] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-semibold">رمز عبور</label>
                        <input
                            type="password"
                            value={password1}
                            placeholder="••••••••"
                            onChange={(e) => setPassword1(e.target.value)}
                            className="w-full rounded-xl border border-[#ccc] px-4 py-2 focus:ring-2 focus:ring-[#be94f5] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-semibold">تکرار رمز عبور</label>
                        <input
                            type="password"
                            value={password2}
                            placeholder="••••••••"
                            onChange={(e) => setPassword2(e.target.value)}
                            className="w-full rounded-xl border border-[#ccc] px-4 py-2 focus:ring-2 focus:ring-[#be94f5] focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-[#ff5734] hover:bg-[#ff5734]/90 text-white font-bold text-lg py-3 rounded-xl transition-all duration-200"
                    >
                        🎉 ثبت‌نام کن
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    قبلاً اکانت ساختی؟{' '}
                    <a href="/login" className="text-[#be94f5] hover:underline">
                        ورود
                    </a>
                </p>
            </div>
        </main>
    );
};

export default Register;
