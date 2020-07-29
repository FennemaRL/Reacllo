import React, {useState}from "react";
import Nav from "./nav/navBar";
import Board from "./board/board";
import Boards from "./boards/boards";
import ShowRoute from "./nav/showRute";
import LoginReg from "./loginReg/loginReg";
import UpdateRes from "./nav/updateRes"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const Root = () => {

  const [notification, setNotification] = useState({message :undefined , type:""})
  return (
   <Router>
    <div className="content">
      <Nav />
      <ShowRoute />
      <UpdateRes notification={notification} />
      <Switch>
        <Route exact path="/Reacllo/board/:boardTitle" ><Board setNotification={setNotification} /></Route>
        <Route exact path="/Reacllo/boards/" ><Boards setNotification={setNotification} /></Route>
        <Route exact path="/Reacllo/register/" component={LoginReg} />
        <Route extact path="/Reacllo/login/" component={LoginReg} />
        <Redirect to="/Reacllo/boards/" />
      </Switch>
    </div>
  </Router>
   
  );
};

export default Root;
