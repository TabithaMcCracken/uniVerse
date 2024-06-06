import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { AuthContext } from '../AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      password: password,
      email: email
    }
    try {
      const response = await axios.post('http://localhost:3075/users/login', loginData);
      const userId = response.data._id;
      console.log("user id:", userId)

      if (userId) {
        login();
        console.log("Successfully matched email and password", userId)
        navigate(`/loggedin/${userId}`);
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Incorrect email or password. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          required 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          required 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Log In</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;