import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";

const logOutUser = history => {
  localStorage.removeItem("userName");
  localStorage.removeItem("UserToken");
};

const Nav = props => {
  let isLog = localStorage.getItem("userName");
  let userName = localStorage.getItem("userName") || "UserTest";
  const [displayNav, setDisplayNav] = useState(false);
  return (
    <header
      className={displayNav ? (isLog ? "displayNavB1" : "displayNavB2") : ""}
    >
      {/*agregar con onclick faltan transiciones */}
      <div style={{ flex: "1" }}>
        <Link to="/reacllo/">Reacllo</Link>
      </div>
      <div className="userNav">
        <Link to="/reacllo/">{userName} </Link>
        <span className="hide" onClick={() => setDisplayNav(!displayNav)}>
          |||
        </span>
      </div>
      <nav className="mobileDisplay">
        {/*agregar con onclick faltan transiciones */}
        {(isLog && (
          <div className="buttons">
            <Link to="/reacllo/">
              <button
                onClick={() => {
                  setDisplayNav(!displayNav);
                  logOutUser(props.history);
                }}
              >
                Log out
              </button>
            </Link>
          </div>
        )) || (
          <div className="buttons">
            <Link to="/reacllo/login/">
              <button onClick={() => setDisplayNav(!displayNav)}>
                Ingresa
              </button>
            </Link>
            <Link to="/reacllo/register/">
              <button onClick={() => setDisplayNav(!displayNav)}>
                Registrate
              </button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
