import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container1">
        <h1>Welcome aboard, cosmic cadet!</h1>
        <div>
          <p>Prepare for an interstellar adventure unlike any other with uniVerse, the stellar app that makes memorizing Bible verses an out-of-this-world experience!</p>
          <h3>With uniVerse, the universe is your playground, and the Bible is your guidebook to the stars!</h3>
        </div>
      </div>
      <div className="container2">
        <button><Link to="/login">Log In</Link></button>
        <button><Link to="/create-account">Create Account</Link></button>
      </div>
    </div>
  );
};

export default Home;
