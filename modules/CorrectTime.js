import React, { Component } from 'react'
import { withLeadingZero, getDisplayQuarters } from './Helpers'

export default class CorrectTime extends Component {
  render() {
    let hour = this.props.time.hour > 12 ? this.props.time.hour - 12 : this.props.time.hour
    let minutes = this.props.minuteMode === 'minutes' ? this.props.time.minutes : getDisplayQuarters(this.props.time.minutes)
    let right_wrong, text
    if(this.props.finished) {
      if(this.props.correct) {
        right_wrong = <span>You are right!</span>
      } else {
        right_wrong = <span>Oh snap!</span>
      }
      text = ` It was ${withLeadingZero(hour)}:${withLeadingZero(minutes)}.`
    } else {
      right_wrong = text = ''
    }

    return (
      <span className="correct_time">{right_wrong}{text}</span>
    )

  }
}
