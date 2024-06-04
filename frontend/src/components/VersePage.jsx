// import React from 'react';
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ScrambleGameComponent from './ScrambleGameComponent';


// import 'dotenv/config'
// require('dotenv').config();
// const apiKey = process.env.REACT_APP_ESV_API_KEY;
// dotenv.config();
const apiKey = "3f39ed2e760cb8b133dbd496777f1c8008b54858";


const VersePage = () => {
  const location = useLocation();
  const { verse } = location.state;
  const [verseText, setVerseText] = useState("");
  const [isScrambleGameActive, setIsScrambleGameActive] = useState (false);

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
    <div className="single-verse-page">
      <h2>{verse.book} {verse.chapter}:{verse.verse}</h2>
      {isScrambleGameActive ? (
        <ScrambleGameComponent verseText ={verseText}/>
      ) : (
        <>
          <p>{verseText}</p>
          <button onClick={handlePlayGame}>Play Scramble Game</button>
        </>
      )}
    </div>
  );
};

export default VersePage;
