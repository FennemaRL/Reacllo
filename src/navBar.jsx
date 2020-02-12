import React, { Component } from "react";

class Nav extends Component {
  state = {};
  render() {
    return (
      <header
        style={{
          width: "100%",
          minHeight: "75px",
          backgroundColor: "#607D8B",
          color: "white",
          display: "flex",
          alignItems: "center"
        }}
      >
        <a>TrelloRR</a>
      </header>
    );
  }
}

export default Nav;
