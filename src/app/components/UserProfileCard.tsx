'use client'
import React, { useState, useEffect } from "react";
import axios from 'axios';

interface UserProfile {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    date_of_birth?: string;
    phone: number;
    bio: string;
    location?: string;
    instagram_url?: string;
    website_url?: string;
    interests?: string;
    profile_image?: string;
    date_joined: string;
    last_login: string;
}

const UserProfileCard: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const accessToken = localStorage.getItem('access');
                const response = await axios.get('http://localhost:8000/api/account/profile/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="rounded-xl border-2 border-[#be94f5]/30 bg-white p-4 shadow-md text-center">
                در حال بارگذاری پروفایل...
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="rounded-xl border-2 border-red-400 bg-white p-4 shadow-md text-center">
                خطا در دریافت پروفایل 😢
            </div>
        );
    }

    return (
        <div className="rounded-xl border-2 border-[#be94f5]/30 bg-white p-6 shadow-md space-y-2 font-retro">
            <h2 className="text-lg font-bold text-[#151313]">پروفایل من 👤</h2>
            <p><span className="font-semibold">نام کاربری:</span> {profile.username}</p>
            <p><span className="font-semibold">ایمیل:</span> {profile.email}</p>
            <p><span className="font-semibold">نام:</span> {profile.first_name} {profile.last_name}</p>
            <p><span className="font-semibold">بیو:</span> {profile.bio || '—'}</p>
            {profile.location && <p><span className="font-semibold">موقعیت:</span> {profile.location}</p>}
            {profile.phone && <p><span className="font-semibold">شماره تماس:</span> {profile.phone}</p>}
            {profile.date_of_birth && <p><span className="font-semibold">تولد:</span> {profile.date_of_birth}</p>}
            {profile.instagram_url && <p><span className="font-semibold">اینستاگرام:</span> <a className="text-blue-600 underline" href={profile.instagram_url} target="_blank">{profile.instagram_url}</a></p>}
            {profile.website_url && <p><span className="font-semibold">وب‌سایت:</span> <a className="text-blue-600 underline" href={profile.website_url} target="_blank">{profile.website_url}</a></p>}
            {profile.interests && <p><span className="font-semibold">علاقه‌مندی‌ها:</span> {profile.interests}</p>}
        </div>
    );
};


export default UserProfileCard;