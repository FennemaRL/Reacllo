import React, { useEffect } from "react";
const Bf = ({ setDisplay, rf, onCreateBoard, setMessage }) => {
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  });

  const handleClickOutside = event => {
    if (rf.current && !rf.current.contains(event.target)) {
      setDisplay(false);
    }
  };
  const handleCreate = e => {
    e.preventDefault();
    if (!e.target.titleNewBoard.value) {
      setMessage("La pizarra tiene que tener un titulo");
      return;
    }

    let title = e.target.titleNewBoard.value;
    onCreateBoard(title);
    setDisplay(false);
  };
  return (
    <div ref={rf} className="board ">
      <form onSubmit={handleCreate} className="formNewBoard">
        <label>Titulo</label><br/>
        <input
          type="text"
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
export default Bf;
