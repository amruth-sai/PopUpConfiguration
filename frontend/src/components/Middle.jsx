import React from "react";
import axios from "axios";
import getTime from "../../Utils/GetTime";
import { useState, useEffect } from "react";
import Card from "./Card";
const Middle = ({ waitTime, maxNumberofTimes, frequency, items }) => {
  const [visiblePopups, setVisiblePopups] = useState([]);
  const [popupCount, setPopupCount] = useState(0);
  const [isStyled, setIsStyled] = useState(false);
  const [answers, setAnswers] = useState({});
  const freq = getTime(frequency);

  const handleReviewInput = (id, value) => {
    setAnswers({ ...answers, [id]: value });
    handleNext();
  };
  const handleNext = () => {
    const nextPopup = items[popupCount % items.length];
    // if (popupCount % items.length === 0) console.log(answers);
      if (items.length == 1) {
          if (popupCount+1 > maxNumberofTimes * items.length) {
              setIsStyled(true);
          }
          else {
              setIsStyled(true);
              setTimeout(() => {
                  setIsStyled(false);
              }, freq*0.1);
          }
    }
    setVisiblePopups([nextPopup]);
    setPopupCount(popupCount + 1);
  };
  useEffect(() => {
    if (popupCount === 0) {
      setTimeout(() => {
        setPopupCount(1);
        setVisiblePopups([items[0]]);
      }, waitTime * 1000);
    }
    if (popupCount > maxNumberofTimes * items.length) {
      setIsStyled(true);
    } else if (popupCount !== 1 && popupCount % items.length === 1) {
      setIsStyled(true);
      setTimeout(() => {
        setIsStyled(false);
      }, freq);
    }
  }, [popupCount, waitTime, items]);
  useEffect(() => {
    if (Object.keys(answers).length === items.length) {
      axios
        .post("http://127.0.0.1:5000/save_review", answers)
        .then((response) => {
          // console.log("Response from backend:", response.data["inserted_id"]);
          alert("Successfully saved review");
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle any errors here
        });

      //   console.log(answers);
      setAnswers({});
    }
  }, [answers]);
  return visiblePopups.length !== 0 ? (
    <div className={`my-element ${isStyled ? "temp-style" : ""}`}>
      <Card
        item={visiblePopups[0]}
        flag={popupCount % items.length}
        handleNext={handleNext}
        handleReviewInput={handleReviewInput}
      />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Middle;
