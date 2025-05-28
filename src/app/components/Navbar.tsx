'use client';

import Link from 'next/link';
// import { useEffect, useState } from 'react';

const Navbar = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //     const access = localStorage.getItem('access');
    //     setIsLoggedIn(!!access);
    // }, []);

    return (
        <header className="w-full p-4 bg-[#4b2e83] text-white flex justify-between items-center">
            <Link href="/" className="text-lg font-bold">
                🍏FitBond
            </Link>
            <nav className="space-x-4 flex gap-2">
                <>
                    <Link href="/profile" className="hover:border-b-2">👤 پروفایل</Link>
                    <Link href="/login" className="hover:border-b-2">ورود</Link>
                    <Link href="/register" className="hover:border-b-2">ثبت‌نام</Link>
                </>
            </nav>
        </header>
    );
};

export default Navbar;
