import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/register';
import SlotBooking from './components/slotBooking';
import Website from './components/home'; // Use Website instead of Home

function App() {
  return (
    <Router>
      <Routes>
        {/* Set the Website component as the main page */}
        <Route path="/" element={<Website />} />
        {/* Redirects to login */}
        <Route path="/login" element={<Login />} />
        {/* Redirects to registration */}
        <Route path="/register" element={<Register />} />
        {/* Slot booking route */}
        <Route path="/slotbooking" element={<SlotBooking />} />
      </Routes>
    </Router>
  );
}

export default App;