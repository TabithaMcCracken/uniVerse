// import React from 'react';
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ScrambleGameComponent from "../components/ScrambleGameComponent";
import { useAuth } from '../AuthContext'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const apiKey = import.meta.env.VITE_ESV_API_KEY;

const VersePage = () => {
  const location = useLocation();
  const { verse } = location.state;
  const { login } = useAuth();
  const [verseText, setVerseText] = useState("");
  const [isScrambleGameActive, setIsScrambleGameActive] = useState(false);

  useEffect(() => {
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

        // Find the position after the first closing square bracket ']' and the space following it
        const start = passage.indexOf("]") + 2; // +2 to skip the ']' and the space
        const end = passage.indexOf("(ESV)");
        const extractedText = passage.substring(start, end).trim();
        setVerseText(extractedText);
      } catch (error) {
        console.error("Error fetching verse text:", error);
      }
    };

    fetchVerseText();
  }, [verse]);

  const handlePlayGame = () => {
    setIsScrambleGameActive(true);
  };

  if (!verse) {
    return <div>Error: No verse data available</div>;
  }

  return (
    <div className="app vp" >
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
          </>
        )}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default VersePage;
