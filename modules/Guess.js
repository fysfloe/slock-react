import React, { Component } from 'react'
import GuessInput from './GuessInput'
import GuessButton from './GuessButton'
import CorrectTime from './CorrectTime'
import { Link } from 'react-router'
import { getQuarters } from './Helpers'
import { getMinutes } from './Helpers'

export default class Guess extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hourValue: props.guessed.hour || '',
      minutesValue: props.guessed.minutes || '',
      quartersValue: props.guessed.minutes ? getQuarters(props.guessed.minutes) : 4,
    }

  }

  componentDidMount() {

  }

  guessHandler() {
    let guessHour = this.state.hourValue
    let guessQuarters = this.state.quartersValue
    let guessMinutes = this.state.minutesValue

    console.log("guessHour", guessHour);
    console.log("guessMinutes", guessMinutes);


    if(guessHour == 0 && guessHour !== '') {
      guessHour = 12
    }

    if(guessHour === '' || isNaN(guessHour)) {
      $(this.refs.error_no_input).fadeIn()
      return
    }

    if(
      (this.props.minuteMode === 'minutes' && (guessMinutes === '' || isNaN(guessMinutes)))
      ||
      (this.props.minuteMode === 'quarters' && (guessQuarters === '' || isNaN(guessQuarters)))
    ) {
      $(this.refs.error_no_input).fadeIn()
      return
    }

    $(this.refs.error_no_input).hide()

    let hour = this.props.time.hour > 12 ? this.props.time.hour - 12 : this.props.time.hour
    let minutes = this.props.time.minutes
    let quarters = getQuarters(minutes)

    let $correct_time = $(this.refs.correct_time)

    if(this.props.minuteMode === 'quarters') {
      if(guessHour == hour && guessQuarters == quarters) {
        this.props.onGuess(true, {hour: guessHour, minutes: getMinutes(guessQuarters)})
      } else {
        this.props.onGuess(false, {hour: guessHour, minutes: getMinutes(guessQuarters)})
      }
    } else if(this.props.minuteMode === 'minutes') {
      if(guessHour == hour && guessMinutes == minutes) {
        this.props.onGuess(true, {hour: guessHour, minutes: guessMinutes})
      } else {
        this.props.onGuess(false, {hour: guessHour, minutes: guessMinutes})
      }
    }
  }

  handleInputChange(hourValue, minutesValue, quartersValue) {
    this.setState({
      hourValue: hourValue,
      minutesValue: minutesValue,
      quartersValue: quartersValue,
    })
  }

  render() {
    let col = this.props.difficulty > 0 ? 'col-4' : 'col'

    return (
      <div className={`${col} guess minute-mode-${this.props.minuteMode}`}>
        <h3>Your Guess:</h3>
        <form onSubmit={this.guessHandler.bind(this)}>
          <GuessInput
            minuteMode={this.props.minuteMode}
            finished={this.props.finished}
            step={this.props.step}
            time={this.props.time}
            difficulty={this.props.difficulty}
            guessed={this.props.guessed}
            onInputChange={this.handleInputChange.bind(this)}
          />
          <span ref="error_no_input" className="error-no-input">Well, you should at least fill something in...</span>
          <GuessButton
            onGuess={this.guessHandler.bind(this)}
            finished={this.props.finished}
            correct={this.props.correct}
          />
          <CorrectTime
            finished={this.props.finished}
            correct={this.props.correct}
            time={this.props.time}
            minuteMode={this.props.minuteMode}
          />
        </form>
      </div>
    )
  }
}
