import React from "react";
import { Link } from "react-router-dom";
import {useBoardTitle} from "../userUtil";

const ShowRoute = () => {
  let boardTitle = useBoardTitle()
  
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