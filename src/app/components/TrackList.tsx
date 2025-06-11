import React, { useEffect, useState } from "react"
import axios from "axios"

type Track = {
    id: number
    name: string
    goal: string
    unit: string
    created_at: string
    last_log: {
        date: string
        minutes: number
        score: number
        progress_note: string
    } | null
    streak_days: number
}


export default function TrackList() {
    const [tracks, setTracks] = useState<Track[]>([])

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/account/my-tracks/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
            })
            .then((res) => setTracks(res.data))
            .catch((err) => console.error("Error fetching tracks:", err))
    }, [])

    if (tracks.length === 0) return <p className="text-muted">فعلا هیچ مسیری نداری 😅</p>

    return (
        <div className="grid gap-4">
            {tracks.map((track) => (
                <div key={track.id}
                    className="bg-[#f7f7f5] rounded-xl p-4 shadow-sm border border-[#eee]">
                    <h3 className="text-lg font-bold text-[#151313]">{track.name}</h3>
                    <h3 className="text-lg font-bold text-[#151313]">{track.goal}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                        آخرین لاگ:{" "}
                        {track.last_log && track.last_log.date
                            ? `${track.last_log.date} - ${track.last_log.progress_note} - ${track.last_log.score}`
                            : "هنوز لاگی نداری"}
                    </p>

                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#ff5734] transition-all duration-300"
                            style={{ width: `${Math.min(track.streak_days * 5, 100)}%` }}
                        />
                    </div>
                    <p className="text-xs mt-1 text-gray-500">{track.streak_days} روز استمرار 🎯</p>
                </div>
            ))}
        </div>
    )
}