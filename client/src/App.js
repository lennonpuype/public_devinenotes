import React, { Component } from "react";
import "./App.css";

import Notes from "./components/Notes";
import NoteDetail from "./components/NoteDetail";
import AddNote from "./components/AddNote";
import { Route, Switch, withRouter } from "react-router-dom";
import { ROUTES } from "./constants";
import Login from "./components/Login";
import Register from "./components/Register";
import DarkModeToggle from "./components/darkmode/DarkModeToggle";

class App extends Component {
  render() {
    return (
      <>
        <DarkModeToggle />

        <Switch>
          <Route path={ROUTES.home} exact render={() => <Notes />} />
          <Route
            name="detail"
            path="/detail/:id"
            render={({ match }) => <NoteDetail id={match.params.id} />}
          />
          <Route path={ROUTES.add} render={() => <AddNote />} />
          <Route path={ROUTES.login} component={Login} />
          <Route path={ROUTES.register} component={Register} />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
