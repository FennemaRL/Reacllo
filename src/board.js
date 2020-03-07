import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import tc from "./trash-can.svg";
import NewTask from "./newTask";
import UpdateRes from "./updateRes";
import "./board.css";
import axios from "axios";

let reftitle = React.createRef();
const onDragEnd = (result, tables, setTables, boardName, setMessage) => {
  /* taskTitle, boardTitle, tableTitleFrom, tableTitleTo, indexTo */
  let tableTitleTo;
  let tableTitleFrom;

  if (!result.destination) return;

  let { source, destination } = result;
  let indexTo = destination.index;
  let rmItem;
  if (destination.droppableId === source.droppableId) {
    let indexTable = tables.findIndex(c => c.titleTable === source.droppableId);
    let table = tables[indexTable];
    let copytask = [...table.content];
    let tablescopy = [...tables];
    rmItem = copytask.splice(source.index, 1)[0];
    copytask.splice(destination.index, 0, rmItem);
    tablescopy.splice(indexTable, 1, {
      ...table,
      content: copytask
    });
    tableTitleTo = destination.droppableId;
    tableTitleFrom = destination.droppableId;
    setTables(tablescopy);
  }
  if (destination.droppableId !== source.droppableId) {
    let indexTableFrom = tables.findIndex(
      c => c.titleTable === source.droppableId
    );
    let indexTableTo = tables.findIndex(
      c => c.titleTable === destination.droppableId
    );
    let tableFrom = tables[indexTableFrom];
    let tableTo = tables[indexTableTo];
    let copyTaskFrom = [...tableFrom.content];
    let copyTaskTo = [...tableTo.content];
    let tablesCopy = [...tables];
    rmItem = copyTaskFrom.splice(source.index, 1)[0];
    copyTaskTo.splice(destination.index, 0, rmItem);
    tablesCopy.splice(indexTableFrom, 1, {
      ...tableFrom,
      content: copyTaskFrom
    });
    tablesCopy.splice(indexTableTo, 1, { ...tableTo, content: copyTaskTo });

    tableTitleTo = destination.droppableId;
    tableTitleFrom = source.droppableId;
    setTables(tablesCopy);
  }
  console.log(rmItem);
  let token = localStorage.getItem("UserToken");
  axios({
    url: `https://kanban-api-node.herokuapp.com/board/table/task`,
    method: "Patch",
    data: {
      boardTitle: boardName,
      tableTitleTo: tableTitleTo,
      tableTitleFrom: tableTitleFrom,
      taskTitle: rmItem.titleTask,
      indexTo: indexTo
    },
    headers: { token: token }
  })
    .then(
      res => setMessage("se reordeno la tarea correctamente") //message confirm
    )
    .catch(err => setMessage(err.message));
};
const removeTable = (tableTitle, columns, setTables, boardName, setMessage) => {
  let copyColumns = [...columns];
  copyColumns.splice(
    columns.findIndex(c => c.tableTitle === tableTitle),
    1
  );

  let token = localStorage.getItem("UserToken");
  axios({
    url: `https://kanban-api-node.herokuapp.com/board/table/`,
    method: "Delete",
    headers: { token: token },
    data: { boardTitle: boardName, tableTitle: tableTitle }
  })
    .then(
      res => setMessage("se borro correctamente la tabla") //message confirm
    )
    .catch(err => setMessage(err.message));
  setTables(copyColumns);
};
const createTable = (titleTable, tables, setTables, boardName, setMessage) => {
  let token = localStorage.getItem("UserToken");
  if (!tables.includes(titleTable)) {
    axios({
      url: `https://kanban-api-node.herokuapp.com/board/table/`,
      method: "Post",
      headers: { token: token },
      data: { boardTitle: boardName, tableTitle: titleTable }
    })
      .then(
        res =>
          setMessage("se agrego correctamente la tabla") /*message confirm */
      )
      .catch(err => setMessage(err.message));
    let newTable = { titleTable: titleTable, content: [] };
    setTables([...tables, newTable]);
  }
};
const createTask = (titleTable, tables, setColumns, boardName, setMessage) => {
  let tablesCopy = [...tables];
  let tableToAddtaskIndex = tablesCopy.findIndex(
    c => c.titleTable === titleTable
  );
  let columnToAddCopy = { ...tablesCopy.splice(tableToAddtaskIndex, 1)[0] };

  return task => {
    if (task) {
      let token = localStorage.getItem("UserToken");
      columnToAddCopy.item = columnToAddCopy.content.push(task);
      tablesCopy.splice(tableToAddtaskIndex, 0, columnToAddCopy);
      axios({
        url: `https://kanban-api-node.herokuapp.com/board/table/task/`,
        method: "Post",
        headers: { token: token },
        data: { boardTitle: boardName, tableTitle: titleTable, task: task }
      })
        .then(res =>
          setMessage("se agrego correctamente la tarea")
        ) /*message confirm */

        .catch(err => setMessage(err.message));
      setColumns(tablesCopy);
    }
  };
};
const removeTask = (
  titleTable,
  taskIndex,
  task,
  tables,
  setTables,
  boardName,
  setMessage
) => {
  let copyTables = [...tables];
  let table = copyTables.find(t => t.titleTable === titleTable);
  table.content.splice(taskIndex, 1);

  let token = localStorage.getItem("UserToken");
  axios({
    url: `https://kanban-api-node.herokuapp.com/board/table/task/`,
    method: "delete",
    headers: { token: token },
    data: {
      boardTitle: boardName,
      tableTitle: titleTable,
      titleTask: task.titleTask
    }
  })
    .then(res => setMessage("se borro correctamente la tarea"))
    .catch(err => setMessage(err.message));
  setTables(copyTables);
};
const TableMapper = ({
  tables,
  setTables,
  boardTitle,
  setMessage,
  setnewTask
}) => {
  return tables.map(table => {
    return (
      <div key={table.titleTable} className="column">
        <h3 className="title">{table.titleTable}</h3>
        <img
          src={tc}
          alt=""
          className="trashCan"
          title="delete column"
          onClick={() =>
            removeTable(
              table.titleTable,
              tables,
              setTables,
              boardTitle,
              setMessage
            )
          }
        />

        <Droppable key={table.titleTable} droppableId={table.titleTable} place>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="listContainer"
                style={{
                  backgroundColor: snapshot.isDraggingOver ? "lightblue" : ""
                }}
              >
                {table.content.map((task, indx) => {
                  return (
                    <Draggable
                      key={task.titleTask}
                      draggableId={task.titleTask}
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
                            <p className="title">{task.titleTask}</p>
                            <img
                              src={tc}
                              style={{ width: "3.5%" }}
                              className="trashCan"
                              title="delete task"
                              alt=""
                              onClick={() => {
                                removeTask(
                                  table.titleTable,
                                  indx,
                                  task,
                                  tables,
                                  setTables,
                                  boardTitle,
                                  setMessage
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
              setnewTask({ display: true, tableID: table.titleTable })
            }
          >
            +
          </button>
        </div>
      </div>
    );
  });
};
function Board(props) {
  const [tables, setTables] = useState([]);
  const [newTask, setnewTask] = useState({
    display: false,
    tableID: undefined
  });
  const [message, setMessage] = useState("");
  useEffect(() => {
    let token = localStorage.getItem("UserToken");

    axios({
      url: `https://kanban-api-node.herokuapp.com/board/${props.match.params.boardTitle}`,
      method: "Get",
      headers: { token: token }
    })
      .then(res => {
        setTables(res.data.tables);
      })
      .catch(err => {
        if (err.message === "not authorized jwt expired")
          console.log("cagaste Papu");
      });
  }, []);
  return (
    <div>
      <NewTask
        task={newTask}
        close={() => setnewTask({ display: false, tableID: undefined })}
        addTask={createTask(
          newTask.tableID,
          tables,
          setTables,
          props.match.params.boardTitle,
          setMessage
        )}
      />
      <UpdateRes message={message} />
      <div className="board">
        {" "}
        <DragDropContext
          onDragEnd={result =>
            onDragEnd(
              result,
              tables,
              setTables,
              props.match.params.boardTitle,
              setMessage
            )
          }
        >
          <TableMapper
            tables={tables}
            setTables={setTables}
            boardTitle={props.match.params.boardTitle}
            setMessage={setMessage}
            setnewTask={setnewTask}
          />
        </DragDropContext>
        <div className="newColumn">
          <input ref={reftitle} type="text" placeholder="Add new row" />
          <button
            onClick={e => {
              e.preventDefault();
              reftitle.current.value
                ? (() => {
                    createTable(
                      reftitle.current.value,
                      tables,
                      setTables,
                      props.match.params.boardTitle,
                      setMessage
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
