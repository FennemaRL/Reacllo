import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

const logOutUser = history => {
  localStorage.removeItem("userName");
  localStorage.removeItem("UserToken");
  history.push("/");
};

const Nav = props => {
  let isLog = localStorage.getItem("userName");
  let userName = localStorage.getItem("userName") || "UserTest";
  return (
    <header>
      <Link to="/boards/">Reacllo</Link>
      <div className="userNav">
        <nav>
          <p>{userName}</p>
          {(isLog && (
            <button onClick={() => logOutUser(props.history)}>LogOut</button>
          )) || (
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
