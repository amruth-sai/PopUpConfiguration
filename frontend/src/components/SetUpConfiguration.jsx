import React from "react";

const SetUpConfiguration = ({
  inputValues,
  inputValues1,
  onChangeInput1,
  onChangeInput2,
  onChangeInput3,
  onChangeInput4,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChangeInput1(e);
  };
  const handleInputChange1 = (key, id, value) => {
    onChangeInput2(key, id, value);
  };
  const handleInputChange2 = (id) => {
    onChangeInput3(id);
  };

  let condition = "";
  let size = inputValues1["items"].length;
  const Section2 = inputValues1["items"].map((item, index) => {
    if (index == 0) condition = "Page Loads";
    else condition = inputValues1["items"][index - 1]["type"];

    return (
      <li key={item.id} className="step">
        <div>{index+1}</div>
        <select
          className="selectinside"
          name="condition"
          id={"condition" + item["id"]}
          value={condition}
          onChange={(event) => alert("Please Change in above Type")}
        >
          {index == 0 && <option value="Page Loads">Page Loads</option>}
          {index != 0 && (
            <>
              <option value="Free Text">Free Text Submitted</option>{" "}
              <option value="NPS Score">NPS Score Submitted</option>
            </>
          )}
        </select>
        <div className="stepInside">Display</div>
        <select
          name="type"
          id={"type" + item["id"]}
          value={item.type}
          onChange={(event) =>
            handleInputChange1(item["id"], "type", event.target.value)
          }
        >
          <option value="Free Text">Free Text</option>
          <option value="NPS Score">NPS Score</option>
        </select>
        <input
          className="type"
          type="text"
          name="question"
          value={item["question"]}
          onChange={(event) =>
            handleInputChange1(item["id"], "question", event.target.value)
          }
          placeholder="Type something..."
        />
        {(size == 1 && index == 0) ?<div></div>: <button onClick={(e) => handleInputChange2(item["id"])}>X</button>}
        {index + 1 == size && <button onClick={onChangeInput4}>+</button>}
      </li>
    );
  });
  return (
    <>
      <div className="leftouter">
        <div className="left">
          <div className="question">
            Choose how much time to wait before showing the survey
          </div>
          <div className="ansinput">
            <input
              name="input1"
              type="number"
              value={inputValues.input1}
              onChange={handleInputChange}
            ></input>
            <div>seconds</div>
          </div>
        </div>
        <div>
          <div className="question">
            Do not display the popup to the user after
          </div>
          <div className="ansinput">
            <input
              name="input2"
              type="number"
              value={inputValues.input2}
              onChange={handleInputChange}
            ></input>
            <div>times</div>
          </div>
        </div>
        <div>
          <div className="question">Dispaly Frequency - every</div>
          <div className="ansinput">
                      <select
                          id="selectidfortime"
              name="input3"
              value={inputValues.input3}
              onChange={handleInputChange}
            >
              <option value="1 hour">1 hour</option>
              <option value="1 min">1 min</option>
              <option value="5 mins">5 mins</option>
              <option value="30 mins">30 mins</option>
            </select>
            <div>Other options : 1 min, 5 mins, 30mins</div>
          </div>
        </div>
      </div>
      <div className="rightouter">
        <div>Edit the flow steps</div>
        <ol className="steps">{Section2}</ol>
      </div>
    </>
  );
};

export default SetUpConfiguration;
