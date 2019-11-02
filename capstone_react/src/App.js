import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import "./App.css";
import Student_Profile from "./components/Student_Profile";
import Teacher_Profile from "./components/Teacher_Profile";
import Create_student from "./components/Create_student";
import Create_teacher from "./components/Create_teacher";
import Create from "./components/Create";
import Search_for_tutor from "./components/Search_for_tutor";
import teachers_list from "./components/teachers_list";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Navbar />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Register" component={Register} />
            <Route
              exact
              path="/Student_Profile"
              render={routeProps => <Student_Profile {...routeProps} />}
            />
            <Route
              exact
              path="/Teacher_Profile"
              render={routeProps => <Teacher_Profile {...routeProps} />}
            />
            <Route exact path="/Create" component={Create} />
            <Route
              exact
              path="/Create_student"
              render={routerProps => <Create_student {...routerProps} />}
            />
            <Route
              exact
              path="/Create_teacher"
              render={routerProps => <Create_teacher {...routerProps} />}
            />
            <Route
              exact
              path="/Search_for_tutor"
              component={Search_for_tutor}
            />
            <Route exact path="teachers_list" component={teachers_list} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
