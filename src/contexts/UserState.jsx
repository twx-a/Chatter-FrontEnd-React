import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { UserProvider } from './UserContext';

const UserState = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken.username);
        }
    }, []);

    return (
        <UserProvider value={{ user, setUser }}>
            {children}
        </UserProvider>
    );
};

export default UserState;
