import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import starImage from "./uniVerseSmBlue.png";
import { BASE_URL } from "../App";

const CreateAccount = () => {
  // State variables for managing form inputs and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Hook for navigating to different pages
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      email,
      password,
      savedVerses: [],
    };

    try {
      // Send a POST request to create a new user account
      const response = await fetch(`${BASE_URL}/users/addUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Account creation successful
        const result = await response.json();
        console.log("User created successfully:", result);
        alert(
          "Congratulations! Account successfully created. You can now log in!"
        );
        navigate("/"); // Navigate to the login page
      } else {
        const errorData = await response.json();
        console.log(errorData.code);
        if (errorData.code === 11000) {
          setErrorMessage("An account with this email address already exists.");
        } else {
          setErrorMessage("Failed to create account. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="app">
      <Navbar />
      <div className="container1">
        <img src={starImage} alt="Yellow Star" className="small-image" />
        <h2>Create Account</h2>
        {/* Display error message if account creation fails */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {/* Render the form for creating a new account */}
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            className="input-field"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
