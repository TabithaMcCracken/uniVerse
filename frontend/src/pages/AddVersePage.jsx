//const PATH = "../bible_verse_data.json";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../AuthContext'; 
import json from "../bible_verse_data.json";
import Navbar from '../components/Navbar';

const LoggedInPage = () => {
  const { userId } = useParams();
  const { login } = useAuth();
  const [bibleData, setBibleData] = useState([]); // Initialize as null
  const [selectedBook, setSelectedBook] = useState("");
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [verses, setVerses] = useState([]);
  const [selectedVerse, setSelectedVerse] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Set the user as logged in when this page is accessed
    login();
  }, [login]);

  useEffect(() => {
    const uniqueBooks = [...new Set(json.map((item) => item.book))];
    setBibleData(uniqueBooks);
  }, []);

  useEffect(() => {
    if (selectedBook) {
      // Extract unique chapters for the selected book
      const uniqueChapters = [...new Set(json
        .filter((item) => item.book === selectedBook)
        .map((item) => item.chapter))];
      setChapters(uniqueChapters);
      setSelectedChapter(""); // Reset selected chapter when the book changes
      setVerses([]); // Reset verses when the book changes
      setSelectedVerse("");
    }
  }, [selectedBook]);

  useEffect(() => {
    if (selectedBook && selectedChapter) {
      const chapterData = json.find(
        (item) => item.book === selectedBook && item.chapter === parseInt(selectedChapter)
      );
      if (chapterData) {
        const verseCount = chapterData.num_verses;
        const verseNumbers = Array.from({ length: verseCount }, (_, i) => i + 1);
        setVerses(verseNumbers);
        setSelectedVerse("");
      } else {
        setVerses([]);
      }
    }
  }, [selectedBook, selectedChapter]);


  const handleBookChange = (event) => {
    setSelectedBook(event.target.value);
  };
  const handleChapterChange = (event) => {
    setSelectedChapter(event.target.value);
  };

  const handleVerseChange = (event) => {
    setSelectedVerse(event.target.value);
  };

  const handleAddVerse = async () => {
    const verseData = {
      book: selectedBook,
      chapter: parseInt(selectedChapter),
      verse: parseInt(selectedVerse),
      practiceAttempts: 0,
      progress: 0,
      dateSaved: new Date().toISOString(),
    };
    console.log(verseData)
    try {
      const response = await axios.patch(
        `http://localhost:3075/users/addVerse/${userId}`,
        verseData
      );
      console.log("Verse added:", response.data);
      navigate(`/loggedin/${userId}`);
    } catch (error) {
      console.error("Error adding verse:", error);
    }
  };



  return (
    <div>
      <Navbar />
      <header>
        <h1>List of Bible Books and Chapters</h1>
      </header>
      <div>
        <h1>Books of the Bible</h1>
        <select onChange={handleBookChange} value={selectedBook}>
          <option value="" disabled>
            Select a book
          </option>
          {bibleData.map((book, index) => (
            <option key={index} value={book}>
              {book}
            </option>
          ))}
        </select>
        {selectedBook && (
          <>
            <h2>Selected Book: {selectedBook}</h2>
            <h1>Chapters</h1>
            <select onChange={handleChapterChange} value={selectedChapter}>
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
        {selectedChapter && (
          <>
            <h2>Selected Chapter: {selectedChapter}</h2>
            <h1>Verses</h1>
            <select onChange={handleVerseChange} value={selectedVerse}>
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
        {selectedVerse && (
          <div>
            <h2>Selected Verse: {`${selectedBook} ${selectedChapter}:${selectedVerse}`}</h2>
            <button onClick={handleAddVerse}>Add Verse</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoggedInPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddVersePage = () => {
//   // Load your Bible books data from the JSON file
//   const [bibleBooks, setBibleBooks] = useState([]);

//   useEffect(() => {
//     // Fetch the Bible books data from your JSON file
//     const fetchBibleBooks = async () => {
//       try {
//         const response = await axios.get('../bible_verse_data.json');
//         setBibleBooks(response.data);
//       } catch (error) {
//         console.error('Error fetching Bible books:', error);
//       }
//     };

//     fetchBibleBooks();
//   }, []);

//   const [formData, setFormData] = useState({
//     book: '',
//     chapter: '',
//     verse: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'book') {
//       setFormData(prevState => ({
//         ...prevState,
//         chapter: '',
//         verse: '',
//         [name]: value
//       }));
//     } else if (name === 'chapter') {
//       setFormData(prevState => ({
//         ...prevState,
//         verse: '',
//         [name]: value
//       }));
//     } else {
//       setFormData(prevState => ({
//         ...prevState,
//         [name]: value
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Assuming your backend endpoint for saving the verse is '/verses'
//       await axios.post('/verses', formData);
//       // Optionally, navigate back to the loggedin page or display a success message
//     } catch (error) {
//       console.error('Error adding verse:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Verse</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Book:
//           <select name="book" value={formData.book} onChange={handleChange}>
//             <option value="">Select a book</option>
//             {bibleBooks.map((book, index) => (
//               <option key={index} value={book.Book}>{book.Book}</option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Chapter:
//           <select
//             name="chapter"
//             value={formData.chapter}
//             onChange={handleChange}
//             disabled={!formData.book}
//           >
//             <option value="">Select a chapter</option>
//             {formData.book && bibleBooks.find(b => b.Book === formData.book) &&
//               Array.from({ length: bibleBooks.find(b => b.Book === formData.book).numVerses }, (_, i) => i + 1).map(chapter => (
//                 <option key={chapter} value={chapter}>{chapter}</option>
//               ))}
//           </select>
//         </label>
//         <label>
//           Verse:
//           <select
//             name="verse"
//             value={formData.verse}
//             onChange={handleChange}
//             disabled={!formData.chapter}
//           >
//             <option value="">Select a verse</option>
//             {formData.book && formData.chapter && Array.from({ length: bibleBooks.find(b => b.Book === formData.book).numVerses }, (_, i) => i + 1).map(verse => (
//               <option key={verse} value={verse}>{verse}</option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Text:
//           <textarea name="text" value={formData.text} onChange={handleChange}></textarea>
//         </label>
//         <button type="submit">Add Verse</button>
//       </form>
//     </div>
//   );
// };

// export default AddVersePage;
