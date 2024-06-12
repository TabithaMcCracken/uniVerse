import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import json from "../bible_verse_data.json";
import Navbar from "../components/Navbar";
import { BASE_URL } from "../App";

const AddVersePage = () => {
  const { userId } = useAuth();
  console.log(userId);

  // State variables for managing Bible verse data
  const [bibleData, setBibleData] = useState([]); // Initialize as null
  const [selectedBook, setSelectedBook] = useState("");
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [verses, setVerses] = useState([]);
  const [selectedVerse, setSelectedVerse] = useState("");
  const navigate = useNavigate();

  // Fetch unique list of Bible books from the JSON data when the component mounts
  useEffect(() => {
    const uniqueBooks = [...new Set(json.map((item) => item.book))];
    setBibleData(uniqueBooks);
  }, []);

  // Update the list of chapters when a book is selected
  useEffect(() => {
    if (selectedBook) {
      // Extract unique chapters for the selected book
      const uniqueChapters = [
        ...new Set(
          json
            .filter((item) => item.book === selectedBook)
            .map((item) => item.chapter)
        ),
      ];
      setChapters(uniqueChapters);
      setSelectedChapter(""); // Reset selected chapter when the book changes
      setVerses([]); // Reset verses when the book changes
      setSelectedVerse("");
    }
  }, [selectedBook]);

  // Update the list of verses when a chapter is selected
  useEffect(() => {
    if (selectedBook && selectedChapter) {
      const chapterData = json.find(
        (item) =>
          item.book === selectedBook &&
          item.chapter === parseInt(selectedChapter)
      );
      if (chapterData) {
        const verseCount = chapterData.num_verses;
        const verseNumbers = Array.from(
          { length: verseCount },
          (_, i) => i + 1
        );
        setVerses(verseNumbers);
        setSelectedVerse("");
      } else {
        setVerses([]);
      }
    }
  }, [selectedBook, selectedChapter]);

  // Event handler for book selection change
  const handleBookChange = (event) => {
    setSelectedBook(event.target.value);
  };

  // Event handler for chapter selection change
  const handleChapterChange = (event) => {
    setSelectedChapter(event.target.value);
  };

  // Event handler for verse selection change
  const handleVerseChange = (event) => {
    setSelectedVerse(event.target.value);
  };

  // Event handler for adding a verse to the user's saved verses
  const handleAddVerse = async () => {
    const verseData = {
      book: selectedBook,
      chapter: parseInt(selectedChapter),
      verse: parseInt(selectedVerse),
      practiceAttempts: 0,
      progress: 0,
      dateSaved: new Date().toISOString(),
    };

    try {
      // Send a PATCH request to add the verse to the user's saved verses
      const response = await axios.patch(
        `${BASE_URL}/users/addVerse/${userId}`,
        verseData
      );
      console.log("Verse added:", response.data);
      navigate(`/loggedin/${userId}`); // Navigate to the logged-in page after adding the verse
    } catch (error) {
      console.error("Error adding verse:", error);
    }
  };

  return (
    <div className="app">
      <Navbar />
      <div className="add-verse-container">
        <header>
          <h1>Add a Bible verse to practice:</h1>
        </header>
        <div>
          <h1>Books of the Bible</h1>
          <select id="roundedDropdown" onChange={handleBookChange} value={selectedBook}>
            <option value="" disabled>
              Select a book
            </option>
            {bibleData.map((book, index) => (
              <option key={index} value={book}>
                {book}
              </option>
            ))}
          </select>
          {/* Render selected book, chapters, and verses dropdowns based on user selection */}
          {selectedBook && (
            <>
              <h2>Selected Book: {selectedBook}</h2>
              <h1>Chapters</h1>
              <select id="roundedDropdown" onChange={handleChapterChange} value={selectedChapter}>
                <option value="" disabled>
                  Select a chapter
                </option>
                {chapters.map((chapter, index) => (
                  <option key={index} value={chapter}>
                    {chapter}
                  </option>
                ))}
              </select>
            </>
          )}
          {/* Render selected chapter and verse based on user selection */}
          {selectedChapter && (
            <>
              <h2>Selected Chapter: {selectedChapter}</h2>
              <h1>Verses</h1>
              <select id="roundedDropdown" onChange={handleVerseChange} value={selectedVerse}>
                <option value="" disabled>
                  Select a verse
                </option>
                {verses.map((verse, index) => (
                  <option key={index} value={verse}>
                    {verse}
                  </option>
                ))}
              </select>
            </>
          )}
          {/* Render selected verse and button to add it */}
          {selectedVerse && (
            <div>
              <h2>Selected Verse: {`${selectedVerse}`}</h2>
              <h2>{`${selectedBook} ${selectedChapter}:${selectedVerse}`}</h2>
              <button onClick={handleAddVerse}>Add Verse</button>
            </div>
          )}
        </div>
        <br />
      </div>
    </div>
  );
};

export default AddVersePage;
