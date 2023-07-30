import React, { useState } from 'react';

const UserContext = React.createContext({
    isLoggedIn: false,
    isDropdownActive: false,
    onLogout: () => {},
    onLogin: () => {},
    onDropdown: () => {},
    username: ''
});

export const UserContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const [username, setUsername] = useState('');

    const logoutHandler = () => {
        console.log('Logging out');
        setIsLoggedIn(false);
        setIsDropdownActive(false);
        localStorage.removeItem('token');
    };

    const loginHandler = (prop) => {
        setIsLoggedIn(true);
        setIsDropdownActive(false);
        setUsername(prop);
    };

    const dropDownHandler = () => {
        setIsDropdownActive(!isDropdownActive);
    };

    const getUserName = () => {
        return username;
    };
    
    const contextValue = {
        isLoggedIn: isLoggedIn,
        isDropdownActive: isDropdownActive,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onDropdown: dropDownHandler,
        username: getUserName
    };

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
