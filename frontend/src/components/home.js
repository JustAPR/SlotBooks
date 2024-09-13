import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For React Router v6
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-regular-svg-icons';

const Website = () => {
  const [darkMode, setDarkMode] = useState(false);
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

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div style={darkMode ? styles.darkContainer : styles.lightContainer}>
      <h1>Welcome to the Parking Lot Booking System</h1>
      <img src="mock.jpeg" alt="Parking Lot" style={styles.image} />
      <p style={styles.text}>
        Our parking lot booking system makes it easy to reserve a parking spot in advance. Whether you're planning a trip or need a convenient spot for daily use, our system has got you covered.
      </p>
      <button onClick={handleNavigate} style={darkMode ? styles.darkButton : styles.button}>Book Now</button>
      <div onClick={toggleDarkMode} style={styles.toggleButton}>
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="lg" />
      </div>
      <div style={styles.contactSection}>
        <h2>Contact Us</h2>
        <p>Email: support@parkinglot.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 1234 Parking St, Park City, PC 56789</p>
      </div>
    </div>
  );
};

const styles = {
  lightContainer: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    textAlign: 'center',
    padding: '50px',
    color: '#333',
    position: 'relative',
    height: '100vh',
    width: '100vw', 
    margin: '0', 
    boxSizing: 'border-box',
  },
  darkContainer: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#333',
    textAlign: 'center',
    padding: '50px',
    color: '#f4f4f4',
    position: 'relative',
    height: '100vh',
    width: '100vw',
    margin: '0',
    boxSizing: 'border-box',
  },
  image: {
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    borderRadius: '10px',
  },
  text: {
    fontSize: '1.2rem',
    margin: '20px 0',
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
  darkButton: {
    padding: '1rem',
    margin: '1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#0056b3',
    color: 'white',
    cursor: 'pointer',
  },
  toggleButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: 'rgb(21,0,0)',
    borderRadius: '50%',
    padding: '10px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  contactSection: {
    textAlign: 'center',
    padding: '20px',
  },
};

export default Website;
