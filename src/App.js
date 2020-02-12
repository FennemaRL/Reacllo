import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import tc from "./trash-can.svg";
import tv from "./view.svg";
import NewTask from "./newTask";
import Nav from "./navBar";
let item1 = [
  { id: "1", title: "title", body: "texte", date: "date" },
  { id: "2", title: "title1", body: "texte", date: "date" },
  { id: "3", title: "title2", body: "texte", date: "date" }
];
/*
for (let i = 4; i < 20; i++) {
  item1.push({ id: i.toString(), title: `title${i}` });
}*/

const columns1 = [
  { id: "3", title: "papa", items: item1, order: 1 },
  { id: "4", title: "papa", items: [], order: 2 }
];
let reftitle = React.createRef();
const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  let { source, destination } = result;
  if (destination.droppableId === source.droppableId) {
    let indexColumn = columns.findIndex(c => c.id === source.droppableId);
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
    let indexColumnFrom = columns.findIndex(c => c.id === source.droppableId);
    let indexColumnTo = columns.findIndex(
      c => c.id === destination.droppableId
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
    columns.findIndex(c => c.id === columnId),
    1
  );
  setColumns(copyColumns);
};
const createColumn = (
  titleColumn,
  columns,
  setColumns,
  idActual,
  setSuccId
) => {
  let newColumn = { id: idActual.toString(), title: titleColumn, items: [] };
  setSuccId(idActual + 1);
  setColumns([...columns, newColumn]);
};
const createTask = (columnId, columns, setColumns) => {
  let columnsCopy = [...columns];
  let columnToAddtaskIndex = columnsCopy.findIndex(c => c.id === columnId);
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
  let columnIndex = columns.findIndex(c => c.id === columnId);
  let columnCopy = { ...copyColumns.splice(columnIndex, 1)[0] };
  columnCopy.items.splice(taskIndex, 1);
  copyColumns.splice(columnIndex, 0, columnCopy);
  setColumns(copyColumns);
};
function App() {
  const [columns, setColumns] = useState(columns1);
  const [idNext, setSuccId] = useState(5);
  const [newTask, setnewTask] = useState({
    display: false,
    columnId: undefined
  });
  return (
    <div className="App">
      <Nav />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          minHeight: "100vh",
          maxWidth: "100vw",
          overflowY: "auto",
          backgroundColor: "#B0BEC5",
          paddingTop: "30px"
        }}
      >
        <NewTask
          task={newTask}
          close={() => setnewTask({ display: false, columnId: undefined })}
          addTask={createTask(newTask.columnId, columns, setColumns)}
        />{" "}
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {columns.map(column => {
            return (
              <div
                key={column.id}
                style={{
                  backgroundColor: "#ECEFF1",
                  margin: "0px 16px",
                  minWidth: "35%",
                  borderRadius: "3px",
                  position: "relative"
                }}
              >
                <p style={{ margin: "12px 8px", textTransform: "capitalize" }}>
                  {column.title}
                </p>
                <img
                  src={tc}
                  style={{ position: "absolute", top: "8px", right: "8px" }}
                  onClick={() => removeColumn(column.id, columns, setColumns)}
                />

                <Droppable key={column.id} droppableId={column.id} place>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          backgroundColor: snapshot.isDraggingOver
                            ? "lightblue"
                            : "",
                          margin: "8px 8px 0px 8px",
                          overflowY: "auto",
                          overflowX: "hidden",
                          borderRadius: "5px"
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
                                    style={{
                                      userSelect: "none",
                                      padding: "16px",
                                      margin: "0 0 8px 0",
                                      minHeight: "10px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#CFD8DC"
                                        : "#FAFAFA",
                                      color: "black",
                                      textAlign: "left",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {" "}
                                    <div
                                      style={{
                                        display: "flex",
                                        textTransform: "capitalize"
                                      }}
                                    >
                                      <p onClick={() => console.log("papa")}>
                                        {item.title}
                                      </p>
                                      <div style={{ flex: "1" }} />
                                      <img
                                        src={tc}
                                        style={{ width: "2.8%" }}
                                        onClick={() => {
                                          removeTask(
                                            column.id,
                                            indx,
                                            columns,
                                            setColumns
                                          );
                                        }}
                                      />
                                    </div>
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

                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <button
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "#607D8B",
                      color: "white",
                      width: "50px",
                      height: "50px",
                      fontSize: "2.5em"
                    }}
                    onClick={() =>
                      setnewTask({ display: true, columnId: column.id })
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </DragDropContext>
        <div
          style={{
            backgroundColor: "grey",
            margin: "8px",
            maxHeight: "0vh",
            borderRadius: "8px",
            textAlign: "center",
            position: "relative"
          }}
        >
          <div>
            <input ref={reftitle} placeholder="Add new row" />
            <button
              onClick={e => {
                e.preventDefault();
                reftitle.current.value
                  ? (() => {
                      createColumn(
                        reftitle.current.value,
                        columns,
                        setColumns,
                        idNext,
                        setSuccId
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
    </div>
  );
}

export default App;
