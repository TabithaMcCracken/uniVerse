import React from 'react';
import { Link } from 'react-router-dom'; 

const VerseCard = ({ verse }) => {
  return (
    <div className="verse-card">
        <Link to={`/verse/${verse._id}`} state={{ verse }}>
      <h3>{verse.book} {verse.chapter}:{verse.verse}</h3>
      {/* <p>{verse.text}</p> */}
      </Link>
    </div>
  );
};

export default VerseCard;



// // import React from 'react';
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// // import 'dotenv/config'
// // require('dotenv').config();
// // const apiKey = process.env.REACT_APP_ESV_API_KEY;
// // dotenv.config();

// const VersePage = () => {
//   const location = useLocation();
//   const { verse } = location.state;
//   const [verseText, setVerseText] = useState('');

//   useEffect(() => {
//     const fetchVerseText = async () => {
//       try {
//         const { book, chapter, verse: verseNumber } = verse; //??? Maybe takes parts of the verse state?
//         const response = await axios.get(`https://api.esv.org/v3/passage/text/?q=${book}+${chapter}:${verseNumber}`, {
//           headers: {
//             Authorization: `Token ${apiKey}`
//           }
//         });
//         setVerseText(response.data.passages[0]);
//       } catch (error) {
//         console.error('Error fetching verse text:', error);
//       }
//     };

//     fetchVerseText();
//   }, [verse]);



//   if (!verse) {
//     return <div>Error: No verse data available</div>
//   }

//   return (
//     <div className="single-verse-page">
//       <h2>{verse.book} {verse.chapter}:{verse.verse}</h2>
//       <p>{verseText}</p>
//     </div>
//   );
// };

// export default VersePage;

