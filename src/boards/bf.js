import React, { useEffect } from "react";
const Bf = ({ setDisplay, rf, onCreateBoard, setMessage }) => {
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
    if (!e.target.titleNewBoard.value) {
      setMessage("La pizarra tiene que tener un titulo");
      return;
    }

    let title = e.target.titleNewBoard.value;
    onCreateBoard(title);
    setDisplay(false);
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
export default Bf;
