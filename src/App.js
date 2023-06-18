import React from 'react';
import Chatter from './chatter.jsx';
import Profile from './profile/profile.jsx';
import Register from './register/register.jsx';
import Navbar from './navbar/navbar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Chatter />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
