import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import dateFns from "date-fns"
import Select from '../Form/Select'

export default class Scheduler extends Component {

    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        password: '',
        redirect: false

    };

    //calendar logic/arguments

    renderHeader() {
        const dateFormat = "MMMM YYYY";

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
              </div>
                </div>
                <div className="col col-center">
                    <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    }

    renderDays() {
        const dateFormat = "ddd";
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="days row">{days}</div>;
    }

    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${
                            !dateFns.isSameMonth(day, monthStart)
                                ? "disabled"
                                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                            }`}
                        key={day}
                        onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                    >
                        <span className="number">{formattedDate}</span>
                        {/* <span className="bg">{formattedDate}</span> */}
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
    };

    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };

    //Form Logic/arguments

    handleOnChange = (event) => {
        if (event.target.id === "nameInput") {
            this.setState({
                newAppointmentName: event.target.value
            })
        } else if (event.target.id === "phoneInput") {
            this.setState({
                newAppointmentPhone: event.target.value
            })
        } else if (event.target.id === "emailInput") {
            this.setState({
                newAppointmentEmail: event.target.value
            })
        } else if (event.target.id === "dateInput") {
            this.setState({
                newAppointmentDate: event.target.value
            })
        } else if (event.target.id === "mmdBox") {
            this.setState({
                newAppointmentMmd: event.target.checked
            })
        } else if (event.target.id === "aoflBox") {
            this.setState({
                newAppointmentAofl: event.target.checked
            })
        } else if (event.target.id === "arrowsQty") {
            this.setState({
                newAppointmentArrows: event.target.value
            })
        } else if (event.target.id === "boysQty") {
            this.setState({
                newAppointmentBoys: event.target.value
            })
        } else if (event.target.id === "commentInput") {
            this.setState({
                newAppointmentComment: event.target.value
            })
        }
    }

    handleOnClick = (createAppointmentRequest) => {
        this.createAppointmentRequest({
            name: this.state.newAppointmentName,
            phone: this.state.newAppointmentPhone,
            email: this.state.newAppointmentEmail,
            date: this.state.newAppointmentDate,
            checkBoxMmd: this.state.newAppointmentMmd,
            checkBoxAofl: this.state.newAppointmentAofl,
            selectArrowsQty: this.state.newAppointmentArrows,
            selectScoutQty: this.state.newAppointmentBoys,
            notes: this.state.newAppointmentComment
        })
    }

    handleSubmit = (alertMsg) => {
        alert('Schedule request has been receieved. We will contact you in the next couple of days. Thank you!')

    }

    //post

    createAppointmentRequest = (appointmentToSave) => {
        const postInit = {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(appointmentToSave)
        }

        fetch('http://localhost:3001/scheduleRequest', postInit)
            .then((resp) => {
                console.log(resp)
            })
        console.log('function hit')
    }

    // password logic

    validatePass = () => {
        if (this.state.password === '1') {
            return this.setState({ redirect: true })
        } else {
            alert('Invalid Password');
            return false;
        }
    }

    render() {
        const { redirect } = this.state
        if (redirect) {
            return <Redirect to="/Appointments" />
        }
        return (
            <div>
                <section className="sched">
                    <h1 className="schedTitle">Schedule Appointment</h1>
                    <p>Check date availability on calendar, find availabel date, then request sevice on chosen date with form below.</p>
                    <div className="calContainer">
                        <div className="calendar">
                            {this.renderHeader()}
                            {this.renderDays()}
                            {this.renderCells()}
                        </div>
                    </div>

                    <div className="key">
                        <div className="avShape"></div>
                        <h3>Available</h3>
                        <div className="reqShape"></div>
                        <h3>Requested</h3>
                        <div className="resShape"></div>
                        <h3>Reserved</h3>
                        <div className="unShape"></div>
                        <h3>Unavailable</h3>
                    </div>

                </section>


                <section className="requestDate">
                    <h1 className="reqTitle">Request Date</h1>

                    <form className="reqForm" onSubmit={this.handleSubmit}>
                        <div className="scheduleFormFlex">
                            <div className="singleInputFlex">
                                <label className="singleInput"> <input id="nameInput" type="text" required onChange={this.handleOnChange} />: Name </label>
                                <label className="singleInput"><input id="phoneInput" type="tel" required onChange={this.handleOnChange} /> : Phone </label>
                                <label className="singleInput"><input id="emailInput" type="email" required onChange={this.handleOnChange} />: Email </label>
                                <label className="singleInput"><input id="dateInput" required onChange={this.handleOnChange} /> : Date Requesting </label>
                            </div>
                            <div className="selectionFlex">
                                <label className="aofl"><input id="aoflBox" type="checkbox" onChange={this.handleOnChange} /> : Arrow Of Light</label>
                                <label className="mmDemo"><input id="mmdBox" type="checkbox" onChange={this.handleOnChange} /> : Mountain Man Demo </label>
                                <div className="selectFlex">
                                    <div className="selectQty">
                                        <Select selectId="arrowsQty" onChange={this.handleOnChange} /> <label className="qtylabel">: Hand Made Arrows</label>
                                    </div>
                                    <div className="selectQty">
                                        <Select selectId="boysQty" onChange={this.handleOnChange} /> <label className="qtylabel">: Number of Scouts</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="commentBoxFlex">
                            <p>{'(If ordering arrows, please type in the Scouts full names in the comment box below, exactly as you want it on the arrows)'}</p>
                            <textarea id="commentInput" onChange={this.handleOnChange} className="commentBox" placeholder="Comments/Notes" />
                        </div>

                        <input className="btn" onClick={this.handleOnClick} type="submit" value="Submit Request" />

                    </form>
                </section>


                <div className='link appointLink'>
                    <label>Administrator Login:<input id="password" type="password" onChange={(e) => {
                        this.setState({ password: e.target.value })
                    }} /></label><button onClick={this.validatePass}>ENTER</button>
                </div>
            </div >
        )
    }
}