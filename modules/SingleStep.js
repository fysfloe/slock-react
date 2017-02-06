import React, { Component } from 'react'
import { Link } from 'react-router'
import Clock from './Clock'
import data from '../data/learn-the-basics.js'

export default class SingleStep extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  guessHandler(correct, guessed) {
    console.log("foo");

    if(this.props.route.learnStep == 0) {
      correct = true
      guessed = {}
    }

    this.props.onGuess(correct, this.props.route.learnStep, this.props.params.step, guessed)
  }

  onResetStep() {
    this.props.onResetStep(this.props.route.learnStep)
  }

  renderDescription() {
    return (
      <div>
        <h2>{this.props.route.title}</h2>
        {this.props.route.description}&nbsp;<Link to={this.props.route.path.replace('/:step', '') + "/1"}>Start →</Link>
      </div>
    )
  }

  renderStep() {
    return (
      <div>
        <Clock
          path={this.props.route.path.replace('/:step', '')}
          time={{hour: data[this.props.params.step].hour, minutes: data[this.props.params.step].minutes}}
          minuteMode={this.props.minuteMode}
          context={this.props.context}
          buffers={this.props.buffers}
          difficulty={this.props.route.learnStep}
          step={this.props.params.step}
          onGuess={this.guessHandler.bind(this)}
          finished={this.props.learnSteps[this.props.route.learnStep].singleSteps[this.props.params.step].finished}
          guessed={this.props.learnSteps[this.props.route.learnStep].singleSteps[this.props.params.step].guessed}
          correct={this.props.learnSteps[this.props.route.learnStep].singleSteps[this.props.params.step].correct}
        />
      </div>
    )
  }

  renderStats() {
    let learnStep = this.props.learnSteps[this.props.route.learnStep]
    let singleSteps = learnStep.singleSteps
    let leftStepsOut = false

    let renderStepStats = singleSteps.map((singleStep, index) => {
      let classNames = ''
      if(singleStep.finished) {
        classNames += singleStep.correct ? 'correct' : 'not-correct'
      } else {
        leftStepsOut = true
        classNames += ' not-finished'
      }

      return (
        <li key={index} className="single-step col">
          <Link to={this.props.route.path.replace(':step', index)} className={classNames}>{index}</Link>
        </li>
      )
    })

    let leftOutText = leftStepsOut ? 'But you seem to have left some steps out. Try them as well!' : ''
    let congrats = ''

    if(! leftStepsOut) {
      if(learnStep.score <= 3) {
        congrats = 'That\'s pretty poor... Try it again to get better!'
      } else if(learnStep.score <= 5) {
        congrats = 'Well, it\'s something... But I guess you could do better.'
      } else if(learnStep.score <= 7) {
        congrats = 'Not too bad! But not too good either... Try it again!'
      } else if(learnStep.score <= 9) {
        congrats = 'Pretty good! But can you do 10/10 as well?'
      }
    }

    let nextLink = ''

    if(this.props.learnSteps[parseInt(this.props.route.learnStep) + 1]) {
      nextLink = <Link to={`${this.props.learnSteps[parseInt(this.props.route.learnStep) + 1].link}`} className="btn btn-default">Next Step &rarr;</Link>
    }

    return (
      <div className="stats">
        {this.props.route.learnStep > 0 &&
          <div>
            <h3>Ok, here are your stats:</h3>
            <ul className="row">{renderStepStats}</ul>
            <p>You guessed {learnStep.score} out of {learnStep.possibleScore} correct. {leftOutText}</p>
            <div className="congrats">{congrats}</div>
          </div>
        }
        {this.props.route.learnStep == 0 &&
          <div>
            <h3>Ok, that was the easy part!</h3>
            <p>Now try it yourself. In the next step you will hear the hours. Can you guess them correctly?</p>
          </div>
        }
        <Link to={this.props.route.path.replace(':step', 1)} className="btn btn-default" onClick={this.onResetStep.bind(this)}>Try it Again!</Link>
        &nbsp;{nextLink}
      </div>
    )
  }

  render() {
    let toRender
    if(! this.props.params.step || this.props.params.step == 0) {
      toRender = this.renderDescription()
    } else if(this.props.params.step == 'end') {
      toRender = this.renderStats()
    } else {
      toRender = this.renderStep()
    }

    return (
      <div className="row">
        <div id="learn-content" className="col">
          {toRender}
        </div>
      </div>
    )
  }
}
