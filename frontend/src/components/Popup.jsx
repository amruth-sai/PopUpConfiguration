import React, { useState, useEffect } from "react";

const Popup = ({ isLast, visiblePopups, handleNext }) => {
  return (
    <div>
      {visiblePopups.map((popup, index) => (
        <div key={index} className="popup">
          {popup.question}
          {popup.type}
          {isLast ? (
            <button onClick={handleNext}>Next</button>
          ) : (
            <button onClick={handleNext}>Submit</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Popup;
