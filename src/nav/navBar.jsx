import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import userin from "../img/user.svg";
import reg from "../img/register2.svg";
import logout from "../img/logout2.svg";

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
        {(isLog && (
          <div className="buttons">
            <Link to="/reacllo/">
              <button
                onClick={() => {
                  setDisplayNav(!displayNav);
                  logOutUser(props.history);
                }}
              >
                <img
                  src={logout}
                  style={{ width: "15%", filter: "invert(100%)" }}
                  alt="cerrar sesión"
                />
                &nbsp; Cerrar&nbsp; sesión
              </button>
            </Link>
          </div>
        )) || (
          <div className="buttons">
            <Link to="/reacllo/login/">
              <button onClick={() => setDisplayNav(!displayNav)}>
                <img
                  src={userin}
                  style={{ width: "15%", filter: "invert(100%)" }}
                  alt="Ingresa"
                />
                &nbsp; Ingresa
              </button>
            </Link>
            <Link to="/reacllo/register/">
              <button onClick={() => setDisplayNav(!displayNav)}>
                <img
                  src={reg}
                  style={{ width: "15%", filter: "invert(100%)" }}
                  alt="Registrate"
                />
                &nbsp;Registrate
              </button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
