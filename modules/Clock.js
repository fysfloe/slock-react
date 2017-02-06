import React, { Component } from 'react'
import { Link } from 'react-router'
import PlaySoundButton from './PlaySoundButton'
import ClockImage from './ClockImage'
import Guess from './Guess'
import { withLeadingZero } from './Helpers'

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

    if(hour > 12) {
      hour -= 12
    }
    let hourSound = context.createBufferSource()
    hourSound.buffer = buffers.hour[hour]
    hourSound.connect(context.destination)
    if(this.props.minuteMode === 'minutes') {
      hourSound.start(0)
    }

    if(this.props.minuteMode === 'quarters') {
      let quartersSound = context.createBufferSource()
      quartersSound.buffer = buffers.quarters[this.getQuarters(minutes)]
      quartersSound.connect(context.destination)
      quartersSound.start(0)

      setTimeout(function() {
        hourSound.start(0)
      }, 1800)

    } else if(this.props.minuteMode === 'minutes') {
      let minutes_to_play = this.calcMinutes(minutes)
      setTimeout(function() {
        $(minutes_to_play).each(function() {
          this.start(0)
        })
      }, 600)
    }
  }

  calcMinutes(minutes) {
    let thirty, tens, five, ones
    thirty = tens = five = ones = false
    let minutes_to_play = []
    let context = this.props.context
    let buffers = this.props.buffers

    if(minutes >= 30) {
      thirty = context.createBufferSource()
      thirty.buffer = buffers.minutes[30]
      thirty.connect(context.destination)
    }

    if(minutes < 30 || minutes > 39) {
      var new_minutes = minutes
      if(minutes >= 40) {
        new_minutes -= 30
      }
      var tensCount = Math.floor(new_minutes/10 % 10)
      if(tensCount) {
        tens = context.createBufferSource()
        tens.buffer = buffers.minutes[tensCount*10]
        tens.connect(context.destination)
      }
    }

    var onesCount = Math.floor(minutes % 10)

    if(onesCount >= 5) {
      five = context.createBufferSource()
      five.buffer = buffers.minutes[5]
      five.connect(context.destination)
    }

    if(onesCount != 5 && onesCount != 0) {
      ones = context.createBufferSource()
      ones.buffer = buffers.minutes[onesCount % 5]
      ones.connect(context.destination)
    }

    if(thirty) minutes_to_play.push(thirty)
    if(tens) minutes_to_play.push(tens)
    if(five) minutes_to_play.push(five)
    if(ones) minutes_to_play.push(ones)

    return minutes_to_play;
  }

  render() {
    let next = this.props.step < 10 ? parseInt(this.props.step) + 1 : 'end'
    return (
      <div className="row align-items-center">
        <div className="col-1">
          <Link to={`${this.props.path}/${parseInt(this.props.step) - 1}`} className="single-step-previous">Previous</Link>
        </div>
        <div className="col">
          <PlaySoundButton onClick={this.playSoundHandler.bind(this)} />
          <div className="row align-items-center">
            <ClockImage time={this.props.time} difficulty={this.props.difficulty} finished={this.props.finished} />
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
        <div className="col-1">
          <Link onClick={this.props.onGuess} to={`${this.props.path}/${next}`} className="single-step-next">Next</Link>
        </div>
      </div>
    )
  }
}
