import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';
import Login from '../users/login.jsx';
import UserContext from '../contexts/UserContext';

const Navigation = () => {
    const ctx = useContext(UserContext);

    // useEffect(() => {
    //     setLoginToken(JSON.parse(localStorage.getItem('loginToken')));
    // }, [ctx.isLoggedIn]);


    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.navitem}>
                    <NavLink to="/" className={styles.navlink}>Chatter</NavLink>
                </li>
                {!ctx.isLoggedIn &&
                <li className={styles.navitem}>
                    <NavLink to="/register" className={styles.navlink}>Register</NavLink>
                </li>
                }
                {ctx.isLoggedIn &&
                <li className={styles.navitem}>
                    <NavLink to="/Profile" className={styles.navlink}>Profile</NavLink>
                </li>
                }
                <li className={styles.navitem}>
                    <NavLink to="/about" className={styles.navlink}>About</NavLink>
                </li>
            </ul>
            {ctx.isLoggedIn && <div className={styles.dropdown}>
                <button onClick={() => ctx.onDropdown()}>{ctx.username}</button>
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
    );
};

export default Navigation;
