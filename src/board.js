import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import tc from "./trash-can.svg";
import NewTask from "./newTask";
import "./board.css";
import axios from "axios";

let reftitle = React.createRef();
const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  let { source, destination } = result;
  if (destination.droppableId === source.droppableId) {
    let indexColumn = columns.findIndex(c => c.title === source.droppableId);
    let column = columns[indexColumn];
    let copyItems = [...column.items];
    let colcopy = [...columns];
    let rmItem = copyItems.splice(source.index, 1)[0];
    copyItems.splice(destination.index, 0, rmItem);
    colcopy.splice(indexColumn, 1, {
      ...column,
      items: copyItems
    });
    setColumns(colcopy);
  }
  if (destination.droppableId !== source.droppableId) {
    let indexColumnFrom = columns.findIndex(
      c => c.title === source.droppableId
    );
    let indexColumnTo = columns.findIndex(
      c => c.title === destination.droppableId
    );
    let columnFrom = columns[indexColumnFrom];
    let columnTo = columns[indexColumnTo];
    let copyItemsFrom = [...columnFrom.items];
    let copyItemsTo = [...columnTo.items];
    let colcopy = [...columns];
    let rmItem = copyItemsFrom.splice(source.index, 1)[0];
    copyItemsTo.splice(destination.index, 0, rmItem);
    colcopy.splice(indexColumnFrom, 1, { ...columnFrom, items: copyItemsFrom });
    colcopy.splice(indexColumnTo, 1, { ...columnTo, items: copyItemsTo });
    setColumns(colcopy);
  }
};
const removeColumn = (columnId, columns, setColumns) => {
  let copyColumns = [...columns];
  copyColumns.splice(
    columns.findIndex(c => c.title === columnId),
    1
  );
  setColumns(copyColumns);
};
const createColumn = (titleTable, columns, setColumns, boardName) => {
  let token = localStorage.getItem("UserToken");
  axios({
    url: `https://kanban-api-node.herokuapp.com/board/newTable/`,
    method: "Post",
    headers: { token: token },
    data: { boardTitle: boardName, tableTitle: titleTable }
  })
    .then(res => {
      console.log(res); /*message confirm */
    })
    .catch(err => {
      if (err.message === "not authorized jwt expired")
        console.log("cagaste Papu");
    });
  let newColumn = { title: titleTable, items: [] };
  setColumns([...columns, newColumn]);
};
const createTask = (columnId, columns, setColumns) => {
  let columnsCopy = [...columns];
  let columnToAddtaskIndex = columnsCopy.findIndex(c => c.title === columnId);
  let columnToAddCopy = { ...columnsCopy.splice(columnToAddtaskIndex, 1)[0] };

  return task => {
    if (task) {
      columnToAddCopy.item = columnToAddCopy.items.push(task);
      columnsCopy.splice(columnToAddtaskIndex, 0, columnToAddCopy);
      setColumns(columnsCopy);
    }
  };
};
const removeTask = (columnId, taskIndex, columns, setColumns) => {
  let copyColumns = [...columns];
  let columnIndex = columns.findIndex(c => c.title === columnId);
  let columnCopy = { ...copyColumns.splice(columnIndex, 1)[0] };
  columnCopy.items.splice(taskIndex, 1);
  copyColumns.splice(columnIndex, 0, columnCopy);
  setColumns(copyColumns);
};
function Board(props) {
  const [columns, setColumns] = useState([]);
  const [newTask, setnewTask] = useState({
    display: false,
    columnId: undefined
  });
  useEffect(() => {
    let token = localStorage.getItem("UserToken");

    axios({
      url: `https://kanban-api-node.herokuapp.com/board/${props.match.params.boardTitle}`,
      method: "Get",
      headers: { token: token }
    })
      .then(res => {
        /*fetch */
        console.log(res);
      })
      .catch(err => {
        if (err.message === "not authorized jwt expired")
          console.log("cagaste Papu");
      });
  }, [props.match.params.boardTitle]);
  return (
    <div>
      <NewTask
        task={newTask}
        close={() => setnewTask({ display: false, columnId: undefined })}
        addTask={createTask(newTask.columnId, columns, setColumns)}
      />
      <div className="board">
        {" "}
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {columns.map(column => {
            return (
              <div key={column.title} className="column">
                <h3 className="title">{column.title}</h3>
                <img
                  src={tc}
                  alt=""
                  className="trashCan"
                  title="delete column"
                  onClick={() =>
                    removeColumn(column.title, columns, setColumns)
                  }
                />

                <Droppable key={column.title} droppableId={column.title} place>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="listContainer"
                        style={{
                          backgroundColor: snapshot.isDraggingOver
                            ? "lightblue"
                            : ""
                        }}
                      >
                        {column.items.map((item, indx) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={indx}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="itemList"
                                    style={{
                                      backgroundColor: snapshot.isDragging
                                        ? "#CFD8DC"
                                        : "#FAFAFA",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <p className="title">{item.title}</p>
                                    <img
                                      src={tc}
                                      style={{ width: "3.5%" }}
                                      className="trashCan"
                                      title="delete task"
                                      alt=""
                                      onClick={() => {
                                        removeTask(
                                          column.title,
                                          columns,
                                          setColumns
                                        );
                                      }}
                                    />
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>

                <div className="containerButtonNewTask">
                  <button
                    title="create new task"
                    className="newTask"
                    onClick={() =>
                      setnewTask({ display: true, columnId: column.title })
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </DragDropContext>
        <div className="newColumn">
          <input ref={reftitle} type="text" placeholder="Add new row" />
          <button
            onClick={e => {
              e.preventDefault();
              reftitle.current.value
                ? (() => {
                    createColumn(
                      reftitle.current.value,
                      columns,
                      setColumns,
                      props.match.params.boardTitle
                    );
                    reftitle.current.value = "";
                  })()
                : (() => {})();
            }}
          >
            >
          </button>
        </div>
      </div>
    </div>
  );
}
export default Board;
