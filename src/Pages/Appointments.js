import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Select from '../Form/Select'

export default class Appointments extends Component {

    state = {
        appointments: [],
        selectedAppointment: {}
    }

    // request

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

    handleOnChange = (event) => {
        event.persist()
        console.log('handel on change')
        if (event.target.id === "nameInput") {
            this.setState((prev) => {
                return {
                    selectedAppointment: {
                        ...prev.selectedAppointment,
                        name: event.target.value
                    }
                }
            })
        } else if (event.target.id === "phoneInput") {
            this.setState((prev) => {
                return {
                    selectedAppointment: {
                        ...prev.selectedAppointment,
                        phone: event.target.value
                    }
                }
            })
        } else if (event.target.id === "emailInput") {
            this.setState((prev) => {
                return {
                    selectedAppointment: {
                        ...prev.selectedAppointment,
                        email: event.target.value
                    }
                }
            })

        } else if (event.target.id === "dateInput") {
            this.setState((prev) => {
                return {
                    selectedAppointment: {
                        ...prev.selectedAppointment,
                        date: event.target.value
                    }
                }
            })
        } else if (event.target.id === "mmdBox") {
            this.setState((prev) => {
                return {
                    selectedAppointment: {
                        ...prev.selectedAppointment,
                        checkBoxMmd: event.target.checked
                    }
                }
            })
        } else if (event.target.id === "aoflBox") {
            this.setState((prev) => {
                return {
                    selectedAppointment: {
                        ...prev.selectedAppointment,
                        checkBoxAofl: event.target.checked
                    }
                }
            })
        } else if (event.target.id === "arrowsQty") {
            this.setState((prev) => {
                return {
                    selectedAppointment: {
                        ...prev.selectedAppointment,
                        selectArrowsQty: event.target.value
                    }

                }
            })

        } else if (event.target.id === "boysQty") {
            this.setState((prev) => {
                return {
                    selectedAppointment: {
                        ...prev.selectedAppointment,
                        selectScoutQty: event.target.value
                    }
                }
            })
        } else if (event.target.id === "commentInput") {
            this.setState((prev) => {
                return {
                    selectedAppointment: {
                        ...prev.selectedAppointment,
                        notes: event.target.value
                    }
                }
            })
        }
    }

    //update

    handleUpdateOnClick = (updateAppointmentRequest) => {
        this.updateAppointmentRequest(
            this.state.selectedAppointment
        )
    }

    updateAppointmentRequest = (appointmentToUpdate) => {
        const postInit = {
            method: 'put',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(appointmentToUpdate)
        }

        fetch('http://localhost:3001/scheduleRequest', postInit)
            .then((resp) => {
                console.log(resp)
            })
        console.log('function Put')
    }

    //delete
    handleDeleteOnClick = (deleteAppointmentRequest) => {
        this.deleteAppointmentRequest(
            this.state.selectedAppointment
        )
    }

    deleteAppointmentRequest = (appointmentToDelete) => {
        const postInit = {
            method: 'delete',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(appointmentToDelete)
        }
        fetch('http://localhost:3001/scheduleRequest', postInit)
            .then((resp) => {
                this.setState({})
            })
        console.log('function delete')
    }

    render() {
        console.log(this.state, 'state')
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
                                    <label className="singleInput"> <input id="nameInput" onChange={this.handleOnChange} value={this.state.selectedAppointment.name} type="text" />: Name </label>
                                    <label className="singleInput"><input id="phoneInput" onChange={this.handleOnChange} value={this.state.selectedAppointment.phone} type="tel" /> : Phone </label>
                                    <label className="singleInput"><input id="emailInput" onChange={this.handleOnChange} value={this.state.selectedAppointment.email} type="email" />: Email </label>
                                    <label className="singleInput"><input id="dateInput" onChange={this.handleOnChange} value={this.state.selectedAppointment.date} /> : Date Requested </label>
                                </div>
                                <div className="selectionFlex">
                                    <label className="mmDemo"><input id="mmdBox" onChange={this.handleOnChange} checked={this.state.selectedAppointment.checkBoxMmd} type="checkbox" /> : Arrow Of Light</label>
                                    <label className="aofl"><input id="aoflBox" onChange={this.handleOnChange} checked={this.state.selectedAppointment.checkBoxAofl} type="checkbox" /> : Mountain Man Demo </label>
                                    <div className="selectFlex">
                                        <div className="selectQty">
                                            <Select selectId="arrowsQty" onChange={this.handleOnChange} v={this.state.selectedAppointment.selectArrowsQty} /> <label className="qtylabel">: Hand Made Arrows</label>
                                        </div>
                                        <div className="selectQty">
                                            <Select selectId="boysQty" onChange={this.handleOnChange} v={this.state.selectedAppointment.selectScoutQty} /> <label className="qtylabel">: Number of Scouts</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="commentBoxFlex">
                                <textarea className="commentBox" id="commentInput" onChange={this.handleOnChange} value={this.state.selectedAppointment.notes} />
                            </div>

                            <div className="btnFlex">
                                <input className="btn" onClick={this.handleUpdateOnClick} type="submit" value="Update Approval" />
                                <input className="btn" onClick={this.handleDeleteOnClick} type="submit" value="Delete Request" />
                                <div className='schedLink'>
                                    <Link to="/">View Calendar</Link>
                                </div>

                            </div>

                        </form>

                    </section>
                </div>

            </div>
        )
    }
}