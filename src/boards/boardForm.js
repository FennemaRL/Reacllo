import React, { useState, useRef, useEffect } from "react";

const Bf = ({ setDisplay, rf, onCreateBoard }) => {
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = event => {
    if (rf.current && !rf.current.contains(event.target)) {
      setDisplay(false);
    }
  };
  const handleCreate = e => {
    e.preventDefault();
    if (!!e.target.titleNewBoard.value) {
      let title = e.target.titleNewBoard.value;
      onCreateBoard(title);
      setDisplay(false);
    }
  };
  return (
    <div ref={rf} className="newBoard" style={{ padding: "8px" }}>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Escriba un titulo"
          name="titleNewBoard"
          className="titleNewBoard"
        />
        <button className="buttonCreateBoard" type="submit">
          Crear
        </button>
      </form>
    </div>
  );
};
const CreateButton = ({ setDisplay }) => {
  return (
    <div className="newBoard containerButton" onClick={() => setDisplay(true)}>
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
