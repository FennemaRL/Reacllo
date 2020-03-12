import React, { Component, useState } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import { Link } from "react-router-dom";
import arrayMove from "array-move";
import tc from "./trash-can.svg";
import hand from "./grab.png";
import "./boards.css";
import axios from "axios";
import UpdateRes from "./updateRes";
import BoardForm from "./boardForm";
let styleLi = {
  textDecoration: "none",
  color: "white",
  flex: " 0 1 18%",
  margin: "30px",
  height: "90px",
  borderRadius: "2px",

  boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.75)",
  backgroundColor: "#B0BEC5"
};
const DragHandle = SortableHandle(() => {
  return (
    <span title="arrastrame para reordenar">
      <img src={hand} alt="arrastrame" />
    </span>
  );
});
const SortableList = SortableContainer(
  ({ items, removeBoard, onCreateBoard }) => {
    return (
      <ul style={{ display: "flex", flexWrap: "wrap" }}>
        {items.map((value, index) => (
          <SortableItem
            removeBoard={removeBoard}
            key={`item-${value + index}`}
            index={index}
            value={value}
          />
        ))}
        <li style={styleLi}>
          <BoardForm onCreateBoard={onCreateBoard} />
        </li>
      </ul>
    );
  }
);

const SortableItem = SortableElement(({ value, removeBoard }) => {
  const [trashCanState, setTrashCanState] = useState(false);
  return (
    <li
      tabIndex={value}
      style={{ ...styleLi, position: "relative" }}
      onMouseEnter={() => setTrashCanState(true)}
      onMouseLeave={() => setTrashCanState(false)}
    >
      <div style={{ width: "100%", height: "100%", padding: "8px" }}>
        {trashCanState && (
          <img
            src={tc}
            className="trashCan boardt"
            title="remove board"
            alt=""
            onClick={() => {
              removeBoard(value);
            }}
          />
        )}
        <DragHandle />
        <Link to={`/board/${value}`}>
          <h4 style={{ marginTop: "12px" }}>{value}</h4>
          <div style={{ display: "flex" }}>
            <div className="row" />
            <div className="row" />
            <div className="row" />
          </div>
        </Link>
      </div>
    </li>
  );
});

class Boards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardsObs: [],
      firstFetch: true,
      message: props.location.message
    };
    this.setState = this.setState.bind(this);
  }

  errHandler = err => {
    localStorage.removeItem("UserToken");
    localStorage.removeItem("userName");
    if (err.response.status === 401) {
      this.setState({
        message:
          "La ultima accion no pudo guardarse debido a que los permisos del usuario caducaron, logueese nuevamente",
        firstFetch: true
      });
    }
  };

  removeBoard = board => {
    let token = localStorage.getItem("UserToken");
    let uri = process.env.REACT_APP_DEFAULT_URLBACKEND;
    axios({
      url: `${uri}/board/`,
      method: "DELETE",
      headers: { token: token },
      data: { boardTitle: board }
    })
      .then(res => this.setState({ message: "se borro exitosamente" }))
      .catch(err => this.errHandler(err));

    this.setState(prev => {
      let copy = [...prev.boardsObs];
      copy.splice(
        copy.findIndex(b => b === board),
        1
      );
      return { boardsObs: copy, message: "actualizando ..." };
    });
  };

  removeBoard = this.removeBoard.bind(this);

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ boardsObs }) => {
      let token = localStorage.getItem("UserToken");
      let newOrder = arrayMove(boardsObs, oldIndex, newIndex);
      let uri = process.env.REACT_APP_DEFAULT_URLBACKEND;
      axios({
        url: `${uri}/user/neworder`,
        method: "Patch",
        headers: { token: token },
        data: { boardsOrder: newOrder }
      })
        .then(res => this.setState({ message: "se reordeno exitosamente" }))
        .catch(err => this.errHandler(err));
      return { boardsObs: newOrder, message: "actualizando ..." };
    });
  };
  createBoard = board => {
    let token = localStorage.getItem("UserToken");

    if (this.state.boardsObs.includes(board)) {
      this.setState({ message: "Existe una board con ese nombre" });
      return;
    }
    let uri = process.env.REACT_APP_DEFAULT_URLBACKEND;
    axios({
      url: `${uri}/board`,
      method: "POST",
      headers: { token: token },
      data: { boardTitle: board }
    })
      .then(res => this.setState({ message: "se guardo exitosamente" }))
      .catch(err => this.errHandler(err));
    this.setState(prevs => {
      return {
        boardsObs: [...prevs.boardsObs, board],
        message: "actualizando ..."
      };
    });
  };

  _getToken() {
    if (!localStorage.getItem("UserToken")) {
      let uri = process.env.REACT_APP_DEFAULT_URLBACKEND;
      axios
        .post(`${uri}/user/login`, {
          userName: process.env.REACT_APP_DEFAULT_USER,
          password: process.env.REACT_APP_DEFAULT_PASSWORD
        })
        .then(res => localStorage.setItem("UserToken", res.data.token))
        .catch(err => console.log(err.message));
    }
  }
  _getBoards() {
    let user = localStorage.getItem("userName") || "Test";
    if (this.state.firstFetch) {
      let uri = process.env.REACT_APP_DEFAULT_URLBACKEND;
      axios
        .get(`${uri}/user/${user}`)
        .then(res => {
          this.setState({ boardsObs: res.data.boards, firstFetch: false });
        })
        .catch(err => console.log(err.message));
    }
  }
  componentDidMount() {
    this._getToken();
    this._getBoards();
  }
  componentDidUpdate() {
    this._getToken();
    this._getBoards();
  }
  render() {
    return (
      <>
        <UpdateRes message={this.state.message} />
        <div
          style={{
            minHeight: "79vh",
            minWidth: "70%",
            margin: "0 15%",
            paddingTop: "30px"
          }}
        >
          <SortableList
            helperClass="sortableCursor"
            items={this.state.boardsObs}
            onSortEnd={this.onSortEnd}
            useDragHandle={true}
            removeBoard={this.removeBoard}
            onCreateBoard={this.createBoard}
            axis="xy"
          />
        </div>
      </>
    );
  }
}

export default Boards;
