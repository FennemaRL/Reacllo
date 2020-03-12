import React from "react";
import Nav from "./nav/navBar";
import BoardTest from "./board/board";
import Boards from "./boards/boards";
import ShowRoute from "./nav/showRute";
import LoginReg from "./loginReg/loginReg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
const Root = () => {
  const ShowRoutep = withRouter(props => <ShowRoute {...props} />);
  const NavWithp = withRouter(props => <Nav {...props} />);
  return (
    <div>
      <Router>
        <NavWithp />
        <ShowRoutep />
        <Switch>
          <Route exact path="/board/:boardTitle" component={BoardTest} />
          <Route exact path="/boards/" component={Boards} />
          <Route exact path="/register/" component={LoginReg} />
          <Route extact path="/login/" component={LoginReg} />
          <Redirect to="/boards/" />
        </Switch>
      </Router>
    </div>
  );
};

export default Root;
