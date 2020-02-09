import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
let item1 = [
  { id: "1", title: "title", body: "texte", date: "date" },
  { id: "2", title: "title1", body: "texte", date: "date" },
  { id: "3", title: "title2", body: "texte", date: "date" }
];
const columns1 = [
  { id: "3", items: item1, order: 1 },
  { id: "4", items: [], order: 2 }
];

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  let { source, destination } = result;
  let indexColumn = columns.findIndex(c => c.id === source.droppableId);
  let column = columns[indexColumn];
  let copyItems = [...column.items];
  let rmItem = copyItems.splice(source.index, 1)[0];
  copyItems.splice(destination.index, 0, rmItem);
  console.log("copyItems after");
  console.log(copyItems);
  let colcopy = [...columns];
  colcopy.splice(indexColumn, 1, {
    ...column,
    items: copyItems
  });
  console.log("columnas modificadas");
  console.log(colcopy);
  setColumns(colcopy);
};

function App() {
  const [columns, setColumns] = useState(columns1);
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          minHeight: "100vh",
          minWidth: "20vw"
        }}
      >
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {columns.map(column => {
            return (
              <Droppable key={column.id} droppableId={column.id} place>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        backgroundColor: snapshot.isDraggingOver
                          ? "lightblue"
                          : "lightgrey",
                        padding: 4,
                        width: 250,
                        height: 500,
                        margin: "8px"
                      }}
                    >
                      {console.log(column.items) ||
                        column.items.map((item, indx) => {
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
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {" "}
                                    {item.title}
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
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
