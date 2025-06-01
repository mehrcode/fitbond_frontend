import { useEffect, useState } from 'react'
import DashboardCard from '../components/DashboardCard'

export default function HomePage() {
    const [data, setData] = useState({
        submit_count: 0,
        active_days: 0,
        streak: 0, // بعداً اضافه می‌شه
    })

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8000/habit/submit-count/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({}), // اگه نیازی به دیتا نداری
            })

            if (res.ok) {
                const json = await res.json()
                setData(json)
            } else {
                console.error('🚨 خطا در دریافت دیتا')
            }
        }

        fetchData()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-100 to-yellow-100 p-6">
            <div className="max-w-md mx-auto">
                <DashboardCard {...data} />
            </div>
        </div>
    )
}
