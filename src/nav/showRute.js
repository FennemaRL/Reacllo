import React from "react";
import { Link } from "react-router-dom";
import {GetBoard} from "../userUtil";

const ShowRoute = () => {
  let boardTitle = GetBoard()
  
  return (
    <div className="showRoute">
      <Link to="/Reacllo/">
        Mis pizarras/ 
      </Link>
        <p> {boardTitle} </p>
    </div>
  )
}
export default  ShowRoute