import React, { Component } from 'react'
import { calcMinutes } from './Helpers'
import ClockImage from './ClockImage'

export default class Description extends Component {
  constructor(props) {
    super(props)

    this.state = {
      minutesValue: 37
    }
  }

  inputChanged(event) {
    this.setState({minutesValue: event.target.value});
  }

  playSound(event) {
    let soundClass = event.target.dataset.soundClass
    let soundNum = event.target.dataset.soundNum || this.refs[event.target.dataset.ref].value

    if(soundClass == 'quarters') {
      let quartersSound = this.props.context.createBufferSource()
      quartersSound.buffer = this.props.buffers.quarters[soundNum]
      quartersSound.connect(this.props.context.destination)
      quartersSound.start(0)
    } else if(soundClass == 'hour') {
      let hourSound = this.props.context.createBufferSource()
      hourSound.buffer = this.props.buffers.hour[soundNum]
      hourSound.connect(this.props.context.destination)
      hourSound.start(0)
    } else if(soundClass == 'minutes') {
      let minutes_to_play = calcMinutes(soundNum, this.props.context, this.props.buffers)
      $(minutes_to_play).each(function() {
        this.start(0)
      })
    }
  }

  learnTheBasics() {
    let minuteModeDescription

    if(this.props.minuteMode === 'minutes') {
      minuteModeDescription = (
        <div className="minute-description col-6">
          <h3>Minutes (Harder)</h3>
          <p>The minutes mode is a bit more tricky, because you will hear single minutes from 0 to 59.
            Those minutes will be represented by drum sounds. Depending on which drum sounds you hear, you will have to
            calculate the minutes. These are the four different drum sounds that will be played in various combinations.
          </p>
          <div className="btn-group-vertical">
            <button onClick={this.playSound.bind(this)} data-sound-class="minutes" data-sound-num="30" className="btn btn-default" id="thirty-minutes">30 Minutes</button>
            <button onClick={this.playSound.bind(this)} data-sound-class="minutes" data-sound-num="10" className="btn btn-default" id="ten-minutes">10 Minutes</button>
            <button onClick={this.playSound.bind(this)} data-sound-class="minutes" data-sound-num="5" className="btn btn-default" id="five-minutes">5 Minutes</button>
            <button onClick={this.playSound.bind(this)} data-sound-class="minutes" data-sound-num="1" className="btn btn-default" id="one-minute">1 Minute</button>
          </div>
          <p>Now for the sounds to be played it will be like:</p>
          <ul>
            <li><strong>30 Minutes:</strong> Played once or not at all</li>
            <li><strong>10 Minutes:</strong> Played once or twice</li>
            <li><strong>5 Minutes:</strong> Played once or not at all</li>
            <li><strong>1 Minute:</strong> Played one to four times</li>
          </ul>
          <p>Hear them together:</p>
          <div className="form-group">
            <label htmlFor="select-minutes"><span className="sr-only">Select the minutes</span></label>
            <input className="form-control" value={this.state.minutesValue} onChange={this.inputChanged.bind(this)} type="number" ref="select_minutes" id="select-minutes" min="0" max="59" step="1" />
            <button onClick={this.playSound.bind(this)} data-sound-class="minutes" data-ref="select_minutes" id="play-minutes-sound" className="btn btn-default">Play Minutes Sound</button>
          </div>
        </div>
      )
    } else if(this.props.minuteMode === 'quarters') {
      minuteModeDescription = (
        <div className="minute-description col-6">
          <h3>Quarters (Easier)</h3>
          <p>If you chose the quarters mode you will here the quarters in the first part of the sound. These can be from 1 to 4 notes.
            Each note represents 1 quarter, thus you will only have to count the notes to know how many quarters there are. Easy, isn't it?</p>
          <div className="btn-group-vertical">
            <button onClick={this.playSound.bind(this)} data-sound-class="quarters" data-sound-num="1" className="btn btn-default" id="one-quarter">1 Quarter (15)</button>
            <button onClick={this.playSound.bind(this)} data-sound-class="quarters" data-sound-num="2" className="btn btn-default" id="two-quarters">2 Quarters (30)</button>
            <button onClick={this.playSound.bind(this)} data-sound-class="quarters" data-sound-num="3" className="btn btn-default" id="three-quarters">3 Quarters (45)</button>
            <button onClick={this.playSound.bind(this)} data-sound-class="quarters" data-sound-num="4" className="btn btn-default" id="four-quarters">4 Quarters (00)</button>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="row">
          {minuteModeDescription}
          <div className="hour-description col-6">
            <h3>Hour</h3>
            <p>Now for the hour's part you will always hear two notes. The first one is the reference note, C1.
              The second one will be in a specific pitch to the first note, which represents a certain interval. Try it yourself to see
              which interval represents which hour.</p>
            <div className="form-group">
              <label htmlFor="select-hour"><span className="sr-only">Select the hour</span></label>
              <select ref="select_hour" className="form-control" name="select-hour" id="select-hour">
                <option value="1">1 (Perfect Unison)</option>
                <option value="2">2 (Major Second)</option>
                <option value="3">3 (Major Third)</option>
                <option value="4">4 (Perfect Fourth)</option>
                <option value="5">5 (Perfect Fifth)</option>
                <option value="6">6 (Major Sixth)</option>
                <option value="7">7 (Major Seventh)</option>
                <option value="8">8 (Perfect Octave)</option>
              </select>
              <button onClick={this.playSound.bind(this)} data-sound-class="hour" data-ref="select_hour" id="play-hour-sound" className="btn btn-default">Play Hour Sound</button>
            </div>
            <p>But wait, there are still some hours missing! For the hours 9 to 12 we have to do a little trick.
              Your reference tone will now have an octave down and an octave up playing at the same time. The tone for the interval
              will be one octave higher than before.</p>
            <p>Sounds complicated? It isn't! All you have to do, is hear the interval like you
              did before but now add 7 to it to get the correct hour.
            </p>
            <div className="form-group">
              <label htmlFor="select-higher-hour"><span className="sr-only">Select the hour</span></label>
              <select ref="select_higher_hour" className="form-control" name="select-higher-hour" id="select-higher-hour">
                <option value="9">9 (7 + 2 = Major Second)</option>
                <option value="10">10 (7 + 3 = Major Third)</option>
                <option value="11">11 (7 + 4 = Perfect Fourth)</option>
                <option value="12">12 (7 + 5 = Perfect Fifth)</option>
              </select>
              <button onClick={this.playSound.bind(this)} data-sound-class="hour" data-ref="select_higher_hour" id="play-higher-hour-sound" className="btn btn-default">Play Hour Sound</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  tryItYourself() {
    let time = {
      hour: 10,
      minutes: 37,
    }

    return (
      <div>
        <div className="row align-items-center">
          <div className="col-6">
            <ClockImage
              time={time}
              difficulty={1}
              step={1}
              minuteMode={this.props.minuteMode}
              isDescription={true}
            />
          </div>
          <div className="col-6">
            <h3>Ok, now it's your turn.</h3>
            <p>In the first 5 examples, you will only have to guess the correct hour.
              Remember, that the hour is represented by a reference tone and an interval.</p>
            <p>In the other 5 examples you will have to guess the minutes (or quarters if you chose
              quarters mode in the upper right corner of the page).</p>
            <p><strong>Good luck!</strong></p>
          </div>
        </div>
      </div>
    )
  }

  becomeAnExpert() {
    let time = {
      hour: 5,
      minutes: 12,
    }

    return (
      <div>
        <div className="row align-items-center">
          <div className="col-6">
            <ClockImage
              time={time}
              difficulty={2}
              step={1}
              minuteMode={this.props.minuteMode}
              isDescription={true}
            />
          </div>
          <div className="col-6">
            <h3>I think you're ready!</h3>
            <p>You're well prepared to go all in! (If you are not, you can still do the other steps [again]!)
              In this step you will have to guess the hour and the minutes yourself. Remember that you can still choose
              the minute mode you prefer in the upper right corner of the page.
            </p>
            <p><strong>You can do it!</strong></p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    let description

    if(this.props.learnStep == 0) {
      description = this.learnTheBasics()
    } else if(this.props.learnStep == 1) {
      description = this.tryItYourself()
    } else if(this.props.learnStep == 2) {
      description = this.becomeAnExpert()
    }

    return (
      <div className="learn-step-description">
        {description}
      </div>
    )
  }
}
