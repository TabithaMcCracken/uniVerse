
const userId = '6659f6fca4d25109360432bb';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import VerseCard from '../components/VerseCard';

const LoggedInPage = () => {
    const [savedVerses, setSavedVerses] = useState([]);
    // const [versesText, setVersesText] = useState([]);
    const [error, setError] = useState(null);

  // const [verse, setVerse] = useState(null);
  // const query = 'John 11:35';
  
    useEffect(() => {
        console.log("Fetching saved verses...")
        const fetchSavedVerses = async () => {
            try {
              // Fetch saved verses from the backend
              const response = await axios.get(`http://localhost:3075/users/${userId}`);
              console.log("Response:", response.data);
              const savedVerses = response.data.savedVerses;
              setSavedVerses(savedVerses);
            } catch (error) {
              console.error('Error fetching saved verses:', error);
              setError('Error fectching saved verses')
            }
          };
      
          fetchSavedVerses();
        }, [userId]); 

//   useEffect(() => {
//     const fetchVerse = async () => {
//       try {
//         const response = await axios.get(`https://api.esv.org/v3/passage/text/?q=${query}`, {
//           headers: {
//             Authorization: `Token ${apiKey}`
//           }
//         });
//         setVerse(response.data.passages[0]);
//       } catch (error) {
//         console.error('Error fetching verse:', error);
//       }
//     };

//     fetchVerse();
//   }, []);

return (
    <div>
      <Navbar />
      <header>
        <h1>Memory Verses</h1>
      </header>
      <div>
      {error ? (
          <p>{error}</p>
        ) : (
          <ul>
            {savedVerses.map(verse => (
              <VerseCard key={verse._id} verse={verse} />
            ))}
          </ul>
        )}
        <button>Add Verse</button>
        <button><Link to="/">Log Out</Link></button>
      </div>
    </div>
  );
};

export default LoggedInPage;




// const UserPage = () => {
//   const [savedVerses, setSavedVerses] = useState([]);

//   useEffect(() => {
//     // Function to fetch saved verses by user ID
//     const fetchSavedVerses = async () => {
//       try {
//         // Replace 'USER_ID' with the actual user ID
//         const response = await axios.get(`/api/verses/USER_ID`);
//         setSavedVerses(response.data);
//       } catch (error) {
//         console.error('Error fetching saved verses:', error);
//       }
//     };

//     fetchSavedVerses();
//   }, []); // Fetch saved verses when the component mounts

//   return (
//     <div>
//       <h1>Saved Verses</h1>
//       <ul>
//         {savedVerses.map(verse => (
//           <li key={verse._id}>
//             <p>Book: {verse.book}</p>
//             <p>Chapter: {verse.chapter}</p>
//             <p>Verse: {verse.verse}</p>
//             <p>Text: {verse.text}</p>
//             <p>Practice Attempts: {verse.practiceAttempts}</p>
//             <p>Progress: {verse.progress}</p>
//             <p>Date Saved: {verse.dateSaved}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserPage;
