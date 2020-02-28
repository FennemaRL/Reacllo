import React, { Component, useState } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import { Link } from "react-router-dom";
import arrayMove from "array-move";
import tc from "./trash-can.svg";
import "./boards.css";
import axios from "axios";
let styleLi = {
  textDecoration: "none",
  color: "white",
  flex: " 0 1 18%",
  margin: "30px",
  padding: "8px",
  height: "90px",
  borderRadius: "5px",

  boxShadow: "0px 4px 5px 0px rgba(0,0,0,0.75)",
  backgroundColor: "#B0BEC5"
};
const NewBoard = props => {
  let hefinput = React.createRef();
  const [display, setDisplay] = useState(false);
  return (
    <li style={styleLi}>
      <p
        style={{ marginTop: "12px", display: display ? "none" : "" }}
        onClick={() => {
          setDisplay(true);
        }}
      >
        add new board
      </p>
      <div style={{ display: !display ? "none" : "" }}>
        <p>Title : </p>
        <input
          ref={hefinput}
          style={{
            height: "15px",
            width: "90%",
            marginTop: "5px",
            borderRadius: "5px",
            padding: "5px"
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "98%"
          }}
        >
          <button
            style={{
              flex: 0.62,
              margin: "8px 0",
              height: "24px",
              borderRadius: "1px",
              border: "none",
              color: "white",
              backgroundColor: "#1A7737"
            }}
            onClick={() => {
              if (hefinput.current.value) {
                let title = hefinput.current.value;
                hefinput.current.value = "";
                setDisplay(false);
                props.onCreateBoard(title);
              }
            }}
          >
            Add
          </button>
          <button
            style={{
              flex: 0.33,
              height: "24px",
              margin: "8px 0",
              borderRadius: "1px",
              border: "none",
              color: "white",
              backgroundColor: "#CC161C"
            }}
            onClick={() => {
              hefinput.current.value = "";
              setDisplay(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </li>
  );
};
const DragHandle = SortableHandle(() => {
  let inputRef = React.createRef();
  return (
    <span ref={inputRef} title="Drag to order">
      :::
    </span>
  );
});
const SortableList = SortableContainer(({ items, onClose, onCreateBoard }) => {
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
      <NewBoard onCreateBoard={onCreateBoard} />
    </ul>
  );
});

const SortableItem = SortableElement(({ value, onCloseF }) => (
  <li tabIndex={value} style={{ ...styleLi, position: "relative" }}>
    <img
      src={tc}
      className="trashCan"
      title="remove board"
      style={{
        height: "15px",
        width: "15px",
        position: "absolute",
        top: "6px",
        right: "6px"
      }}
      alt=""
      onClick={() => {
        onCloseF(prebBoards => {
          let boardsCopy = [...prebBoards.boardsObs];
          boardsCopy.splice(
            prebBoards.boardsObs.findIndex(c => c === value),
            1
          );
          return { boardsObs: boardsCopy };
        });
      }}
    />
    <DragHandle />
    <Link to="/board/userTest">
      <h3 style={{ marginTop: "12px" }}>{value}</h3>
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
    </Link>
  </li>
));

class Boards extends Component {
  state = {
    boardsObs: [],
    user: {
      userName: localStorage.getItem("UserName") || "Test"
    }
  };

  setState = this.setState.bind(this);
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ boardsObs }) => ({
      boardsObs: arrayMove(boardsObs, oldIndex, newIndex)
    }));
  };
  createBoard = board => {
    let token = localStorage.getItem("UserToken");

    if (!this.state.boardsObs.includes(board)) {
      axios({
        url: `https://kanban-api-node.herokuapp.com/board`,
        method: "POST",
        headers: { token: token },
        data: { boardTitle: board }
      })
        .then(res => {
          console.log("se guardo exitosamente");
        })
        .catch(err => {
          if (err.message === "not authorized jwt expired")
            console.log("cagaste Papu");
        });

      this.setState(prevs => {
        return {
          boardsObs: [...prevs.boardsObs, board]
        };
      });
    }
  };
  componentDidMount() {
    if (!localStorage.getItem("UserToken")) {
      axios
        .post(`https://kanban-api-node.herokuapp.com/user/login`, {
          userName: process.env.REACT_APP_DEFAULT_USER,
          password: process.env.REACT_APP_DEFAULT_PASSWORD
        })
        .then(res => localStorage.setItem("UserToken", res.data.token))
        .catch(e => console.log(e));
    }
    axios
      .get(`https://kanban-api-node.herokuapp.com/user/Test`)
      .then(res => {
        this.setState({ boardsObs: res.data.boards });
      })
      .catch(err => console.warn(err.message));
  }
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
          onCreateBoard={this.createBoard}
          axis="xy"
        />
      </div>
    );
  }
}

export default Boards;
