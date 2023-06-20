import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import Login from '../users/login.jsx';

const Navbar = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activeButton, setActiveButton] = useState(false);

    return (
        <nav className={styles.navbar}>
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
            {activeButton && <Login />}
        </nav>
    )
};

export default Navbar;
