import React from "react";
import Register from "./register";
import Login from "./login";

const LoginReg = props => {
  let loginWindow = props.match.path.toLocaleLowerCase().includes("register");
  return (
    <div className="loginContainer">
      {(loginWindow && <Register {...props} />) || <Login {...props} />}
    </div>
  );
};
export default LoginReg;
