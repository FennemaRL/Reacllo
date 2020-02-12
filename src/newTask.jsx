import React from "react";
let refs = [];
for (let i = 0; i < 3; i++) {
  refs[i] = React.createRef();
}
const clearRefInputValue = () => {
  refs.forEach(ref => (ref.current.value = ""));
};
const newTask = props => {
  let displaynt = props.task.display ? "inline" : "none";
  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: "2",
          background: "rgba(0,0,0,0.8)",
          minWidth: "100vw",
          minHeight: "100vh",
          display: displaynt
        }}
        onClick={() => {
          clearRefInputValue();
          props.close();
        }}
      ></div>
      <div
        style={{
          top: "25%",
          left: "35.5%",
          position: "absolute",
          display: displaynt,
          color: "white",
          zIndex: "3",
          minWidth: "25vw",
          minHeight: "50vh",
          backgroundColor: "grey",
          borderRadius: "5px"
        }}
      >
        <p>Title: </p> <input ref={refs[0]} />
        <p>Short description:</p> <input ref={refs[1]} />
        <p>tiempo en horas</p>{" "}
        <input ref={refs[2]} type="number" min="0" max="99" step="1" />
        <button
          onClick={() => {
            if (refs.every(r => r.current.value)) {
              props.addTask({
                id: "5",
                title: refs[0].current.value,
                body: refs[1].current.value,
                tiempo: refs[2].current.value
              });
              clearRefInputValue();
              props.close();
            }
          }}
        >
          createTask
        </button>
        <button
          onClick={() => {
            clearRefInputValue();
            props.close();
          }}
        >
          cancel
        </button>
      </div>
    </>
  );
};
export default newTask;
