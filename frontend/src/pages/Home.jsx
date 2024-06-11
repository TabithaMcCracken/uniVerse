import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import starImage from './uniVerseSmBlue.png'

const Home = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="container1">
        <div className="inner-container">
          <h1>
            Welcome aboard,
            <br /> cosmic cadet!
          </h1>
          <img src={starImage} alt="Yellow Star" className="small-image" />
          <p>
            Are you ready to blast off and practice <br />your Bible memory verses?
          </p>
        </div>
        <button>
          <Link to="/login">Log In</Link>
        </button>
        <br />
        <button>
          <Link to="/create-account">Create Account</Link>
        </button>
      </div>
      <div className="container2"></div>
    </div>
  );
};

export default Home;
