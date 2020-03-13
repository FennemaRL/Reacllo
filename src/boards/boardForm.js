import React, { useState, useRef } from "react";
import Bf from "./bf";

const CreateButton = ({ setDisplay }) => {
  return (
    /*ultimo a arreglar */
    <div className="board containerButton" onClick={() => setDisplay(true)}>
      <button className="buttonCBoard">Crea una nueva pizarra</button>
    </div>
  );
};
const BoardForm = props => {
  let wrapperRefForm = useRef(null);
  const [display, setDisplay] = useState(false);

  return (
    (display && (
      <Bf setDisplay={setDisplay} rf={wrapperRefForm} {...props} />
    )) || <CreateButton setDisplay={setDisplay} />
  );
};
export default BoardForm;
