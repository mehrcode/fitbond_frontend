'use client'
import React, { FormEvent, useState } from 'react'
import axios from "axios"

const Login: React.FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log("clicked")

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            timeout: 5000,
        }

        const body = formData;
        const url = "https://fitbond-backend.onrender.com/api/token";

        const response = await axios.post(url, body, config)

        if (response.data) {
            console.log(response.data.access)
            localStorage.setItem("access", response.data.access)

        }

    }

    return (
        <div>
            <h1>Login here</h1>
            <form onSubmit={handleLoginSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>
                    Submit
                </button>
            </form>

        </div>
    );
};

export default Login