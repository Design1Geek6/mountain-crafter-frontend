import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Scheduler from './Pages/Scheduler'
import Appointments from './Pages/Appointments'
import moment from "moment"
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={() => <Scheduler selected={moment([2012])}/>} />
            <Route path="/appointments" component={() => <Appointments />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
