import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import Login from '../users/login.jsx';

const Navbar = () => {
    const [activeButton, setActiveButton] = useState(false);
    const [loggedIn, setLoggedIn] = useState();


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
            <div className={styles.dropdown}>
                <button onClick={() => setActiveButton(!activeButton)}>Login</button>
                {activeButton && <div className={styles.dropdownMenu}><Login /></div>}
            </div>
        </nav>
    )
};

export default Navbar;
