import React, { Component } from 'react'
import { getQuarters } from './Helpers'
import { getDisplayQuarters } from './Helpers'
import { withLeadingZero } from './Helpers'

export default class GuessInput extends Component {
  constructor(props) {
    super(props)

    let hourValue, minutesValue, quartersValue

    if(props.finished) {
      hourValue = props.guessed.hour
      minutesValue = props.guessed.minutes
      quartersValue = getQuarters(props.guessed.minutes)
    } else if(props.difficulty == 1 && props.step <= 5) {
      minutesValue = props.time.minutes
      quartersValue = getQuarters(props.time.minutes)
    } else if(props.difficulty == 1 && props.step > 5) {
      hourValue = props.time.hour
    }

    this.state = {
      hourValue: hourValue || '',
      minutesValue: minutesValue || '',
      quartersValue: quartersValue || 4,
    }

  }

  handleInputChange() {
    let hourValue, minutesValue, quartersValue

    if(this.refs.hour) {
      hourValue = this.refs.hour.value
    } else {
      hourValue = this.props.time.hour > 12 ? this.props.time.hour - 12 : this.props.time.hour
    }
    if(this.refs.minutes) {
      minutesValue = this.refs.minutes.value
    } else {
      minutesValue = this.props.time.minutes
    }
    if(this.refs.quarters) {
      quartersValue = this.refs.quarters.value
    } else {
      quartersValue = getQuarters(this.props.time.minutes)
    }

    if(parseInt(hourValue) < 10) {
      hourValue = withLeadingZero(hourValue)
    } else {
      hourValue = !isNaN(parseInt(hourValue)) ? parseInt(hourValue) : ''
    }

    if(parseInt(minutesValue) < 10) {
      minutesValue = withLeadingZero(minutesValue)
    } else {
      minutesValue = !isNaN(parseInt(minutesValue)) ? parseInt(minutesValue) : ''
    }

    this.setState({
      hourValue: hourValue,
      minutesValue: minutesValue,
      quartersValue: quartersValue,
    })

    this.props.onInputChange(hourValue, minutesValue, quartersValue)
  }

  render() {
    let hourField
    if(this.props.difficulty == 1 && this.props.step > 5) {
      hourField = <input type="number" className="time-input" value={withLeadingZero(this.props.time.hour > 12 ? this.props.time.hour - 12 : this.props.time.hour)} disabled />
    } else if(this.props.finished) {
      hourField = <input type="number" className="time-input" value={withLeadingZero(this.props.guessed.hour > 12 ? this.props.guessed.hour - 12 : this.props.guessed.hour)} disabled />
    } else {
      hourField = <input type="number" min="0" max="12" step="1" name="hour" id="hour" ref="hour" className="time-input" value={this.state.hourValue} onChange={this.handleInputChange.bind(this)} />
    }

    let minutesField
    if(this.props.minuteMode == 'quarters') {
      if(this.props.difficulty == 1 && this.props.step <= 5) {
        minutesField = <input type="number" className="time-input" value={getDisplayQuarters(this.props.time.minutes)} disabled />
      } else if(this.props.finished) {
        minutesField = <input type="number" className="time-input" value={getDisplayQuarters(this.props.guessed.minutes)} disabled />
      } else {
        minutesField = (
          <select className="time-input" id="quarters" name="quarters" ref="quarters" value={this.state.quartersValue} onChange={this.handleInputChange.bind(this)}>
            <option value="4">00</option>
            <option value="1">15</option>
            <option value="2">30</option>
            <option value="3">45</option>
          </select>
        )
      }
    } else {
      if(this.props.difficulty == 1 && this.props.step <= 5) {
        minutesField = <input type="number" className="time-input" value={withLeadingZero(this.props.time.minutes)} disabled />
      } else if(this.props.finished) {
        minutesField = <input type="number" className="time-input" value={withLeadingZero(this.props.guessed.minutes)} disabled />
      } else {
        minutesField = <input type="number" className="time-input" min="0" max="59" name="minutes" id="minutes" ref="minutes" value={this.state.minutesValue} onChange={this.handleInputChange.bind(this)} />
      }
    }

    return (
      <div>
        {hourField}
        <span>:</span>
        {minutesField}
      </div>
    )
  }
}
