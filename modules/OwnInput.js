import React, { Component } from 'react'
import { playSound, calcMinutes, withLeadingZero, getDisplayQuarters } from './Helpers'

export default class OwnInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hourValue: '',
      minutesValue: '',
    }
  }

  inputChanged(event) {
    let hour = this.refs.own_hour.value
    let minutes = this.refs.own_minutes.value

    this.setState({
      hourValue: hour,
      minutesValue: minutes,
    })
  }

  playOwnSound() {
    let hour = this.state.hourValue
    let minutes = this.state.minutesValue

    playSound(this.props.context, this.props.buffers, parseInt(hour), parseInt(minutes), this.props.minuteMode, this.props.hourMode)
  }

  playCurrentTime() {
    let date = new Date()
    let hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
    let minutes = date.getMinutes()

    let minutesValue

    if(this.props.minuteMode === 'quarters') {
      minutesValue = getDisplayQuarters(minutes)
    } else {
      minutesValue = minutes
    }

    this.setState({
      hourValue: withLeadingZero(hour),
      minutesValue: withLeadingZero(minutesValue),
    })

    playSound(this.props.context, this.props.buffers, parseInt(hour), parseInt(minutes), this.props.minuteMode, this.props.hourMode)
  }

  playRandomSound() {
    let hour = Math.floor(Math.random() * 12) + 1
    let minutes = Math.floor(Math.random() * 59)
    let minutesValue

    if(this.props.minuteMode === 'quarters') {
      minutesValue = getDisplayQuarters(minutes)
    } else {
      minutesValue = minutes
    }

    this.setState({
      hourValue: withLeadingZero(hour),
      minutesValue: withLeadingZero(minutesValue),
    })

    playSound(this.props.context, this.props.buffers, parseInt(hour), parseInt(minutes), this.props.minuteMode, this.props.hourMode)
  }

  render() {
    return(
      <div id="own-input">
        <button id="play-current-time" onClick={this.playCurrentTime.bind(this)} className="btn btn-default">What time is it?</button>

        <div className="form-group">
          <input onChange={this.inputChanged.bind(this)} ref="own_hour" name="own-hour" id="own-hour" type="number" min="0" max="23" step="1" className="time-input" value={this.state.hourValue} />
          <span>:</span>
          <input onChange={this.inputChanged.bind(this)} ref="own_minutes" name="own-minutes" id="own-minutes" type="number" min="0" max="59" step="1" className="time-input" value={this.state.minutesValue} />
        </div>
        <div className="btn-group">
          <button id="play-own-time" onClick={this.playOwnSound.bind(this)} className="btn btn-default">Play</button>
          <button id="play-random-time" onClick={this.playRandomSound.bind(this)} className="btn btn-default">Random</button>
        </div>
      </div>
    )
  }
}
