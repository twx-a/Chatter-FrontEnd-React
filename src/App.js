import React from 'react';
import Chatter from './chatter.jsx';
import Profile from './users/profile.jsx';
import Register from './users/register.jsx';
import Navbar from './navbar/navbar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContext from './contexts/UserContext.js';

const App = () => {
  return (
    <UserContext.Provider value={{
      isLoggedIn:false
      }}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Chatter />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
