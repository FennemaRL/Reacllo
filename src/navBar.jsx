import React, { Component } from "react";

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
        <a
          style={{ fontSize: "1.5em", fontStyle: "italic", marginLeft: "15px" }}
        >
          Reacllo
        </a>
        <div
          style={{
            paddingRight: "15px",
            display: "flex",
            width: "300px",
            justifyContent: "space-between"
          }}
        >
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
