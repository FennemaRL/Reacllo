import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
class Nav extends Component {
  state = {};
  render() {
    return (
      <header>
        <Link to="/boards/userTest">Reacllo</Link>
        <div className="userNav">
          <Link to="/boards/userTest">
            <button>MyBoards</button>
          </Link>
          <nav>
            <img />
            <p>Pepe rumualdo</p>
          </nav>
        </div>
      </header>
    );
  }
}

export default Nav;
