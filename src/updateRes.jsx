import React from "react";

const UpdateRes = props => {
  return (
    <div>
      {props.message && (
        <div
          style={{
            backgroundColor: "#9A94BC",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            color: "white",
            height: "40px"
          }}
        >
          <p>{props.message}</p>
        </div>
      )}
    </div>
  );
};
export default UpdateRes;
