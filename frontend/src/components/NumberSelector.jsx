import React, { useState } from "react";

function NumberSelector({ handleNumberInput }) {
  const [selectedNumber, setSelectedNumber] = useState(7);

  const handleNumberClick = (number) => {
    setSelectedNumber(number);
    handleNumberInput(number);
  };

  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div>
      <div className="number-buttons">
        {numbers.map((number) => (
          <button
            key={number}
            className={number <= selectedNumber ? "selected" : "notselected"}
            onClick={() => handleNumberClick(number)}
          >
            {number}
          </button>
        ))}
      </div>
      <div className="numberbelow">
        <div>not likely</div>
        <div> very likely</div>
      </div>
    </div>
  );
}

export default NumberSelector;
