import React, { useState, Fragment, useContext } from 'react';
import UserContext from '../contexts/UserContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const ctx = useContext(UserContext);

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
                    username: username,
                    password: password,
                }),
            });
            const data = await response.json();

            if (response.ok) {
                // Save the JWT to localStorage
                console.log('Login successful');
                localStorage.setItem('loginToken', JSON.stringify(data.loginToken));
                ctx.onLogin(data.loginToken.username, data.loginToken.userId);
                ctx.onDropdown();
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <Fragment>
            <form onSubmit={loginUser}>
                <label htmlFor="username">Username</label>
                <input type="text" onChange={handleUsernameChange} value={username} id="username" name="username" />
                <label htmlFor="password">Password</label>
                <input type="password" onChange={handlePasswordChange} value={password} id="password" name="password" />
                <input type="checkbox" id="rememberMe" name="rememberMe" />
                <label htmlFor='rememberMe'>Remember Me</label>
                <button type="submit">Submit</button>
            </form>
        </Fragment>
    )
}

export default Login;