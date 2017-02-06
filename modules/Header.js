import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Header extends Component {
  changeMinuteMode() {
    this.props.onMinuteModeChange(this.refs['choose-minute-mode'].value)
  }

  render() {
    return (
      <header>
        <hgroup>
          <h1><Link to="/">slock</Link></h1>
          <p>World's best Sound Clock</p>
        </hgroup>
        <div className="choose-minute-mode">
          <label htmlFor="choose-minute-mode" className="control-label">App Mode:</label>
          <select onChange={this.changeMinuteMode.bind(this)} ref="choose-minute-mode" id="choose-minute-mode" name="choose-minute-mode" className="form-control">
            <option value="minutes">Minutes</option>
            <option value="quarters">Quarters</option>
          </select>
        </div>
      </header>
    )
  }
}
