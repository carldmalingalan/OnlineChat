import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Redux Dependecies
import { Provider } from "react-redux";
import store from "./store";

// Components
import Login from "./components/main/Login";
import Register  from "./components/main/Register";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
        </Router>
      </Provider>
    );
  }
}

export default App;
