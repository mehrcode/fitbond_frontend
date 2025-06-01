'use client'
import { useEffect, useState } from 'react'
import DashboardCard from '../components/DashboardCard'

export default function HomePage() {
    const [data, setData] = useState({
        submit_count: 0,
        active_days: 0,
        streak: 0, // استمرار
    })

    const [form, setForm] = useState({
        walking_steps: '',
        exercise_minutes: '',
        exercise_description: '',
    })

    const [message, setMessage] = useState('')

    const fetchStats = async () => {
        const res = await fetch("http://localhost:8000/habit/stats/", {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        if (res.ok) {
            const json = await res.json()
            setData(json)
        }
    }
    const getToken = () => localStorage.getItem('access') || localStorage.getItem('token');

    const submitLog = async (e: any) => {
        e.preventDefault()
        const res = await fetch('http://localhost:8000/habit/logs/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`,

            },
            body: JSON.stringify(form),
        })

        if (res.ok) {
            setMessage('ثبت شد! 🐢👏')
            setForm({
                walking_steps: '',
                exercise_minutes: '',
                exercise_description: '',
            })
            fetchStats()
        } else {
            setMessage('مشکلی پیش اومد 😢')
        }
    }

    useEffect(() => {
        fetchStats()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-100 to-yellow-100 p-6 text-gray-900">
            <div className="max-w-md mx-auto space-y-6">

                {/* فرم ثبت لاگ */}
                <form onSubmit={submitLog} className="bg-white p-4 rounded-lg shadow space-y-4 text-right">
                    <h2 className="text-lg font-bold">ثبت فعالیت امروز 🎯</h2>
                    <input
                        type="number"
                        placeholder="تعداد قدم"
                        value={form.walking_steps}
                        onChange={(e) => setForm({ ...form, walking_steps: e.target.value })}
                        className="w-full border p-2 rounded text-right"
                    />
                    <input
                        type="number"
                        placeholder="دقایق تمرین"
                        value={form.exercise_minutes}
                        onChange={(e) => setForm({ ...form, exercise_minutes: e.target.value })}
                        className="w-full border p-2 rounded text-right"
                    />
                    <textarea
                        placeholder="توضیح کوتاه (اختیاری)"
                        value={form.exercise_description}
                        onChange={(e) => setForm({ ...form, exercise_description: e.target.value })}
                        className="w-full border p-2 rounded text-right"
                    />
                    <button
                        type="submit"
                        className="bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-500"
                    >
                        حله  🚀
                    </button>
                    {message && <p className="text-sm text-green-600">{message}</p>}
                </form>

                {/* آمار شخصی */}
                <div className="bg-white p-4 rounded-lg shadow space-y-2 text-right">
                    <DashboardCard {...data} />
                </div>
            </div>
        </div>
    )
}
