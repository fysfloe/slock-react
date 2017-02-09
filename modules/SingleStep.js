import React, { Component } from 'react'
import { Link } from 'react-router'
import Clock from './Clock'
import Description from './Description'

export default class SingleStep extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  guessHandler(correct = false, guessed = {}) {
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
    let learnStep = this.props.learnSteps[this.props.route.learnStep]

    return (
      <div>
        <h2>{learnStep.description}</h2>
        <p>Click the <button className="btn btn-default">Play Sound</button> button to hear the corresponding sounds to the time you see on the screen.</p>
        <p>Depending on the minute mode you chose (in the upper right corner of the page), the sounds you hear will vary.</p>
        <hr />
        <Description
          context={this.props.context}
          buffers={this.props.buffers}
          learnStep={this.props.route.learnStep}
          minuteMode={this.props.minuteMode}
        />
        <hr />
        <Link className="btn btn-default start-button" to={this.props.route.path.replace('/:step', '') + "/1"}>Go for it →</Link>
      </div>
    )
  }

  renderStep() {
    let singleStep = this.props.learnSteps[this.props.route.learnStep].singleSteps[this.props.params.step]

    return (
      <div>
        <Clock
          path={this.props.route.path.replace('/:step', '')}
          time={singleStep.time}
          minuteMode={this.props.minuteMode}
          context={this.props.context}
          buffers={this.props.buffers}
          difficulty={this.props.route.learnStep}
          step={this.props.params.step}
          onGuess={this.guessHandler.bind(this)}
          finished={singleStep.finished}
          guessed={singleStep.guessed}
          correct={singleStep.correct}
        />
      </div>
    )
  }

  renderStats() {
    let learnStep = this.props.learnSteps[this.props.route.learnStep]
    let singleSteps = learnStep.singleSteps
    let leftStepsOut = false

    let renderStepStats = singleSteps.map((singleStep, index) => {
      if(singleStep) {
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
      }
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
            <p>Now try it yourself. In the next step you will have to guess the hours or the minutes yourself. If you are not to sure how to do it yet, just try this step again.</p>
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
