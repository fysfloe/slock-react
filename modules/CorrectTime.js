import React, { Component } from 'react'

export default class CorrectTime extends Component {
  render() {
    let hour = this.props.time.hour < 10 ? '0' + this.props.time.hour : this.props.time.hour
    let minutes = this.props.time.minutes < 10 ? '0' + this.props.time.minutes : this.props.time.minutes
    let text = this.props.finished ? ((this.props.correct ? 'You are right!' : 'Oh snap!') + ` It was ${hour}:${minutes}.`) : ''

    return (
      <span className="correct_time">{text}</span>
    )

  }
}
