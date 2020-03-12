import React, { useState, useEffect } from "react";
const UpdateRes = ({ message }) => {
  const [messages, setMessage] = useState("");
  useEffect(() => {
    setMessage(message);
  }, [message]);

  return (
    <>
      {messages && (
        <div
          style={{
            backgroundColor: "#9A94BC",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            color: "white",
            height: "40px"
          }}
        >
          <p>{messages}</p>
        </div>
      )}
    </>
  );
};
export default UpdateRes;
