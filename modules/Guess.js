import React, { Component } from 'react'
import GuessButton from './GuessButton'
import CorrectTime from './CorrectTime'
import { Link } from 'react-router'

export default class ClockImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hourValue: props.guessed.hour || '',
      minutesValue: props.guessed.minutes || '',
    }
  }

  getQuarters(minutes) {
    if(minutes < 15) {
      return 4
    } else if(minutes < 30) {
      return 1
    } else if(minutes < 45) {
      return 2
    } else {
      return 3
    }
  }

  guessHandler() {
    let guessHour = this.refs.hour.value
    if(guessHour == 0) {
      guessHour = 12
    }

    let guessQuarters = this.refs.quarters.value
    let guessMinutes = this.refs.minutes.value

    let hour = this.props.time.hour
    if(hour > 12) {
      hour -= 12
    }

    let minutes = this.props.time.minutes
    let quarters = this.getQuarters(minutes)
    let displayQuarters = [
      "15", "30", "45", "00",
    ]

    let $correct_time = $(this.refs.correct_time)

    if(this.props.minuteMode === 'quarters') {
      if(guessHour == hour && guessQuarters == quarters) {
        this.props.onGuess(true, {hour: guessHour, quarters: guessQuarters})
      } else {
        this.props.onGuess(false, {hour: guessHour, quarters: guessQuarters})
      }
    } else if(this.props.minuteMode === 'minutes') {
      if(guessHour == hour && guessMinutes == minutes) {
        this.props.onGuess(true, {hour: guessHour, minutes: guessMinutes})
      } else {
        this.props.onGuess(false, {hour: guessHour, minutes: guessMinutes})
      }
    }
  }

  handleInputChange() {
    this.setState({
      hourValue: this.refs.hour.value,
      minutesValue: this.refs.minutes.value,
    })
  }

  render() {
    let yourGuess = ''

    if(this.props.finished) {
      yourGuess = `Your Guess: ${this.props.guessed.hour}:${this.props.guessed.minutes}`
    }

    let col = this.props.difficulty > 0 ? 'col-4' : 'col'

    return (
      <div className={`${col} guess minute-mode-${this.props.minuteMode}`}>
        <h3>Your Guess:</h3>
        <form onSubmit={this.guessHandler.bind(this)}>
          <div>
            <input type="number" min="1" max="12" step="1" name="hour" id="hour" ref="hour" className="time-input" onChange={this.handleInputChange.bind(this)} value={this.state.hourValue} />
            <span>:</span>
            <select className="time-input" id="quarters" name="quarters" ref="quarters">
              <option value="4">00</option>
              <option value="1">15</option>
              <option value="2">30</option>
              <option value="3">45</option>
            </select>
            <input type="number" className="time-input" min="1" max="59" name="minutes" id="minutes" ref="minutes" onChange={this.handleInputChange.bind(this)} value={this.state.minutesValue} />
          </div>
          <GuessButton onGuess={this.guessHandler.bind(this)} finished={this.props.finished} correct={this.props.correct} />
          <CorrectTime finished={this.props.finished} correct={this.props.correct} time={this.props.time} />
          <div className="your-guess">{yourGuess}</div>
        </form>
      </div>
    )
  }
}
