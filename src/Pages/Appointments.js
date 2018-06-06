import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Select from '../Form/Select'

export default class Appointments extends Component {

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
        return this.appointments.map((request, i) => {
            let button = {
                name: this.state.newAppointmentName,
                date: this.state.newAppointmentDate,
                phone: this.state.newAppointmentPhone

            }
        })
    }

    clickHandler = (getInfo) => {
        const id = getInfo.target.id,
            selectedAppointment = this.appointments.reduce((a, c) => {
                if (c._id === id)
                    return c
            }, null)
    }


    render() {
        return (
            <div>
                <div className="appointments">
                    <section className="allRequests">
                        <h1>Appointment Requests</h1>
                        <div className="requestSelect">{this.appointments}</div>
                    </section>

                    <section className="updateRequest">
                        <h1>Request Details</h1>

                        <form className="updateForm">
                            <div className="appFormFlex">
                                <div className="singleInputFlex">
                                    <label className="singleInput"> <input id="nameUpdate" type="text" required />: Name </label>
                                    <label className="singleInput"><input id="phoneUpdate" type="number" required /> : Phone </label>
                                    <label className="singleInput"><input id="emailUpdate" type="email" required />: Email </label>
                                    <label className="singleInput"><input className="dateUpdate" required /> : Date Requested </label>
                                </div>
                                <div className="selectionFlex">
                                    <label className="mmDemo"><input id="mmdBox" type="checkbox" required /> : Arrow Of Light</label>
                                    <label className="aofl"><input id="aoflBox" type="checkbox" required /> : Mountain Man Demo </label>
                                    <div className="selectFlex">
                                        <div className="selectQty">
                                            <Select id="arrowQty" /> <label className="qtylabel">: Hand Made Arrows</label>
                                        </div>
                                        <div className="selectQty">
                                            <Select id="boysQty" /> <label className="qtylabel">: Number of Boys</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="commentBoxFlex">
                                <textarea className="commentBox" placeholder="Comments/Notes" />
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