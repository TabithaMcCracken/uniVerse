import React, { useState, useEffect } from 'react';

const ScrambleGameComponent = ({ verseText }) => {
  const [scrambledWords, setScrambledWords] = useState([]);
  const [orderedWords, setOrderedWords] = useState([]);
  const [originalWords, setOriginalWords] = useState([]);

  useEffect(() => {
    if (verseText) {
      const words = verseText.split(/\s+/).filter(word => word.trim() !== '');
      setOriginalWords(words);
      const shuffledWords = shuffleArray(words);
      setScrambledWords(shuffledWords);
    }
  }, [verseText]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleWordClick = (word) => {
    const indexToRemove = scrambledWords.indexOf(word);
    if (indexToRemove !== -1) {
      const updatedScrambledWords = [...scrambledWords];
      updatedScrambledWords.splice(indexToRemove, 1);
      setOrderedWords([...orderedWords, word]);
      setScrambledWords(updatedScrambledWords);
    }
  };

  const handleCheckVerse = () => {
    if (orderedWords.join(' ') === originalWords.join(' ')) {
      alert("Congratulations! You got the verse right!");
    } else {
      alert("Sorry, the ordered words don't match the verse. Try again.");
      setOrderedWords([]);
      const shuffledWords = shuffleArray(originalWords);
      setScrambledWords(shuffledWords);
    }
  };

  const handleStartAgain = () => {
    setOrderedWords([]);
    const shuffledWords = shuffleArray(originalWords);
    setScrambledWords(shuffledWords);
  };

  return (
    <div>
      <h3>Click on the words to put them back in order.</h3>
      <div id="verse-display-table">
        {scrambledWords.map((word, index) => (
          <button className="word-button" key={index} onClick={() => handleWordClick(word)}>
            {word}
          </button>
        ))}
      </div>
      <br />
      <div id="ordered-words-section">
        {orderedWords.map((word, index) => (
          <span className="ordered-word" key={index}>{word} </span>
        ))}
      </div>
      <br />
      {orderedWords.length === originalWords.length && (
        <button onClick={handleCheckVerse}>
          Check Verse
        </button>
      )}
      <button onClick={handleStartAgain}>Start Again</button>
    </div>
  );
};

export default ScrambleGameComponent;
