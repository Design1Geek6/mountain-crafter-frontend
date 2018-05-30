import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dateFns from "date-fns"
import Select from '../Form/Select'

export default class Scheduler extends Component {

    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        name: '',
        phone: '',
        email: '',
        date: '',
        notes: ''

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
        if (event.taget.id === "nameInput") {
            this.setState({
                newAppointmentName: event.target.value
            })
        } else if (event.target.if === "phoneInput") {
            this.setState({
                newAppointmentPhone: event.target.value
            })
        } else if (event.taget.id === "emailInput") {
            this.setState({
                newAppointmentEmail: event.target.value
            })
        } else if (event.taget.id === "dateInput") {
            this.setState({
                newAppointmentDate: event.target.value
            })
        } else if (event.taget.id === "commentInput") {
            this.setState({
                newAppointmentComment: event.target.value
            })
        }

    }

    handleOnClick = () => {
        this.props.createAppointmentRequest({
            name: this.state.newAppointmentName,
            phone: this.state.newAppointmentPhone,
            email: this.state.newAppointmentEmail,
            date: this.state.newAppointmentDate,
            notes: this.state.newAppointmentComment
        })
    }

    handleAgeRangeSelect(e) {  
        this.setState({ ownerAgeRangeSelection: e.target.value });
      }

    render() {
        return (
            <div>
                <section className="sched">
                    <h1 className="schedTitle">Schedule Appointment</h1>
                    <p>Check date availability on calendar, find available date, then request sevice on chosen date with form below.</p>
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

                    <form className="reqForm" method="post" action="/server, or http://server.com">
                        <div className="scheduleFormFlex">
                            <lable className="name"> <input id="nameInput" type="text" required />: Name </lable>
                            <lable className="phone"><input id="phoneInput" type="number" required /> : Phone </lable>
                            <lable className="email"><input id="emailInput" type="email" required />: Email </lable>
                            <lable className="date"><input className="dateInput" required /> : Date Requested </lable>
                            <div className="selectionFlex">
                                <lable className="aofl"><input type="radio" required /> : Arrow Of Light</lable>
                                <lable className="mmDemo"><input type="radio" required /> : Mountian Man Demo </lable>
                                <Select
                                    name={'ageRange'}
                                    placeholder={'Choose your age range'}
                                    controlFunc={this.handleAgeRangeSelect}
                                    options={this.state.ageOptions}
                                    selectedOption={this.state.ownerAgeRangeSelection} />
                            </div>
                        </div>
                        <div className="commentBoxFlex">
                            <textarea className="commentBox" placeholder="Comments/Notes" />
                        </div>

                        <input className="btn" onClick={this.handleOnClick} type="submit" value="Submit Request" />

                    </form>
                </section>


                <div className='link appointLink'>
                    <Link to="/appointments">Administrator Login</Link>
                </div>
            </div>
        )
    }
}