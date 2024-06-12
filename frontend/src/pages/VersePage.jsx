import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ScrambleGameComponent from "../components/ScrambleGameComponent";
import { useAuth } from "../AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BASE_URL } from "../App";

// API key for ESV API
const apiKey = import.meta.env.VITE_ESV_API_KEY;

const VersePage = () => {
  const { userId } = useAuth();
  const location = useLocation(); // Hook to acces teh current location
  const { verse } = location.state; // Extracting verse data from location state
  const { login } = useAuth(); // Authentication context
  const [verseText, setVerseText] = useState(""); // State variable for verse
  const [isScrambleGameActive, setIsScrambleGameActive] = useState(false); // State variable to track if game is active
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Function to fetch verse text from ESV API
    const fetchVerseText = async () => {
      try {
        const { book, chapter, verse: verseNumber } = verse; //??? Maybe takes parts of the verse state?
        const response = await axios.get(
          `https://api.esv.org/v3/passage/text/?q=${book}+${chapter}:${verseNumber}`,
          {
            headers: {
              Authorization: `Token ${apiKey}`,
            },
          }
        );
        const passage = response.data.passages[0];

        // Extracting verse text from passage (removing citation and other meta info)
        const start = passage.indexOf("]") + 2; // +2 to skip the ']' and the space
        const end = passage.indexOf("(ESV)"); // Finding end position before citation end marker
        const extractedText = passage.substring(start, end).trim();
        setVerseText(extractedText);
      } catch (error) {
        console.error("Error fetching verse text:", error);
      }
    };

    fetchVerseText();
  }, [verse]);

  // Function to handle starting the scramble game
  const handlePlayGame = () => {
    setIsScrambleGameActive(true);
  };

  const handleDeleteVerse = async () => {
    // Confirm deletin with user
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this verse?"
    );
    if (confirmDelete) {
      try {
        const { book, chapter, verse: verseNumber } = verse;
        await axios.delete(`${BASE_URL}/users/deleteVerse/${userId}`, {
          data: {
            book,
            chapter,
            verse: verseNumber,
          },
        });

        // Navigate back to the LoggedIn page after deletion
        navigate(`/loggedin/${userId}`);
      } catch (error) {
        console.error("Error deleting verse:", error);
      }
    }
  };

  if (!verse) {
    return <div>Error: No verse data available</div>;
  }

  return (
    <div className="app vp">
      <Navbar />
      <div className="verse-container">
        <div className="single-verse-page">
          <h2 className="verse-header">
            {verse.book} {verse.chapter}:{verse.verse} ESV
          </h2>
          {isScrambleGameActive ? (
            <ScrambleGameComponent verseText={verseText} />
          ) : (
            <>
              <p>{verseText}</p>
              <br />
              <button onClick={handlePlayGame}>Play Word Scramble Game</button>
              <br />
              <br />
              <button onClick={handleDeleteVerse}>Delete Verse</button>
            </>
          )}
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default VersePage;
