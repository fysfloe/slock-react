import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Header extends Component {
  changeMinuteMode() {
    this.props.onMinuteModeChange(this.refs['choose-minute-mode'].value)
  }

  changeHourMode() {
    this.props.onHourModeChange(this.refs['choose-hour-mode'].value)
  }

  render() {
    return (
      <header>
        <hgroup>
          <h1><Link to="/">slock</Link></h1>
          <p>World's best Sound Clock</p>
        </hgroup>
        <div className="choose-hour-mode">
          <label htmlFor="choose-hour-mode" className="control-label">Hour Mode:</label>
          <select onChange={this.changeHourMode.bind(this)} ref="choose-hour-mode" id="choose-hour-mode" name="choose-hour-mode" className="form-control" value={this.props.hourMode}>
            <option value="chromatic">Chromatic Scale</option>
            <option value="major">Natural Major Scale</option>
          </select>
        </div>
        <div className="choose-minute-mode">
          <label htmlFor="choose-minute-mode" className="control-label">Minute Mode:</label>
          <select onChange={this.changeMinuteMode.bind(this)} ref="choose-minute-mode" id="choose-minute-mode" name="choose-minute-mode" className="form-control" value={this.props.minuteMode}>
            <option value="minutes">Minutes</option>
            <option value="quarters">Quarters</option>
          </select>
        </div>
      </header>
    )
  }
}
