import React from "react";
import Register from "./register";
import Login from "./login";

const LoginReg = props => {
  let loginWindow = props.match.path.toLocaleLowerCase().includes("register");
  return (
    <div
      style={{
        minHeight: "88vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D9D9D9"
      }}
    >
      {(loginWindow && <Register {...props} />) || <Login {...props} />}
    </div>
  );
};
export default LoginReg;
