import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  state = {};
  render() {
    return (
      <header
        style={{
          width: "100%",
          minHeight: "60px",
          backgroundColor: "#607D8B",
          color: "white",
          display: "flex",
          alignItems: "center",
          fontWeight: "600",
          justifyContent: "space-between"
        }}
      >
        <Link
          to="/boards/userTest"
          style={{ fontSize: "1.5em", fontStyle: "italic", marginLeft: "15px" }}
        >
          Reacllo
        </Link>
        <div
          style={{
            paddingRight: "15px",
            display: "flex",
            width: "300px",
            justifyContent: "space-between"
          }}
        >
          <Link to="/boards/userTest">
            <button
              style={{
                width: "80px",
                height: "30px",
                borderRadius: "5px",
                color: "Lightgrey",
                backgroundColor: "#455A64",
                border: "none"
              }}
            >
              {" "}
              MyBoard
            </button>
          </Link>
          <nav
            style={{ alignItems: "center", display: "flex", fontWeight: "300" }}
          >
            <img />
            <p>Pepe rumualdo</p>
          </nav>
        </div>
      </header>
    );
  }
}

export default Nav;
