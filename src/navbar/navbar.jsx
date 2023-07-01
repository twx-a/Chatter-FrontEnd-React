import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import Login from '../users/login.jsx';
import UserContext from '../contexts/UserContext.js';

const Navbar = () => {
    const [activeButton, setActiveButton] = useState(false);

    return (
        <UserContext.Consumer>
            {(ctx) => {
                return (
                    <nav className={styles.navbar}>
                        <ul>
                            <li>
                                <Link to="/">Chatter</Link>
                            </li>
                            {!ctx.isLoggedIn && (
                                <li>
                                    <Link to="/Register">Register</Link>
                                </li>
                            )}
                            {ctx.isLoggedIn && (
                                <li>
                                    <Link to="/Profile">Profile</Link>
                                </li>
                            )}
                        </ul>
                        {!ctx.isLoggedIn && (
                            <div className={styles.dropdown}>
                            <button onClick={() => setActiveButton(!activeButton)}>Login</button>
                            {activeButton && <div className={styles.dropdownMenu}><Login /></div>}
                        </div>    
                        )}
                        {ctx.isLoggedIn && (
                            <p>kzx</p>
                        )}
                    </nav>
                )
            }}

        </UserContext.Consumer>
    )
};

export default Navbar;
