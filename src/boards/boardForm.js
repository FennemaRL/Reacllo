import React, { useState, useRef } from "react";
import ButtonForm from "./bf";

const CreateButton = ({ setDisplay }) => {
  return (
    <div className="board containerButton" onClick={() => setDisplay(true)}>
      <button className="buttonFormBoard">Nueva Pizarra</button>
    </div>
  );
};
const BoardForm = props => {
  let wrapperRefForm = useRef(null);
  const [display, setDisplay] = useState(false);

  return (
    (display && (
      <ButtonForm setDisplay={setDisplay} rf={wrapperRefForm} {...props} />
    )) || <CreateButton setDisplay={setDisplay} />
  );
};
export default BoardForm;
