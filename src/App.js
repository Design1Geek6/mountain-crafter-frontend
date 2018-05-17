import React, { Component } from 'react';
import Scheduler from './Pages/Scheduler'
import Appointments from './Pages/Appointments'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Switch>
          <Scheduler/>
            <Appointments/>
          </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
