
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import VerseCard from '../components/VerseCard';

const LoggedInPage = () => {
  const { userId } = useParams();
    const [savedVerses, setSavedVerses] = useState([]);
    const [error, setError] = useState(null);
  
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
        <Link to={`/add-verse/${userId}`}><button>Add Verse</button></Link>
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
