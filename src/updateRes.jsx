import React from "react";

const UpdateRes = props => {
  return (
    <div>
      {props.message && (
        <div>
          <p>{props.message}</p>
        </div>
      )}
    </div>
  );
};

export default UpdateRes;
