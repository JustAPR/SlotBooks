import React from 'react';
import { useNavigate } from 'react-router-dom'; // For React Router v6

const Website = () => {
  const navigate = useNavigate(); // Using useNavigate for programmatic navigation

  const handleNavigate = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/slotbooking'); // Redirect to SlotBooking if token exists
    } else {
      alert('Please log in first');
      navigate('/login'); // Redirect to login page if no token
    }
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to the Parking Lot Booking System</h1>
      <button onClick={handleNavigate} style={styles.button}>Book Now</button>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    textAlign: 'center',
    padding: '50px',
  },
  button: {
    padding: '1rem',
    margin: '1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
};

export default Website;