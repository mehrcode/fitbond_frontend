type Props = {
    submit_count: number
    active_days: number
    streak: number
}

export default function DashboardCard({ submit_count, active_days, streak }: Props) {
    const percent = Math.min((streak / 7) * 100, 100)

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
            <h1 className="text-2xl font-bold text-center">🎠 خوش اومدی به مسیر پیشرفتت!</h1>

            <div className="grid grid-cols-3 text-center text-sm text-gray-600">
                <div>
                    <p className="text-3xl font-bold text-pink-500">🔥 {streak}</p>
                    <p>استریک</p>
                </div>
                <div>
                    <p className="text-3xl font-bold text-blue-500">📅 {active_days}</p>
                    <p>روز فعال</p>
                </div>
                <div>
                    <p className="text-3xl font-bold text-green-500">✅ {submit_count}</p>
                    <p>ثبت‌ها</p>
                </div>
            </div>

            <div>
                <p className="text-center text-sm mb-2">لاک‌پشتت در مسیر پیشرفته 🐢</p>
                <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                        <div className="bg-green-400 h-4" style={{ width: `${percent}%` }} />
                    </div>
                    <span className="text-xs text-gray-500">{streak}/7</span>
                </div>
            </div>

            <div className="text-center text-sm">
                {streak < 7 ? `اگه امروز ثبت کنی، می‌رسی به ${streak + 1} روز استریک! ✨` : `تو یه قهرمانی! استریکت به ۷ رسید 🏆`}
            </div>

            <div className="text-center">
                <a href="/habit/log" className="inline-block bg-pink-400 text-white px-6 py-2 rounded-full shadow hover:bg-pink-500 transition">
                    📥 ثبت امروزت
                </a>
            </div>
        </div>
    )
}
