"use client";

import './styles.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === '123') { // Fixed credentials
            Cookies.set('auth', 'true');
            router.push('/admin');
        } else {
            alert('Invalid credentials');
        }
    };
    return (
        <>
            <div className="signup-container">
                <form onSubmit={handleLogin} className="signup-form">
                    <h2>Sign Up</h2>
                    <input type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="UserName" />
                    <input type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required placeholder="Password" />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </>
    );
}
