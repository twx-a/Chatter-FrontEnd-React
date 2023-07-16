import React from 'react';
import Chatter from './chatter.jsx';
import Profile from './users/profile.jsx';
import Register from './users/register.jsx';
import Navbar from './navbar/navbar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Chatter />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
