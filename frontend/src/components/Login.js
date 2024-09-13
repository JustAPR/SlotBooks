
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For React Router v6

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate(); // React Router v6 hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', { username, password });
      
      // Store the token
      localStorage.setItem('token', data.token);
      
      // Redirect to the /book route after successful login
      navigate('/slotBooking');
    } catch (error) {
      // Handle login error, display error message
      setErrorMessage(error.response?.data?.message || 'Login failed');
    }
  };

  // Redirect to register page
  const handleRegister = () => {
    navigate('/register'); // Redirects to /register route
  };

  return (
    <div style={styles.cond}>
    <div style={styles.card}>
      <div>
        <h1 style={styles.cardTitle}>Book Your Parking Slot Easily</h1>
        <p style={styles.cardDescription}>Login to access your account.</p>
      </div>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>

      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

      <button onClick={handleRegister} style={styles.registerButton}>Register</button>
    </div>
    </div>
  );
};

// Inline styles from login.html
const styles = {
  cond: {
    margin: 0,
    padding: 0,
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: "url('https://res.cloudinary.com/dsgmd2mwq/image/upload/v1724679727/9000_y6drzb.jpg') no-repeat center center fixed",
    backgroundSize: 'cover',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '4rem',
    borderRadius: '10px',
    textAlign: 'center',
    margin: '100px auto',
    width: '300px',
    background: 'linear-gradient(-45deg, #a9d5f7, #aa8aef, #e994c3, #f0f9d2)',
    animation: 'gradientBackground 15s ease infinite',
  },
  cardTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  cardDescription: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  registerButton: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: 'transparent',
    color: '#007bff',
    border: '1px solid #007bff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
  },
};

export default Login;