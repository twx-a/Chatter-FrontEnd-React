import React, { useState } from 'react';

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: username,
                    password: password,
                }),
            });
            const data = await response.json();

            if (response.ok) {
                console.log('User created successfully');
                return data.token;
            } else {
                throw new Error(data.message || 'Error creating user');
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <div>
            <form onSubmit={loginUser}>
                <label htmlFor="username">Username</label>
                <input type="text" onChange={handleUsernameChange} value={username} id="username" name="username" />
                <label htmlFor="password">Password</label>
                <input type="password" onChange={handlePasswordChange} value={password} id="password" name="password" />
                <button type="submit" onClick={handleLogin}>Submit</button>
            </form>
        </div>
    )
}

export default Login;