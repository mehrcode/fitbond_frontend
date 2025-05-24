'use client'

import React, { FormEvent, useState } from 'react'
import axios from "axios"

const Login: React.FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log("clicked");

        const body = JSON.stringify({ email, password });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            timeout: 10000,
        };

        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const url = `${baseURL}/api/token/`;

        try {
            const response = await axios.post(url, body, config);

            if (response.data) {
                console.log("access token:", response.data.access);
                localStorage.setItem("access", response.data.access);
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

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

export default Login;
