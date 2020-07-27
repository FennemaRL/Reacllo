import React, { useEffect, useState } from "react";



const Bf = ({ setDisplay, rf, onCreateBoard, hasBoardName }) => {
  const [err, setErrorMessage] = useState("");
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
    e.preventDefault()
    let nameBoard = e.target.titleNewBoard.value
    if (!nameBoard) {
      setErrorMessage("La pizarra tiene que tener un titulo")
      return
    }
    if (hasBoardName(nameBoard)){
      setErrorMessage("Ya existe tabla con ese nombre")
      return
    }
    onCreateBoard(nameBoard)
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
          style={{
                borderBottom: ` ${
                  err ? "2px solid #e81123" : ""
                }`
              }}
        />
        {err && <p className="error">{err}</p>}
        <button className="buttonCreateBoard" type="submit">
          Crear
        </button>
        <button className="buttonCancelBoard" onClick={  e => setDisplay(false)}>
          Cancelar
        </button>
      </form>
    </div>
  );
};
export default Bf;
