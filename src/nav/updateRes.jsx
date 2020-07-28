import React, { useState, useEffect } from "react";
import "./updateRes.css";
import ok from "../img/ok.png";
import fail from "../img/fail.png";
const UpdateRes = ({ notification }) => {
  const [message, setMessage] = useState({message :undefined , type:""});
  useEffect(() => {
      setMessage(notification)
  }, [notification]);
  return (
    <>
      {message.message && (
        <div className={message.message ?  "updateMessage display" : "updateMessage"}>
        <div className="updateRes">
          <img src={message.type ? fail: ok} alt="icon notification"/>
          <p>{message.message}</p>
          <p onClick={() => setMessage("")} className="closeUpdateRes">
            x
          </p>
        </div>
        </div>
      )}
    </>
  );
};
let nothaveToUpdate=(prevProps,nextProps)  => !nextProps.notification || !nextProps.notification.message

export default  React.memo(UpdateRes,nothaveToUpdate) 
