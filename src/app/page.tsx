'use client';
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";


export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      router.push("/home");
    }
  }, []);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold mb-6'>به فیت باند خوش اومدی</h1>
      <p className='mb-8 text-center'>
        برای شروع اول ورود کن یا ثبت نام کن
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/login")}
          className='px-6 py-3 bg-[#4b2e83] hover:bg-[#3a2466] text-white rounded font-semibold'>
          ورود
        </button>
        <button
          onClick={() => router.push("/register")}
          className='px-6 py-3 bg-[#4b2e83] hover:bg-[#3a2466] text-white rounded font-semibold'
        >
          ثبت نام
        </button>
      </div>
    </div>
  );
}
