import React from "react";
import Nav from "./navBar";
import BoardTest from "./board";
import Boards from "./boards";
import ShowRoute from "./route";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
const Root = () => {
  const ShowRoutep = withRouter(props => <ShowRoute {...props} />);
  return (
    <div>
      <Router>
        <Nav />
        <ShowRoutep />
        <Switch>
          <Route exact path="/board/:boardTitle" component={BoardTest} />
          <Route exact path="/boards/" component={Boards} />
          {/*<Route exact path="/register/" component={Register} />
          <Route extact path="/logIn/" component={Login} />*/}
          <Redirect to="/boards/" />
        </Switch>
      </Router>
    </div>
  );
};

export default Root;
