import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import { Home } from "./Home";
import { Son } from "./Son";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path="/son" component={Son}/>
        <Route exact path="/" component={Home}/>
        <Redirect from="*" to="/" />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
