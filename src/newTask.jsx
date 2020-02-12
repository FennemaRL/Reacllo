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
          zIndex: 2,
          top: 0,
          background: "rgba(0,0,0,0.5)",
          minWidth: "100%",
          minHeight: "100%",
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
          zIndex: "3",
          minWidth: "30vw",
          minHeight: "35vh",

          backgroundColor: "#ECEFF1",
          borderRadius: "2px"
        }}
      >
        {" "}
        <div
          style={{
            padding: "8px",
            position: "relative",
            height: "40px",
            alignItems: "center",
            display: "flex"
          }}
        >
          <p>New Task</p>
          <h3
            style={{
              position: "absolute",
              top: 8,
              right: 14
            }}
            onClick={props.close}
          >
            x
          </h3>
        </div>
        <hr />
        <div style={{ padding: "10px" }}>
          <p style={{ padding: "5px 0px" }}>Title </p>{" "}
          <input
            ref={refs[0]}
            style={{ height: "22px", width: "95%", padding: "5px" }}
          />
          <p style={{ padding: "5px 0px" }}>Duration </p>{" "}
          <input
            ref={refs[2]}
            type="time"
            min="0"
            max="99"
            step="1"
            style={{ height: "22px", width: "50%", padding: "5px" }}
          />
          <p style={{ padding: "5px 0px" }}>Description </p>{" "}
          <textarea
            ref={refs[1]}
            maxLength="150"
            style={{
              resize: "none",
              width: "95%",
              height: "50px",
              padding: "5px"
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "98%"
            }}
          >
            <button
              style={{
                flex: 0.9,
                height: "40px",
                borderRadius: "1px",
                border: "none",
                fontSize: "110%",
                color: "white",
                backgroundColor: "#53B284"
              }}
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
              Create
            </button>
            <button
              style={{
                width: "100px",
                height: "40px",
                borderRadius: "1px",
                border: "none",
                fontSize: "110%",
                color: "white",
                backgroundColor: "#FF4248"
              }}
              onClick={() => {
                clearRefInputValue();
                props.close();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default newTask;
