import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
class Nav extends Component {
  state = {};
  logOutUser() {
    localStorage.removeItem("userName");
    localStorage.removeItem("UserToken");
  }
  render() {
    let isLog = localStorage.getItem("userName");
    let userName = localStorage.getItem("userName") || "UserTest";

    return (
      <header>
        <Link to="/boards/">Reacllo</Link>
        <div className="userNav">
          <nav>
            <p>{userName}</p>
            {(isLog && <button onCLick={this.logOutUser}>LogOut</button>) || (
              <div className="buttons">
                <button>logIn</button>
                <button>Register</button>
              </div>
            )}
          </nav>
        </div>
      </header>
    );
  }
}

export default Nav;
