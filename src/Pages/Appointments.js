import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Select from '../Form/Select'

export default class Appointments extends Component {

    state = {
        appointments: [],
        selectedAppointment: {}
    }

    getRequests = async () => {
        try {
            const response = await fetch('http://localhost:3001/scheduleRequest')
            const appointments = await response.json()
            this.setState({ appointments })

        } catch (error) {
            this.setState({ errorMessage: error })
        }
    }

    componentDidMount() {
        this.getRequests()
    }

    renderRequests = () => {
        return this.state.appointments.map((request) => {
            return (<button key={request._id} className="btnInfo" onClick={this.handleSelectedOnChange} id={request._id} >{request.name}, {request.phone}, {request.date}</button>)
        })
    }

    handleSelectedOnChange = (event) => {
        const selectedAppointment = this.state.appointments.reduce((acc, cv) => {
            if (cv._id === event.target.id)
                return cv
            return acc
        }, null)
        this.setState({
            selectedAppointment
        })
    }

    render() {
        return (
            <div>
                <div className="appointments">
                    <section className="allRequests">
                        <h1>Appointment Requests</h1>
                        <div className="requestSelect">{this.renderRequests()}</div>
                    </section>

                    <section className="updateRequest">
                        <h1>Request Details</h1>

                        <form className="updateForm">
                            <div className="appFormFlex">
                                <div className="singleInputFlex">
                                    <label className="singleInput"> <input id="nameUpdate" value={this.state.selectedAppointment.name} type="text" required />: Name </label>
                                    <label className="singleInput"><input id="phoneUpdate" value={this.state.selectedAppointment.phone} type="tel" required /> : Phone </label>
                                    <label className="singleInput"><input id="emailUpdate" value={this.state.selectedAppointment.email} type="email" required />: Email </label>
                                    <label className="singleInput"><input className="dateUpdate" value={this.state.selectedAppointment.date} required /> : Date Requested </label>
                                </div>
                                <div className="selectionFlex">
                                    <label className="mmDemo"><input id="mmdBox" value={this.state.selectedAppointment.checkBoxMmd} type="checkbox" required /> : Arrow Of Light</label>
                                    <label className="aofl"><input id="aoflBox" value={this.state.selectedAppointment.checkBoxAofl} type="checkbox" required /> : Mountain Man Demo </label>
                                    <div className="selectFlex">
                                        <div className="selectQty">
                                            <Select id="arrowQty" value={this.state.selectedAppointment.selectedArrowQty} /> <label className="qtylabel">: Hand Made Arrows</label>
                                        </div>
                                        <div className="selectQty">
                                            <Select id="boysQty" value={this.state.selectedAppointment.selectedScoutQty} /> <label className="qtylabel">: Number of Boys</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="commentBoxFlex">
                                <textarea className="commentBox" value={this.state.selectedAppointment.notes} placeholder="Comments/Notes" />
                            </div>

                            <div className="btnFlex">
                                <input className="btn" onClick={this.handleOnClick} type="submit" value="Update Approval" />
                                <input className="btn" onClick={this.handleOnClick} type="submit" value="Delete Request" />
                            </div>

                        </form>

                    </section>
                </div>
                <div className='link schedLink'>
                    <Link to="/">View Calendar</Link>
                </div>

            </div>
        )
    }
}