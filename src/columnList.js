import React, { Component } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

const SortableItem = SortableElement(({ value }) => (
  <li
    style={{
      backgroundColor: "#CFD8DC",
      margin: "8px 4px",
      minHeight: "5vh",
      borderRadius: "3px",
      position: "relative"
    }}
  >
    tarta{value}
  </li>
));
const SortableList = SortableContainer(({ items }) => {
  return (
    <div>
      <ul>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${value + index}`}
            index={index}
            value={value.title}
          />
        ))}
      </ul>
    </div>
  );
});

const columnList = props => {
  return (
    <div style={{ margin: "16px 8px", height: "90%" }}>
      <SortableList items={props.tasks} onSortEnd={props.onSortEndList} />
    </div>
  );
};

export default columnList;
