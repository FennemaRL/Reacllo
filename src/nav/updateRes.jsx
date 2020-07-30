import React, { useState, useEffect } from "react";
import "./updateRes.css";
import ok from "../img/ok.png";
import fail from "../img/fail.png";


const UpdateRes = ({ notification }) => {
  const [message, setMessage] = useState({})
  useEffect(() => {    
      setMessage(notification)

      let toexecute = () => {setMessage({})}

      let close = setTimeout( toexecute,1500)

      return   () =>{ clearTimeout(close); toexecute()}
  }, [notification])
  
  return (
    <>
        <div className={message.message ?  "updateMessage display"  : "updateMessage "}>
          <div className="updateRes">
            {message.message && <img src={message.type ? fail: ok} alt="icon notification"/>}
            <p>{message.message}</p>
          </div>
        </div>
    </>
  );
};
let nothaveToUpdate=(prevProps,nextProps)  =>!nextProps.notification || !nextProps.notification.message

export default  React.memo(UpdateRes,nothaveToUpdate)  
