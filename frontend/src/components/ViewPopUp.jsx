import React, { useEffect, useState } from "react";
import axios from "axios";
import getCookie from "../../Utils/GetCookie";
import Middle from "./Middle";

const ViewPopUp = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // console.log(data);

  useEffect(() => {
    const cookie = getCookie("id");
    if (!cookie) return <div>Please do some configuration</div>;

    const temp = {
      inserted_id: cookie,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get("http://127.0.0.1:5000/get_data", {
        params: temp,
        headers: headers,
      })
      .then((response) => {
        // console.log(response["data"]);
        if (response["data"] == null) {
          alert("Please do some configuration");
        }
        else {
          setData(response.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        alert(error)
      });
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="main_container">
        <Middle
          waitTime={data.waitTime}
          maxNumberofTimes={data.maxNumberofTimes}
          frequency={data.Frequency}
          items={data.items}        
        />
    </div>
  );
};

export default ViewPopUp;
