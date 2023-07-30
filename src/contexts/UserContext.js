import React, { useState } from 'react';

const UserContext = React.createContext({
    isLoggedIn: false,
    isDropdownActive: false,
    onLogout: () => {},
    onLogin: () => {},
    onDropdown: () => {},
    username: '',
    userId: ''
});

export const UserContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');

    const logoutHandler = () => {
        console.log('Logging out');
        setIsLoggedIn(false);
        setIsDropdownActive(false);
        localStorage.removeItem('token');
    };

    const loginHandler = (userName, userId) => {
        setIsLoggedIn(true);
        setIsDropdownActive(false);
        setUsername(userName);
        setUserId(userId);
    };

    const dropDownHandler = () => {
        setIsDropdownActive(!isDropdownActive);
    };
    
    const contextValue = {
        isLoggedIn: isLoggedIn,
        isDropdownActive: isDropdownActive,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onDropdown: dropDownHandler,
        username: username,
        userId: userId
    };

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
