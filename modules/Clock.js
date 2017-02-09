import React, { Component } from 'react'
import { Link } from 'react-router'
import PlaySoundButton from './PlaySoundButton'
import ClockImage from './ClockImage'
import Guess from './Guess'
import { withLeadingZero } from './Helpers'
import { getQuarters, calcMinutes, playSound } from './Helpers'

export default class Clock extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
  }

  componentDidMount() {
    if(this.props.difficulty === 0) {
      $(this.refs.correct_time).hide()
    } else {

    }
  }

  playSoundHandler() {
    let hour = this.props.time.hour
    let minutes = this.props.time.minutes
    let context = this.props.context
    let buffers = this.props.buffers

    playSound(context, buffers, hour, minutes, this.props.minuteMode)
  }

  render() {
    let next = this.props.step < 10 ? parseInt(this.props.step) + 1 : 'end'
    let linkDisabled = this.props.finished ? '' : 'link-disabled'
    return (
      <div className="row align-items-center">
        <div className="col-1 step-navigation">
          <Link to={`${this.props.path}/${parseInt(this.props.step) - 1}`} className="single-step-previous"><span className="sr-only">Previous</span></Link>
        </div>
        <div className="col">
          <PlaySoundButton onClick={this.playSoundHandler.bind(this)} />
          <div className="row align-items-center">
            <ClockImage
              time={this.props.time}
              difficulty={this.props.difficulty}
              finished={this.props.finished}
              step={this.props.step}
              minuteMode={this.props.minuteMode}
            />
            {this.props.difficulty > 0 &&
              <Guess
                difficulty={this.props.difficulty}
                finished={this.props.finished}
                guessed={this.props.guessed}
                correct={this.props.correct}
                minuteMode={this.props.minuteMode}
                path={this.props.path}
                step={this.props.step}
                onGuess={this.props.onGuess}
                time={this.props.time}
              />
            }
          </div>
        </div>
        <div className="col-1 step-navigation">
          {(this.props.difficulty == 0 && !this.props.finished) &&
            <Link onClick={this.props.onGuess} to={`${this.props.path}/${next}`} className="single-step-next"><span className="sr-only">Next</span></Link>
          }
          {(this.props.difficulty > 0 || this.props.finished) &&
            <Link to={`${this.props.path}/${next}`} className={`single-step-next ${linkDisabled}`}><span className="sr-only">Next</span></Link>
          }
        </div>
      </div>
    )
  }
}
