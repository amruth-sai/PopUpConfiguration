import React from "react";
import Card from "./Card"
const Preview = ({ inputValues }) => {
    // console.log(inputValues);
    let size = inputValues.length;
  return (
    <div className="bottomcontainer">
          <div>Preview</div>
          <div>Your surevy will look like</div>
          <div className="cards">
              {inputValues.map(((item, index) => {
                  
                  return (<Card key={item.id} item={item} flag={(index + 1) == size} />)
              }))}
          </div>
    </div>
  );
};

export default Preview;
