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
        <p>Task</p> <input ref={refs[2]} />
        <button
          onClick={() => {
            props.addTask({ id: "5", title: "title5", body: "text1" });
            clearRefInputValue();
            props.close();
          }}
        >
          add
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
