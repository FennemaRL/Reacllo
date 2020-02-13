import React, { Component } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";

/*
          });*/
let styleLi = {
  textDecoration: "none",
  backgroundColor: "black",
  color: "white",
  flex: " 0 1 18%",
  margin: "30px",
  padding: "8px",
  height: "90px",
  borderRadius: "5px",
  backgroundColor: "#B0BEC5"
};
const DragHandle = SortableHandle(() => (
  <span
    style={{
      height: "10px",
      width: "10px",
      position: "absolute",
      top: "0px",
      left: "6px"
    }}
  >
    ::
  </span>
));
const SortableList = SortableContainer(({ items, onClose }) => {
  return (
    <ul style={{ display: "flex", flexWrap: "wrap" }}>
      {items.map((value, index) => (
        <SortableItem
          onCloseF={onClose}
          key={`item-${value + index}`}
          index={index}
          value={value}
        />
      ))}
      <li style={styleLi}>add new</li>
    </ul>
  );
});

const SortableItem = SortableElement(({ value, onCloseF }) => (
  <li tabIndex={value.id} style={{ ...styleLi, position: "relative" }}>
    <div
      style={{
        height: "10px",
        width: "10px",
        backgroundColor: "black",
        position: "absolute",
        top: "6px",
        right: "6px"
      }}
      onClick={() => {
        onCloseF(prebBoards => {
          let boardsCopy = [...prebBoards.boardsObs];
          boardsCopy.splice(
            prebBoards.boardsObs.findIndex(c => c.id === value.id),
            1
          );
          return { boardsObs: boardsCopy };
        });
      }}
    />
    <DragHandle />
    <h3 style={{ marginTop: "12px" }}>{value.boardTitle}</h3>
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
      { id: "1", boardTitle: "Test" },
      { id: "2", boardTitle: "Test2" },
      { id: "3", boardTitle: "Test3" }
    ]
  };
  setState = this.setState.bind(this);
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
          useDragHandle={true}
          onClose={this.setState}
          axis="xy"
        />
      </div>
    );
  }
}

export default Boards;
