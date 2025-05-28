'use client'
import { useEffect, useState } from "react"
import axios from 'axios';
import { useRouter } from "next/navigation";


export default function Profile() {
    const [user, setUser] = useState<{ email: string; date_joined: string } | null>(null);
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
        .then((res) => {
            setUser(res.data);
        })
        .catch((err) => {
            console.error(err);
            setError('دریافت اطلاعات ناموفق بود.')
        });
    }, []);

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl fon-bold mb-4">
                پروفایل من
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            {user ? (
                <div className="space-y-2">
                    <p>ایمیل :  {user.email}</p>
                    <p>تاریخ عضویت : {new Date(user.date_joined).toLocaleDateString('fa-IR')}</p>
                </div>
            ) : (
                <p>در حال بارگزاری ...</p>
            )}
        </div>
    );
}