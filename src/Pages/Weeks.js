import React, { Component } from 'react'

export default class Weeks extends Component {


        render() {
            let weekDays = [],
                date = this.props.date,
                month = this.props.month;

            for (let i = 0; i < 7; i++) {
                let weekDay = {
                    name: date.format("dd").substring(0, 1),
                    number: date.date(),
                    isCurrentMonth: date.month() === month.month(),
                    isToday: date.isSame(new Date(), "weekDay"),
                    date: date
                }

                weekDays.push(<span key={weekDay.date.toString()} className={"weekDay" + (weekDay.isToday ? " today" : "") + (weekDay.isCurrentMonth ? "" : " different-month") + (weekDay.date.isSame(this.props.selected) ? " selected" : "")} onClick={this.props.select.bind(null, weekDay)}>{weekDay.number}</span>);
                date = date.clone();
                date.add(1, "d");

            }

            return (
                <div className="week" key={weekDays[0].toString()}>
                    {weekDays}
                </div>
            )
        }
}