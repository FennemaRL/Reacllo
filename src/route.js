import React from "react";
import { Link } from "react-router-dom";
const ShowRoute = props => {
  let routes = props.location.pathname.split("/");
  routes.splice(0, 1);
  routes.splice(0, 1);
  return (
    <div
      style={{
        backgroundColor: "#b0bec5",
        height: "45px",
        textTransform: "capitalize",
        display: "flex",
        alignItems: "center",
        paddingLeft: "15px"
      }}
    >
      <Link to="/boards/">
        <p>Mis pizarras&nbsp;&nbsp;/&nbsp;&nbsp;</p>
      </Link>
      {routes.map(route => (
        <p key={route}>{route}</p>
      ))}
    </div>
  );
};
export default ShowRoute;
