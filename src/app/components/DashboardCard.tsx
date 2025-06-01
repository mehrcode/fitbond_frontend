interface Props {
    submit_count: number
    active_days: number
    streak: number
}

export default function DashboardCard({ submit_count, active_days, streak }: Props) {
    const cards = [
        {
            label: '📅 تعداد لاگ‌ها',
            value: submit_count,
            color: 'bg-yellow-200',
        },
        {
            label: '🔥 روزهای فعال',
            value: active_days,
            color: 'bg-orange-200',
        },
        {
            label: '🎯 استمرار',
            value: streak,
            color: 'bg-green-200',
        },
    ]

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {cards.map((item, index) => (
                <div
                    key={index}
                    className={`${item.color} rounded-lg p-4 shadow text-center transition hover:scale-105`}
                >
                    <div className="text-2xl font-bold">{item.value}</div>
                    <div className="text-sm mt-2">{item.label}</div>
                </div>
            ))}
        </div>
    )
}
