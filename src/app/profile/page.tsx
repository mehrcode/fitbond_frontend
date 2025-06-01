'use client'
import { useEffect, useState } from "react"
import axios from 'axios';
import { useRouter } from "next/navigation";

interface UserProfile {
    email: string,
    phone: string,
    username: string,
    first_name: string,
    last_name: string,
    date_joined: string,
    last_login?: string,
}

export default function Profile() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const accessToken = localStorage.getItem('access');
        if (!accessToken) {
            router.push('/login');
            return;
        }

        axios.get('http://localhost:8000/account/profile/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((res) => setUser(res.data))
            .catch((err) => {
                console.error(err);
                setError('دریافت اطلاعات ناموفق بود.');
            });
    }, []);

    return (
        <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-yellow-50 via-pink-100 to-purple-100 rounded-2xl shadow-xl border-[3px] border-dashed border-purple-400 mt-8">
            <h1 className="text-3xl font-extrabold text-purple-700 text-center mb-6 tracking-wider">
                🎠 پروفایل کاربری 🎠
            </h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {user ? (
                <div className="space-y-3 text-purple-900 text-lg font-semibold px-2">
                    <ProfileRow label="ایمیل" value={user.email} />
                    <ProfileRow label="تلفن" value={user.phone || 'ثبت نشده'} />
                    <ProfileRow label="نام کاربری" value={user.username} />
                    <ProfileRow label="اسم" value={user.first_name || 'ثبت نشده'} />
                    <ProfileRow label="فامیل" value={user.last_name || 'ثبت نشده'} />
                    <ProfileRow label="تاریخ عضویت" value={new Date(user.date_joined).toLocaleDateString('fa-IR')} />
                    <ProfileRow label="آخرین ورود" value={user.last_login ? new Date(user.last_login).toLocaleDateString('fa-IR') : 'نامشخص'} />
                </div>
            ) : (
                <p className="text-center text-gray-600 mt-4">در حال بارگذاری ...</p>
            )}
        </div>
    );
}

function ProfileRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex justify-between items-center bg-white/70 rounded-xl px-4 py-2 shadow-sm border border-purple-200 hover:bg-white/90 transition-all duration-300">
            <span className="text-purple-600">{label}:</span>
            <span className="text-purple-900">{value}</span>
        </div>
    )
}
