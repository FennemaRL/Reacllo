import React from "react";
import { Link } from "react-router-dom";
const ShowRoute = props => {
  let routes = props.location.pathname.split("/");
  routes.splice(0, 1);
  routes.splice(0, 1);

  routes.splice(0, 1);
  return (
    <div className="showRoute">
      <Link to="/Reacllo/">
        Mis pizarras/ 
      </Link>
      {routes.map(route => (
        <p key={route}> {route} </p>
      ))}
    </div>
  );
};
export default ShowRoute;
