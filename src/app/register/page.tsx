'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const handleLoginSubmit = async (e: React.FormEvent) => {
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
        <div className="max-w-md mx-auto mt-10 p-6 bg-[#fdf6e3] rounded-2xl shadow-retro border-4 border-[#ffb347] text-black">
            <h1 className="text-2xl font-bold mb-6 text-center text-[#4b2e83] font-retro">
                ثبت‌ نام  
            </h1>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 text-[#4b2e83] font-retro">ایمیل</label>
                    <input
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 rounded-lg border border-[#f7c59f] focus:outline-none focus:ring-2 focus:ring-[#ffb347] bg-white"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-[#4b2e83] font-retro">رمز عبور</label>
                    <input
                        type="password"
                        placeholder="رمز عبور را وارد کنید"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        className="w-full p-2 rounded-lg border border-[#f7c59f] focus:outline-none focus:ring-2 focus:ring-[#ffb347] bg-white"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-[#4b2e83] font-retro">تکرار رمز عبور</label>
                    <input
                        type="password"
                        placeholder="رمز را دوباره وارد کنید"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        className="w-full p-2 rounded-lg border border-[#f7c59f] focus:outline-none focus:ring-2 focus:ring-[#ffb347] bg-white"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-[#4b2e83] text-white rounded-xl font-retro text-lg hover:bg-[#7b4bbb] transition duration-200 mt-4"
                >
                    🎠 بزن بریم
                </button>
            </form>
        </div>
    );
};

export default Register;
