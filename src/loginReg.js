import React from "react";
import Register from "./register";
import Login from "./login";

const LoginReg = props => {
  let loginWindow = props.match.path.toLocaleLowerCase().includes("register");
  return (
    <div
      style={{
        minHeight: "79vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {(loginWindow && <Register {...props} />) || <Login {...props} />}
    </div>
  );
};
export default LoginReg;
