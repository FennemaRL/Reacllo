import React, { Component } from "react";
import tc from "./trash-can.svg";
import NewTask from "./newTask";
import ColumnList from "./columnList";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";
let item1 = [
  { id: "1", title: "title", body: "texte", date: "date" },
  { id: "2", title: "title1", body: "texte", date: "date" },
  { id: "3", title: "title2", body: "texte", date: "date" }
];

const TitleDragger = SortableHandle(({ title }) => (
  <div
    style={{
      textAlign: "center",
      marginTop: "8px"
    }}
  >
    {" "}
    {title}
  </div>
));
const SortableItem = SortableElement(({ value, onSortEndList }) => (
  <li
    style={{
      backgroundColor: "#ECEFF1",
      boxShadow: "0px 4px 5px 0px rgba(0,0,0,0.75)",
      margin: "0px 16px",
      minWidth: "400px",
      minHeight: "55vh",
      borderRadius: "3px",
      position: "relative"
    }}
  >
    <TitleDragger title={value.title} />
    <ColumnList tasks={value.items} onSortEndList={onSortEndList(value.id)} />
  </li>
));
const SortableList = SortableContainer(({ items, onSortEndList }) => {
  return (
    <div>
      <ul style={{ display: "flex" }}>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${value.id}`}
            index={index}
            value={value}
            onSortEndList={onSortEndList}
          />
        ))}
      </ul>
    </div>
  );
});

class Board extends Component {
  state = {
    columns: [
      { id: "3", title: "papa1", items: item1, order: 1 },
      { id: "4", title: "papa2", items: [], order: 2 },
      { id: "7", title: "papa3", items: [], order: 2 },
      { id: "6", title: "papa4", items: [], order: 2 }
    ]
  };
  onSortEndList = columnId => {
    let copyColumns = [...this.state.columns];
    let indexColumn = copyColumns.findIndex(c => c.id == columnId);
    let copyColumn = copyColumns[indexColumn];
    return ({ oldIndex, newIndex }) => {
      console.log(copyColumn.items);
      console.log(oldIndex, newIndex);
      copyColumn.items = arrayMove(copyColumn.items, oldIndex, newIndex);
      console.log("reordenar :)");
      console.log(copyColumn.items);
      this.setState({ columns: copyColumns });
    };
  };
  onSortEndColumn = ({ oldIndex, newIndex }) => {
    this.setState(({ columns }) => ({
      columns: arrayMove(columns, oldIndex, newIndex)
    }));
  };
  render() {
    return (
      <div
        style={{
          minHeight: "90.8vh",
          paddingTop: "30px",
          overflowX: "auto",
          backgroundColor: "#B0BEC5"
        }}
      >
        <SortableList
          items={this.state.columns}
          onSortEnd={this.onSortEndColumn}
          axis="x"
          useDragHandle={true}
          onSortEndList={this.onSortEndList}
        />
      </div>
    );
  }
}
export default Board;
