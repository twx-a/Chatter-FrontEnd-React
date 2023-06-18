import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activeButton, setActiveButton] = useState(false);

    useEffect(() => {
        const loginRequest = async () => {
            const response = await fetch('http://localhost:3001/users', {
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
            console.log(data);
        };
        loginRequest();
    }, []);


    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Chatter</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/Profile">Profile</Link>
                </li>
            </ul>
            <button onClick={() => setActiveButton(!activeButton)}>Login</button>
            {activeButton && (
                <div>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button>Submit</button>
                </div>
            )}
        </nav>
    )
};

export default Navbar;
