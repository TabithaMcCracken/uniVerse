import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { AuthContext } from "../AuthContext";
import starImage from "./uniVerseSmBlue.png";

const Login = () => {
  // State variables for email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  // Hook for navigation
  const navigate = useNavigate();

  // Authentication context 
  const { login } = useContext(AuthContext);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Data object for login request
    const loginData = {
      password: password,
      email: email,
    };
    try {
      const response = await axios.post(
        "http://localhost:3075/users/login",
        loginData
      );
      // Extract user ID from the response
      const userId = response.data._id;
      console.log("user id:", userId);

      if (userId) {
        // Call login function from authentication context
        login(userId);
        console.log("Successfully matched email and password", userId);
        // Redirect to the logged-in page
        navigate(`/loggedin/${userId}`);
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="app">
      <Navbar />
      <div className="container1">
        <img src={starImage} alt="Yellow Star" className="small-image" />
        <h2>Log In</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button type="submit">Log In</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
