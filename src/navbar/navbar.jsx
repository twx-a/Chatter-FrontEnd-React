import React, { useState,useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import Login from '../users/login.jsx';
import UserContext from '../contexts/UserContext';

const Navbar = () => {
    const [loginToken, setLoginToken] = useState(null);
    const ctx = useContext(UserContext);

    useEffect(() => {
        setLoginToken(JSON.parse(localStorage.getItem('loginToken')));
    }, [ctx.isLoggedIn]);


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
            {ctx.isLoggedIn && <div className={styles.dropdown}>
                <button onClick={() => ctx.onDropdown()}>{loginToken?.username}</button>
                {ctx.isDropdownActive && <div className={styles.dropdownMenu}><button onClick={() => ctx.onLogout()}>Logout</button></div>}
            </div>
            }

            {!ctx.isLoggedIn && 
                <div className={styles.dropdown}>
                    <button onClick={() => ctx.onDropdown()}>Login</button>
                    {ctx.isDropdownActive && <div className={styles.dropdownMenu}><Login /></div>}
                </div>
            }
        </nav>
    )
};

export default Navbar;
