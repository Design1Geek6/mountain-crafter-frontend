import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Scheduler from './Pages/Scheduler'
import Appointments from './Pages/Appointments'
import './css/App.css'

class App extends Component {
state = {
  appointment: []
}

createAppointmentRequest = (schedule) => {
  this.setState((prev) => {
    const existingAppointments = prev.appointment
    existingAppointments.push(schedule)

    return {
      shows:existingAppointments
    }
  })
}


  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={() => <Scheduler />} />
            <Route path="/appointments" component={() => <Appointments />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App
