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
    let speechClass, speechResultClass

    speechClass = []

    speechResultClass = [
      'col', 'speech-result'
    ]

    if(this.props.recognize) {
      speechClass.push('active')
    }

    if(this.props.speechResult.final) {
      speechResultClass.push('final')

      if(this.props.speechResult.commandCorrect) {
        speechClass.push('correct-command')
      } else {
        speechClass.push('false-command')
      }
    }

    return (
      <header>
        <hgroup>
          <h1><Link to="/">slock</Link></h1>
          <p>World's best Sound Clock</p>
        </hgroup>
        <div className="speech row align-items-center">
          <div className="col">
            <svg xmlns="http://www.w3.org/2000/svg" className={speechClass.join(" ")} width="48" height="48" viewBox="0 0 48 48" onClick={this.props.toggleSpeech}>
              {!this.props.recognize &&
                <path d="M24 28c3.31 0 5.98-2.69 5.98-6L30 10c0-3.32-2.68-6-6-6-3.31 0-6 2.68-6 6v12c0 3.31 2.69 6 6 6zM21.6 9.8c0-1.32 1.08-2.4 2.4-2.4 1.32 0 2.4 1.08 2.4 2.4l-.02 12.4c0 1.32-1.07 2.4-2.38 2.4-1.32 0-2.4-1.08-2.4-2.4V9.8zm13 12.2c0 6-5.07 10.2-10.6 10.2-5.52 0-10.6-4.2-10.6-10.2H10c0 6.83 5.44 12.47 12 13.44V42h4v-6.56c6.56-.97 12-6.61 12-13.44h-3.4z"/>
              }
              {this.props.recognize &&
                <path d="M24 28c3.31 0 5.98-2.69 5.98-6L30 10c0-3.32-2.68-6-6-6-3.31 0-6 2.68-6 6v12c0 3.31 2.69 6 6 6zm10.6-6c0 6-5.07 10.2-10.6 10.2-5.52 0-10.6-4.2-10.6-10.2H10c0 6.83 5.44 12.47 12 13.44V42h4v-6.56c6.56-.97 12-6.61 12-13.44h-3.4z"/>
              }
            </svg>
          </div>
          <div className={speechResultClass.join(" ")}>
            {this.props.speechResult.result}
            {!this.props.recognize && !this.props.speechResult.result && <span>Say "hey slock"</span>}
          </div>
        </div>

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
