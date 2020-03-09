import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

const logOutUser = () => {
  localStorage.removeItem("userName");
  localStorage.removeItem("UserToken");
};
const Nav = () => {
  let isLog = localStorage.getItem("userName");
  let userName = localStorage.getItem("userName") || "UserTest";
  return (
    <header>
      <Link to="/boards/">Reacllo</Link>
      <div className="userNav">
        <nav>
          <p>{userName}</p>
          {(isLog && <button onCLick={logOutUser}>LogOut</button>) || (
            <div className="buttons">
              <Link to="/login/">
                <button>logIn</button>
              </Link>
              <Link to="/register/">
                <button>Register</button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Nav;
