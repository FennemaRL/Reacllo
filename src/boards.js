import React, { Component } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul style={{ display: "flex", flexWrap: "wrap" }}>
      {items.map((value, index) => (
        <SortableItem
          key={`item-${value + index}`}
          index={index}
          value={value}
        />
      ))}
    </ul>
  );
});

const SortableItem = SortableElement(({ value }) => (
  <li
    tabIndex={0}
    style={{
      textDecoration: "none",
      backgroundColor: "black",
      color: "white",
      flex: " 0 1 18%",
      margin: "30px",
      padding: "8px",
      height: "90px",
      borderRadius: "5px",
      textDecoration: "none",
      backgroundColor: "#B0BEC5"
    }}
  >
    <h3>{value.boardTitle}</h3>
    <div style={{ display: "flex" }}>
      <div
        style={{
          height: "35px",
          width: "15px",
          margin: "2px",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: "2px"
        }}
      />
      <div
        style={{
          height: "25px",
          width: "15px",
          margin: "2px",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: "2px"
        }}
      />
      <div
        style={{
          height: "15px",
          width: "15px",
          margin: "2px",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: "2px"
        }}
      />
    </div>
  </li>
));

class Boards extends Component {
  state = {
    boardsObs: [
      { id: "1", boardTitle: "boardTitle" },
      { id: "2", boardTitle: "boardTitle1" },
      { id: "3", boardTitle: "boardTitle2" },
      { id: "4", boardTitle: "boardTitle3" },
      { id: "5", boardTitle: "boardTitle4" }
    ]
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ boardsObs }) => ({
      boardsObs: arrayMove(boardsObs, oldIndex, newIndex)
    }));
  };

  render() {
    return (
      <div
        style={{
          minHeight: "89vh",
          minWidth: "70%",
          margin: "0 15%",
          paddingTop: "30px"
        }}
      >
        <SortableList
          items={this.state.boardsObs}
          onSortEnd={this.onSortEnd}
          axis="xy"
        />
      </div>
    );
  }
}

export default Boards;
