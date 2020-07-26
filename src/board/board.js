import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import tc from "../img/trash-can.svg";
import edit from "../img/edit.svg";
import TaskWiewer from "./taskUtil";
import UpdateRes from "../nav/updateRes";
import "./board.css";
import axios from "axios";
import NewTable from  "./newTable"


const onDragEnd = (
  result,
  tables,
  setTables,
  boardName,
  setMessage,
  redirect
) => {
  let tableTitleTo;
  let tableTitleFrom;

  if (!result.destination) return;

  let { source, destination } = result;
  let indexTo = destination.index;
  let rmItem;
  if (destination.droppableId === source.droppableId) {
    let indexTable = tables.findIndex(
      (c) => c.titleTable === source.droppableId
    );
    let table = tables[indexTable];
    let copytask = [...table.content];
    let tablescopy = [...tables];
    rmItem = copytask.splice(source.index, 1)[0];
    copytask.splice(destination.index, 0, rmItem);
    tablescopy.splice(indexTable, 1, {
      ...table,
      content: copytask,
    });
    tableTitleTo = destination.droppableId;
    tableTitleFrom = destination.droppableId;
    setTables(tablescopy);
  }
  if (destination.droppableId !== source.droppableId) {
    let indexTableFrom = tables.findIndex(
      (c) => c.titleTable === source.droppableId
    );
    let indexTableTo = tables.findIndex(
      (c) => c.titleTable === destination.droppableId
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
      content: copyTaskFrom,
    });
    tablesCopy.splice(indexTableTo, 1, { ...tableTo, content: copyTaskTo });

    tableTitleTo = destination.droppableId;
    tableTitleFrom = source.droppableId;
    setTables(tablesCopy);
  }
  let uri = process.env.REACT_APP_DEFAULT_URLBACKEND;

  let token =
    localStorage.getItem("UserToken") || process.env.REACT_APP_DEFAULT_TOKEN;
  axios({
    url: `${uri}/board/table/`,
    method: "Patch",
    data: {
      boardTitle: boardName,
      tableTitleTo: tableTitleTo,
      tableTitleFrom: tableTitleFrom,
      taskTitle: rmItem.taskTitle,
      indexTo: indexTo,
    },
    headers: { token: token },
  })
    .then(
      (res) => setMessage("se reordeno la tarea correctamente") //message confirm
    )
    .catch((err) => redirect(err));
  setMessage("actualizando ...");
};
const removeTable = (
  tableTitle,
  tables,
  setTables,
  boardName,
  setMessage,
  redirect
) => {
  let copyTables = JSON.parse(
    JSON.stringify(tables.filter((t) => t.titleTable !== tableTitle))
  );

  let token =
    localStorage.getItem("UserToken") || process.env.REACT_APP_DEFAULT_TOKEN;
  let uri = process.env.REACT_APP_DEFAULT_URLBACKEND;
  axios({
    url: `${uri}/board/table/`,
    method: "Delete",
    headers: { token: token },
    data: { boardTitle: boardName, tableTitle: tableTitle },
  })
    .then(
      (res) => setMessage("se borro correctamente la tabla") //message confirm
    )
    .catch((err) => redirect(err));
  setTables(copyTables);

  setMessage("actualizando ...");
};
const createTable = (
  titleTable,
  tables,
  setTables,
  boardName,
  setMessage,
  redirect
) => {
  let token =
    localStorage.getItem("UserToken") || process.env.REACT_APP_DEFAULT_TOKEN;
  let uri = process.env.REACT_APP_DEFAULT_URLBACKEND;
  axios({
    url: `${uri}/board/table/`,
    method: "Post",
    headers: { token: token },
    data: { boardTitle: boardName, tableTitle: titleTable },
  })
    .then(
      (res) =>
        setMessage("se agrego correctamente la tabla") /*message confirm */
    )
    .catch((err) => {
      redirect(err);
    });
  let newTable = { titleTable: titleTable, content: [] };
  setTables([...tables, newTable]);
  setMessage("actualizando ...");
};
const createTask = (
  titleTable,
  tables,
  setTables,
  boardName,
  setMessage,
  redirect,
  titlesinUse,
  setTitlesTask
) => {
  let tablesCopy = [...tables];
  let tableToAddtask = tablesCopy.find((c) => c.titleTable === titleTable);

  return (task, errMessageFunc, close) => {
    if (task) {
      let title2Verify = task.taskTitle.toLowerCase();
      if (titlesinUse.has(title2Verify)) {
        errMessageFunc("ya existe una tarea con ese nombre");
        return;
      }
      let token =
        localStorage.getItem("UserToken") ||
        process.env.REACT_APP_DEFAULT_TOKEN;
      tableToAddtask.content.push(task);
      let uri = process.env.REACT_APP_DEFAULT_URLBACKEND;
      axios({
        url: `${uri}/board/table/task/`,
        method: "Post",
        headers: { token: token },
        data: { boardTitle: boardName, tableTitle: titleTable, task: task },
      })
        .then((res) => {
          setMessage("se agrego correctamente la tarea");
          setTitlesTask((titlesinUse) => titlesinUse.add(title2Verify));
        })
        .catch((err) => redirect(err));
      close();
      setTables(tablesCopy);
      setMessage("actualizando ...");
    }
  };
};
const removeTask = (
  /*2 modify */
  titleTable,
  taskIndex,
  task,
  tables,
  setTables,
  boardName,
  setMessage,
  redirect,
  setTitlesTask
) => {
  let copyTables = [...tables];
  let table = copyTables.find((t) => t.titleTable === titleTable);
  table.content.splice(taskIndex, 1);

  let token =
    localStorage.getItem("UserToken") || process.env.REACT_APP_DEFAULT_TOKEN;
  let uri = process.env.REACT_APP_DEFAULT_URLBACKEND;
  axios({
    url: `${uri}/board/table/task/`,
    method: "delete",
    headers: { token: token },
    data: {
      boardTitle: boardName,
      tableTitle: titleTable,
      taskTitle: task.taskTitle,
    },
  })
    .then((res) => {
      setMessage("se borro correctamente la tarea");
      setTitlesTask((titles) => titles.delete(task.taskTitle.toLowerCase()));
    })
    .catch((err) => redirect(err));
  setTables(copyTables);
};
const editTask = (
  /*a modify */
  titleTable,
  tables,
  setTables,
  boardName,
  setMessage,
  redirect,
  titlesinUse,
  setTitlesTask
) => {
  let tablesCopy = [...tables];
  let tableToModifytask = tablesCopy.find((c) => c.titleTable === titleTable);

  return (oldTask, newTask, errMessageFunc, close) => {
    let taskToModifyIndex = tableToModifytask.content.findIndex(
      (t) => t.taskTitle === oldTask.taskTitle
    );
    let titleTask2Remove = oldTask.taskTitle.toLowerCase();
    let titleTask2Add = newTask.taskTitle.toLowerCase();
    if (titleTask2Add === titleTask2Remove || !titlesinUse.has(titleTask2Add)) {
      tableToModifytask.content.splice(taskToModifyIndex, 1, newTask);
      setTables(tablesCopy); /* miss api call*/
      setTitlesTask((titles) => {
        titles.delete(titleTask2Remove);
        return titles.add(titleTask2Add);
      });
      let token =
        localStorage.getItem("UserToken") ||
        process.env.REACT_APP_DEFAULT_TOKEN;
      let uri = process.env.REACT_APP_DEFAULT_URLBACKEND;
      axios({
        url: `${uri}/board/table/task/`,
        method: "Patch",
        headers: { token: token },
        data: {
          boardTitle: boardName,
          tableTitle: titleTable,
          taskTitleToRemove: oldTask.taskTitle,
          newTask: newTask,
        },
      })
        .then((res) => {
          setMessage("se modifico correctamente la tarea");
        })
        .catch((err) => redirect(err));
      close();
      setTables(tablesCopy);
      setMessage("actualizando ...");
    } else errMessageFunc("Ya existe una tarea con ese nombre");
  };
};

function Board(props) {
  const [tables, setTables] = useState([]);
  const [taskTitlesinUse, setTaskTitles] = useState(new Set());
  const [taskWiewerInfo, setTaskViewerinfo] = useState({
    display: false /*cambiar a tipo de view (newTask, editTask, none) */,

    tableID: undefined /*se tiene que quedar para crear la nueva tarea */,
    task: null /*en el caso de editarla */,
  });
  const redirect = (props) => (err) => {
    if (err.response.status === 401) {
      localStorage.removeItem("UserToken");
      localStorage.removeItem("userName");
      props.history.push({
        pathname: "/boards",
        message:
          "La ultima accion no pudo guardarse debido a que los permisos del usuario caducaron, ingrese nuevamente ",
      }); /*setear mensaje de log out */
    }
    if (
      err.response.status === 400 &&
      err.response.data.message === "Board not found"
    ) {
      props.history.push({
        pathname: "/boards",
        message: "No existe una pizarra con ese titulo ",
      });
    } else {
      props.history.push({
        pathname: "/boards",
        message: err.response.data.message,
      });
    }
  };
  const [message, setMessage] = useState("");
  const latestProps = useRef(props);
  useEffect(() => {
    latestProps.current = props;
  });
  useEffect(() => {
    let token =
      localStorage.getItem("UserToken") || process.env.REACT_APP_DEFAULT_TOKEN;
    let uri = process.env.REACT_APP_DEFAULT_URLBACKEND;
    axios({
      url: `${uri}/board/${latestProps.current.match.params.boardTitle}`,
      method: "Get",
      headers: { token: token },
    })
      .then((res) => {
        setTables(res.data.tables);
        let set2save = new Set();
        res.data.tables.forEach((table) =>
          table.content.forEach((task) =>
            set2save.add(task.taskTitle.toLowerCase())
          )
        );
        setTaskTitles(set2save);
      })
      .catch((err) => redirect(latestProps.current)(err));
  }, []);
  return (
    <>
      <TaskWiewer taskWiewerInfo={taskWiewerInfo}
                  close={() =>
                  setTaskViewerinfo({ display: false, tableID: undefined, task: null })
                  }
        addTask={createTask(
          taskWiewerInfo.tableID,
          tables,
          setTables,
          props.match.params.boardTitle,
          setMessage,
          redirect,
          taskTitlesinUse,
          setTaskTitles
        )}
        editTask={editTask(
          taskWiewerInfo.tableID,
          tables,
          setTables,
          props.match.params.boardTitle,
          setMessage,
          redirect,
          taskTitlesinUse,
          setTaskTitles
        )}
      />
      <UpdateRes message={message} />
      <div className="container boardW">
        <DragDropContext
          onDragEnd={(result) =>
            onDragEnd(
              result,
              tables,
              setTables,
              props.match.params.boardTitle,
              setMessage,
              redirect(props)
            )
          }
        >
          <TablesMapper
            tables={tables}
            setTables={setTables}
            boardTitle={props.match.params.boardTitle}
            setMessage={setMessage}
            setTaskViewerinfo={setTaskViewerinfo}
            setTaskTitles={setTaskTitles}
            redirect={redirect(props)}
          />
        </DragDropContext>
        <NewTable tables={tables}  setTables={setTables} setMessage={setMessage} props={props} redirect={redirect} createTable={createTable}/>
      </div>
    </>
  );
}

const TablesMapper = ({
  tables,
  setTables,
  boardTitle,
  setMessage,
  setTaskViewerinfo,
  redirect,
  setTaskTitles,
}) => {
  return tables.map((table) => {
    return (
      <div key={table.titleTable} className="table">
        <h3 className="title">{table.titleTable}</h3>
        <img src={tc}
          alt=""
          className="trashCan tablehide"
          title="borrar tabla"
          onClick={() =>
            removeTable(
              table.titleTable,
              tables,
              setTables,
              boardTitle,
              setMessage,
              redirect
            )
          }
        />
        <hr/>
        <Droppable key={table.titleTable} droppableId={table.titleTable}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="listContainer"
                style={{
                  backgroundColor: snapshot.isDraggingOver ? "lightblue" : "",
                }}
              >
                {table.content.map((task, indx) => {
                  return (
                    <Draggable
                      key={task.taskTitle}
                      draggableId={task.taskTitle}
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
                                : "",
                              ...provided.draggableProps.style,
                            }}
                          >
                            <p className="titleTask">{task.taskTitle}</p>
                            <p className="description">{task.description}</p>
                            <img
                              src={tc}
                              className="trashCan taskhide"
                              title="borrar tarea"
                              alt=""
                              onClick={() => {
                                removeTask(
                                  table.titleTable,
                                  indx,
                                  task,
                                  tables,
                                  setTables,
                                  boardTitle,
                                  setMessage,
                                  setTaskTitles
                                );
                              }}
                            />
                            <img
                              src={edit}
                              title="editar tarea"
                              className="edit"
                              alt=""
                              onClick={() =>
                                setTaskViewerinfo({
                                  display: true,
                                  tableID: table.titleTable,
                                  task: task,
                                })
                              }
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
        <hr/>
        <div className="containerButtonNewTask">
          <button
            title="crear una nueva tarea"
            className="btnNewTask"
            onClick={() =>
              setTaskViewerinfo({
                display: true,
                tableID: table.titleTable /*edit aca new task */,
              })
            }
          >+ agregar tarea</button>
        </div>
      </div>
    );
  });
};
export default Board;
