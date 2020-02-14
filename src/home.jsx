import React from "react";
import Nav from "./navBar";
import BoardTest from "./board";
import Boards from "./boards";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
const Home = () => {
  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/board/userTest" component={BoardTest} />
          <Route exact path="/boards/userTest" component={Boards} />
          <Redirect to="/boards/userTest" />
        </Switch>
      </Router>
    </div>
  );
};

export default Home;
