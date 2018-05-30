import React, { Component } from 'react'
import ReactPropTypes from 'prop-types'

export default class Select extends Component {

    static propTypes = {
        name: ReactPropTypes.string.isRequired,
        options: ReactPropTypes.array.isRequired,
        selectedOption: ReactPropTypes.string,
        controlFunc: ReactPropTypes.func.isRequired,
        placeholder: ReactPropTypes.string
    }

    render() {
        return (
            <div className="form-group">
                <select
                    name={this.props.name}
                    value={this.props.selectedOption}
                    onChange={this.props.controlFunc}
                    className="form-select">
                    <option value="">{this.props.placeholder}</option>
                    {this.props.options.map(opt => {
                        return (
                            <option
                                key={opt}
                                value={opt}>{opt}</option>
                        )
                    })}
                </select>
            </div>
        )
    }
}

