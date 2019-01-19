import React, { Component } from "react";

import { Switch, Route, BrowserRouter } from "react-router-dom";

import Home from "./components/home";
import Detail from "./components/detail"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/detail" component={Detail} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
