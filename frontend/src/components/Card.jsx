import React, { useState } from "react";
import NumberSelector from "./NumberSelector";

const Card = ({ item, flag, handleNext, handleReviewInput }) => {
  const [rating, setRating] = useState(7);
  const [review, setReview] = useState("");
  const handleNumberInput = (rating) => {
    setRating(rating);
  };
  const handleReviewInputin = (e) => {
    setReview(e.target.value);
  };
  const handleTemp = (e) => {
    if (item.type === "NPS Score") {
      handleReviewInput(item.id, rating);
    } else {
      handleReviewInput(item.id, review);
    }
    
  };
  return (
    <div className="card">
      <div className="topcard">{item.question}</div>
      <div>
        {item.type === "NPS Score" && (
          <NumberSelector handleNumberInput={handleNumberInput} />
        )}
        {item.type === "Free Text" && (
          <textarea
            className="freetext"
            defaultValue={"Free Text area"}
            onChange={handleReviewInputin}
          ></textarea>
        )}
      </div>
      <div>
        {flag ? (
          <button onClick={handleTemp}>Next</button>
        ) : (
          <button onClick={handleTemp}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default Card;
