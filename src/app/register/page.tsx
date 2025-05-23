'use client'
import React, { useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const handleLoginSubmit = async () => {
        console.log("clicked")

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password1", password1);
        formData.append("password2", password2);

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        }

        const body = formData;
        const url = "http://127.0.0.1:8000/account/register/";

        const response = await axios.post(url, body, config)

        if (response.data) {
            console.log(response.data)
            router.push("/login")
        }

    }

    return (
        <div>
            <h1>Login here</h1>
            <form action={handleLoginSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="Email:"></label>
                </div>
                <div>
                    <input
                        type="password"
                        placeholder='Enter your password'
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                    />
                    <label htmlFor="Password:"></label>
                </div>
                <div>
                    <input
                        type="password"
                        placeholder='Repeat your password'
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    <label htmlFor="Password:"></label>
                </div>
                <button type='submit'>
                    Submit
                </button>
            </form>

        </div>
    );
};

export default Login