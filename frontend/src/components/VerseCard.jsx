import React from "react";
import { Link } from "react-router-dom";

const VerseCard = ({ verse }) => {
  return (
    <div>
      {/* Link to view the details of the verse */}
      <Link to={`/verse/${verse._id}`} state={{ verse }}>
        {/* Displaying the verse details */}
        <h3>
          {verse.book} {verse.chapter}:{verse.verse}
        </h3>
      </Link>
    </div>
  );
};

export default VerseCard;

