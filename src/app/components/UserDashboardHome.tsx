import React from "react"
import { TrackList } from "./TrackList"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"


export const UserDashboardHome = () => {
    return (
        <div className="p-6 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-fccc42">سلام مهرنوش! 👋</h1>
                    <p className="text-be94f5 text-sm mt-1">آماده‌ای یه قدم دیگه برداری؟ 🎠</p>
                </div>
                <Button className="bg-ff5734 text-white hover:bg-opacity-80 rounded-xl">
                    <Sparkles className="mr-2 h-5 w-5" />
                    ساخت مسیر جدید
                </Button>
            </div>

            {/* Track List Section */}
            <TrackList />

            {/* Placeholder for Quote or More Widgets */}
            <div className="bg-[#2b2b2b] text-f7f7f5 p-4 rounded-xl text-sm italic">
                “قدم کوچیک امروز، موفقیت بزرگ فرداست.” 🚶‍♀️🌈
            </div>
        </div>
    )
}