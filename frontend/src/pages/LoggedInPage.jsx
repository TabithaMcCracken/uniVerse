import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LoggedInPage = () => {
  // Mock data for verses (replace this with actual data fetched from the database)
  const verses = [
    { id: 1, text: 'For God so loved the world...', reference: 'John 3:16' },
    { id: 2, text: 'The Lord is my shepherd...', reference: 'Psalm 23:1' },
    // Add more mock verses as needed
  ];

  return (
    <div>
      <Navbar />
      <header>
        <h1>Memory Verses</h1>
      </header>
      <div>
        <ul>
          {verses.map(verse => (
            <li key={verse.id}>{verse.text} - {verse.reference}</li>
          ))}
        </ul>
        <button>Add Verse</button>
        <button><Link to="/">Log Out</Link></button>
      </div>
    </div>
  );
};

export default LoggedInPage;
