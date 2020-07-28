import React, { PureComponent } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import { Link } from "react-router-dom";
import arrayMove from "array-move";
import tc from "../img/trash-can.svg";
import hand from "../img/grab.png";
import "./boards.css";
import axios from "axios";
import BoardForm from "./boardForm";
import {getToken, getUserName, closeSession, getUrl} from "../userUtil";

const DragHandle = SortableHandle(() => {
  return (
    <span className="position " title="arrastrame para reordenar">
      <img src={hand} alt="arrastrame" />
    </span>
  );
});
const SortableList = SortableContainer(({ items, removeBoard, onCreateBoard, setMessage, hasBoardName }) => {
    return (
      <ul>
        {items.map((value, index) => (
          <SortableItem
            removeBoard={removeBoard}
            key={`item-${value + index}`}
            index={index}
            value={value}
          />
        ))}
        <li>
          <BoardForm onCreateBoard={onCreateBoard} setMessage={setMessage} hasBoardName={hasBoardName}/>
        </li>
      </ul>
    );
});

const SortableItem = SortableElement(({ value, removeBoard }) => {
  return (
    <li tabIndex={value} /*position relative */>
      <div className="board">
        <img src={tc}
          className="trashCan boardhide boardt"
          title="remove board"
          alt=""
          onClick={() => {
            removeBoard(value);
          }}
        />
        <DragHandle />
        <Link to={`/Reacllo/board/${value}`}>
          {value}
          <div className="rowContainer">
            <div className="row" />
            <div className="row" />
            <div className="row" />
          </div>
        </Link>
      </div>
    </li>
  );
});

class Boards extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      boardsObs: [],
      firstFetch: true,
    };
    this.setState = this.setState.bind(this);
  }
  errHandler = err => {
    closeSession()
    if (err.response.status === 401) {
      this.props.setNotification({
        message:"La ultima accion no pudo guardarse debido a que los permisos del usuario caducaron, logueese nuevamente",type :"error" })
  }
  
}

  removeBoard = board => {
    axios({
      url: `${getUrl()}/board/`,
      method: "DELETE",
      headers: { token: getToken() },
      data: { boardTitle: board }
    })
      .then(res =>  this.props.setNotification({message: "se borro exitosamente"}))
      .catch(err => this.errHandler(err));

    this.setState(prev => {
      let copy = [...prev.boardsObs];
      copy.splice(
        copy.findIndex(b => b === board),
        1
      )
      return { boardsObs: copy}
    })
  }

  removeBoard = this.removeBoard.bind(this);

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ boardsObs }) => {
      let newOrder = arrayMove(boardsObs, oldIndex, newIndex)
      axios({
        url: `${getUrl() }/user/neworder`,
        method: "Patch",
        headers: { token: getToken() },
        data: { boardsOrder: newOrder }
      })
        .then(res =>  this.props.setNotification({message: "se reordeno exitosamente"} ))
        .catch(err => this.errHandler(err))
      return { boardsObs: newOrder, message: "actualizando ..." }
    })
  }
  createBoard = board => {
    axios({
      url: `${getUrl()}/board`,
      method: "POST",
      headers: { token: getToken() },
      data: { boardTitle: board }
    })
      .then(res =>  this.props.setNotification({message: "se guardo exitosamente"}))
      .catch(err => this.errHandler(err));
    this.setState(prevs => {
      return {
        boardsObs: [...prevs.boardsObs, board],
        message: "actualizando ..."
      };
    });
  }
  hasBoardName = boardTitle => {
    if (this.state.boardsObs.includes(boardTitle)) return true
    return false
  }
  hasBoardName = this.hasBoardName.bind(this);

  _getBoards() {
    let user = getUserName()
      
    if (this.state.firstFetch) {
      axios
        .get(`${getUrl() }/user/${user}`)
        .then(res => {
          this.setState({ boardsObs: res.data.boards, firstFetch: false });
        })
        .catch(err => console.log(err.message));
    }
  }
  componentDidMount() {
    this._getBoards();
  }
  componentDidUpdate() {
    this._getBoards();
  }
  render() {
    return (
      <>
        <div className="container boards">
          <SortableList
            items={this.state.boardsObs}
            onSortEnd={this.onSortEnd}
            useDragHandle={true}
            removeBoard={this.removeBoard}
            onCreateBoard={this.createBoard}
            setMessage={this.props.setNotification}
            hasBoardName={this.hasBoardName}
            axis="xy"
          />
        </div>
      </>
    );
  }
}

export default Boards;
