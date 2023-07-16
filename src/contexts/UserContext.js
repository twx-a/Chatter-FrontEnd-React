import React, { useState } from 'react';

const UserContext = React.createContext({
    isLoggedIn: false,
    isDropdownActive: false,
    onLogout: () => {},
    onLogin: () => {},
    onDropdown: () => {}
});

export const UserContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownActive, setIsDropdownActive] = useState(false);

    const logoutHandler = () => {
        console.log('Logging out');
        setIsLoggedIn(false);
        setIsDropdownActive(false);
        localStorage.removeItem('token');
    };

    const loginHandler = () => {
        setIsLoggedIn(true);
        setIsDropdownActive(false);
    };

    const dropDownHandler = () => {
        setIsDropdownActive(!isDropdownActive);
    };


    const contextValue = {
        isLoggedIn: isLoggedIn,
        isDropdownActive: isDropdownActive,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onDropdown: dropDownHandler
    };

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
