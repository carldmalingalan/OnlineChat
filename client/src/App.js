import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Redux Dependecies

// Components
import LoginForm from "./components/main/LoginForm";
import RegisterForm from "./components/main/RegisterForm";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={LoginForm} />
          <Route path="/register/" component={RegisterForm} />
        </Router>
      </Provider>
    );
  }
}

export default App;
