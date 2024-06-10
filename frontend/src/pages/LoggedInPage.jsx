import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import VerseCard from "../components/VerseCard";
import { useAuth } from "../AuthContext";

const LoggedInPage = () => {
  const { userId } = useAuth();
  // console.log(userId);
  const [savedVerses, setSavedVerses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching saved verses...");
    const fetchSavedVerses = async () => {
      try {
        // Fetch saved verses from the backend
        const response = await axios.get(
          `http://localhost:3075/users/${userId}`
        );
        console.log("Response:", response.data);
        const savedVerses = response.data.savedVerses;
        setSavedVerses(savedVerses);
      } catch (error) {
        console.error("Error fetching saved verses:", error);
        setError("Error fectching saved verses");
      }
    };

    if (userId) {
      fetchSavedVerses();
    }
  }, [userId]);

  return (
    <div className="app">
      <Navbar />
      <div className = 'verse-container'>
        <header className="verse-header">
          <h1>Your Memory Verses</h1>
          <h3>Click on a verse to practice it!</h3>
        </header>
        <div>
          {error ? (
            <p>{error}</p>
          ) : (
            <ul className="verse-list">
              {savedVerses.map((verse) => (
                <VerseCard key={verse._id} verse={verse} />
              ))}
            </ul>
          )}
          <br />
          <Link to={`/add-verse/${userId}`}>
            <button>Add Verse</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoggedInPage;