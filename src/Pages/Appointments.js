import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Appointments extends Component {



    render() {
        return (
            <div>
                <div classNames="appointments">
                    <section className="allRequests">
                        <h1>Appointment Requests</h1>
                    </section>

                    <section className="updateRequest">
                        <h1>Request Details</h1>
                        <div className="appFormFlex">
                            <form className="updateForm" method="post" action="/server, or http://server.com">
                                <lable className="name"> <input id="nameUpdate" type="text" required />: Name </lable>
                                <lable className="phone"><input id="phoneUpdate" type="number" required /> : Phone </lable>
                                <lable className="email"><input id="emailUpdate" type="email" required />: Email </lable>
                                <lable className="date"><input className="dateUpdate" required /> : Date Requested </lable>
                                <textarea className="commentBox" placeholder="Comments/Notes" />
                                <lable className="#"><input type="radio" required /> : Arrow Of Light</lable>
                                <lable className="#"><input type="radio" required /> : Mountian Man Demo </lable>
                                <input list="quantity" /><lable className="#"> : Number Of Boys Without Arrows </lable>
                                <input list="quantity" /><lable className="#"> : Number Of Boys With Arrows </lable>

                                <input className="btn" onClick={this.handleOnClick} type="submit" value="Submit Request" />
                            </form>
                        </div>
                    </section>
                </div>
                <div className='link schedLink'>
                    <Link to="/">View Calendar</Link>
                </div>

            </div>
        )
    }
}