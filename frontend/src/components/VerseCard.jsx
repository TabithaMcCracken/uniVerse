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
