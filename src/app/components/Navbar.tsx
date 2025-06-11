'use client'
import { FaBell } from "react-icons/fa";
import Image from "next/image";


type Props = {
    username: string;
    profile_image: string;
};

export default function Navbar({ username, profile_image }: Props) {

    const fullImageUrl = profile_image
        ? (profile_image.startsWith("http")
            ? profile_image
            : `http://localhost:8000${profile_image}`)
        : "/avatar_placeholder.png";

    return (
        <nav className="w-full flex justify-between items-center px-6 py-3 bg-[#151313] text-[#f7f7f5] rounded-xl shadow-lg mb-4 font-kodchasan">
            {/* Left: Bell Icon */}
            <div className="relative">
                <FaBell className="w-6 h-6 text-[#fccc42] hover:animate-bounce cursor-pointer" />
                {/* نوتیف آیکن قرمزی برای آینده */}
                <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
            </div>
            {/* Right: User Info */}
            <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#be94f5]">
                    <img
                        src="/avatar_placeholder.png"
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <span className="text-base font-semibold">{username}</span>
            </div>


        </nav>
    )
}