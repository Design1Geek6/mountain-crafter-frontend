import React, { Component } from 'react'


export default class Select extends Component {
    render() {

            let option = []
            for (let i = 0; i <= 15; i++){
                option.push(i)
            }

            let theOptions = option.map((key) =>{
                return <option value={key}>{key}</option>
            })

            return (
                <div>
                    <select id={this.props.selectId} onChange={this.props.onChange} name="">
                        {theOptions}
                    </select>
                </div>
            )
}
}

