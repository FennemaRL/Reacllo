import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import userin from "../img/user.svg";
import reg from "../img/register2.svg";
import logout from "../img/logout2.svg";
import burger from  "../img/burger.svg"

const logOutUser = history => {
  localStorage.removeItem("userName");
  localStorage.removeItem("UserToken");
};

const Nav = props => {
  let isLog = localStorage.getItem("userName");
  let userName = localStorage.getItem("userName") || "UserTest";
  const [displayNav, setDisplayNav] = useState(false);
  let burgerClass = displayNav ? "hide" : "hide twist"
  let showNavMobile =  displayNav ? "show buttons": "buttons"
  return (
    <header >
      <div className="logoNav">
        <Link to="/Reacllo/" ><h2>Reacllo</h2></Link>
      </div> 
      <div className="burger "> 
      <img src={burger} className={burgerClass}
          onClick={() => setDisplayNav(!displayNav)}/>
      </div>
      <div  className="userName">
          <Link to="/Reacllo/">{userName}</Link>
      </div>
        <Buttons showNavMobile={showNavMobile} isLog={isLog} setDisplayNav={setDisplayNav} displayNav={displayNav} props={props}/>

    </header>
  );
};
const Buttons= ({showNavMobile, isLog, setDisplayNav, displayNav,props}) => {

  return ( isLog &&
      <div className={showNavMobile}>
        <Link to="/Reacllo/" onClick={() => { setDisplayNav(!displayNav); logOutUser(props.history) }}>
            <img src={logout} className="imgButton" alt="cerrar sesión" />
            Cerrar sesión
        </Link>  
      </div>)
        || (
        <div className={showNavMobile}>
            <Link to="/Reacllo/login/" onClick={() => setDisplayNav(!displayNav)}>
                <img src={userin} className="imgButton" alt="Ingresa" />
                Ingresa
            </Link>
            <Link to="/Reacllo/register/" onClick={() => setDisplayNav(!displayNav)}>
                <img src={reg} className="imgButton" alt="Registrate" />
                Registrate
            </Link>
        </div>
  )         
}
export default Nav;
