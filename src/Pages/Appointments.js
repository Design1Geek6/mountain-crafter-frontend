import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Select from '../Form/Select'

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

                        <form className="updateForm" method="post" action="/server, or http://server.com">
                            <div className="appFormFlex">
                                <lable className="name"> <input id="nameUpdate" type="text" required />: Name </lable>
                                <lable className="phone"><input id="phoneUpdate" type="number" required /> : Phone </lable>
                                <lable className="email"><input id="emailUpdate" type="email" required />: Email </lable>
                                <lable className="date"><input className="dateUpdate" required /> : Date Requested </lable>
                                <div className="selectionFlex">
                                    <lable className="#"><input type="checkbox" required /> : Arrow Of Light</lable>
                                    <lable className="#"><input type="checkbox" required /> : Mountian Man Demo </lable>
                                    <div className="selectQty">
                                        <Select /> <lable className="qtyLable">: Hand Made Arrows</lable>
                                        <Select /> <lable className="qtyLable">: Number of Boys</lable>
                                    </div>
                                    <div className="commentBoxFlex">
                                        <textarea className="commentBox" placeholder="Comments/Notes" />
                                    </div>
                                </div>
                                <div className="btnFlex">
                                    <input className="btn" onClick={this.handleOnClick} type="submit" value="Update Approval" />
                                    <input className="btn" onClick={this.handleOnClick} type="submit" value="Delete Request" />
                                </div>
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