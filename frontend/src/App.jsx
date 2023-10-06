import { useState } from "react";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import SetUpConfiguration from "./components/SetUpConfiguration";
import ViewPopUp from "./components/ViewPopUp";
import NoPage from "./components/NoPage";
import "./App.css";
import Preview from "./components/Preview";
import setCookie from "../Utils/SetCookie";

function App() {
  const [inputValues, setInputValues] = useState({
    input1: 10,
    input2: 3,
    input3: "1 hour",
  });
  const [items, setItems] = useState({
    items: [
      {
        id: 1,
        type: "NPS Score",
        question: "How likely are you to recommend Pivoy to a colleague?",
      },
      {
        id: 2,
        type: "Free Text",
        question: "Question 2?",
      },
      {
        id: 3,
        type: "NPS Score",
        question: "Question 3?",
      },
    ],
  });

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };
  const handleInputChange2 = (id, key, value) => {
    setItems((prevItems) => ({
      ...prevItems,
      items: prevItems.items.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      ),
    }));
  };
  const handleDelete = (id) => {
    setItems((prevState) => ({
      items: prevState.items.filter((item) => item.id !== id),
    }));
  };
  const handleAddNewFlow = () => {
    const newItem = {
      id: getNextItemId(), 
      type: "NPS Score",
      question: "New Question",
    };

    setItems((prevItems) => ({
      items: [...prevItems.items, newItem],
    }));
  };
  // Function to get the next available ID
  const getNextItemId = () => {
    const maxId = Math.max(...items.items.map((item) => item.id), 0);
    return maxId + 1;
  };
  const sendDataToBackend = () => {
    const data = {
      waitTime: inputValues.input1,
      maxNumberofTimes: inputValues.input2,
      Frequency: inputValues.input3,
      items: items.items,
    };

    axios
      .post("http://127.0.0.1:5000/process_input", data)
      .then((response) => {
        // console.log("Response from backend:", response.data["inserted_id"]);
        setCookie("id", response.data["inserted_id"], 1);
        alert("Successfully Changed ");
      })
      .catch((error) => {
        // console.error("Error:", error);
        alert("Network Error ocurred, please try again");
      });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <SetUpConfiguration
                inputValues={inputValues}
                inputValues1={items}
                onChangeInput1={handleInputChange1}
                onChangeInput2={handleInputChange2}
                onChangeInput3={handleDelete}
                onChangeInput4={handleAddNewFlow}
              />
              <div>
                <Preview inputValues={items.items} />
              </div>
              <div className="bottomcontainer">
                <div>Store the configuration of survey in the DB</div>
                <button onClick={sendDataToBackend}>Save</button>
                <Link className="anotherButton" to="/view">
                  View
                </Link>
              </div>
            </div>
          }
        />

        <Route
          path="view"
          element={
            <>
              <ViewPopUp />
              <Link className="anotherButton homeButton" to="/">
                Home
              </Link>
            </>
          }
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
