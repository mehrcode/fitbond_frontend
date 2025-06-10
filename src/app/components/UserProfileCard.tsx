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
        <div className="bg-[#be94f5]/30 rounded-xl p-6 shadow-lg w-full max-w-md font-retro mx-auto mt-6">
            <div className="flex flex-col items-center space-y-2 text-[#151313]">
                {profile.profile_image ? (
                    <img
                        src={profile.profile_image}
                        alt="profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-[#ff5734] text-white flex items-center justify-center text-2xl font-bold shadow">
                        {profile.username[0].toUpperCase()}
                    </div>
                )}
                <h2 className="text-xl font-bold">{profile.first_name} {profile.last_name}</h2>
                <p className="text-sm text-[#333]">{profile.email}</p>
                <p className="text-center text-sm mt-2">{profile.bio || 'بیوگرافی وارد نشده.'}</p>

                <div className="mt-4 w-full space-y-1 text-sm">
                    {profile.location && <p><span className="font-semibold">📍 موقعیت:</span> {profile.location}</p>}
                    {profile.phone && <p><span className="font-semibold">📞 تلفن:</span> {profile.phone}</p>}
                    {profile.date_of_birth && <p><span className="font-semibold">🎂 تولد:</span> {profile.date_of_birth}</p>}
                    {profile.instagram_url && (
                        <p><span className="font-semibold">📸 اینستاگرام:</span> <a href={profile.instagram_url} className="underline text-blue-600" target="_blank">{profile.instagram_url}</a></p>
                    )}
                    {profile.website_url && (
                        <p><span className="font-semibold">🌐 وب‌سایت:</span> <a href={profile.website_url} className="underline text-blue-600" target="_blank">{profile.website_url}</a></p>
                    )}
                    {profile.interests && <p><span className="font-semibold">🎨 علاقه‌مندی‌ها:</span> {profile.interests}</p>}
                </div>
            </div>
        </div>
    );
};


export default UserProfileCard;