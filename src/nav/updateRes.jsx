import React, { useState, useEffect } from "react";
import "./updateRes.css";
const UpdateRes = ({ message }) => {
  const [messages, setMessage] = useState("");
  useEffect(() => {
    setMessage(message);
  }, [message]);

  return (
    messages && (
      <div className="updateRes">
        <p>{messages}</p>
        <p onClick={() => setMessage("")} className="closeUpdateRes">
          x
        </p>
      </div>
    )
  );
};
export default UpdateRes;
