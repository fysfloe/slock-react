import React, { Component } from 'react'
import LearnStep from './LearnStep'
import Header from './Header'
import Footer from './Footer'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext

    let defaultSteps = this.getDefaultSteps()

    this.state = {
      context: new AudioContext(),
      buffers: {
        hour: [],
        minutes: [],
        quarters: [],
      },
      minuteMode: 'minutes',
      learnSteps: [
        {
          link: "/learn-the-basics",
          title: "Learn the Basics",
          description: "Learn slocks basics by listening to some times.",
          score: 0,
          progress: 0,
          possibleScore: 10,
          singleSteps: defaultSteps,
        },
        {
          link: "/try-it-yourself",
          title: "Try it Yourself",
          description: "Listen to some times and guess.",
          score: 0,
          progress: 0,
          possibleScore: 10,
          singleSteps: defaultSteps,
        },
        {
          link: "/become-an-expert",
          title: "Become an Expert",
          description: "Test your knowledge and become a slock expert!",
          score: 0,
          progress: 0,
          possibleScore: 10,
          singleSteps: defaultSteps,
        },
      ]
    }

    this.loadSounds()
  }

  getDefaultSteps() {
    let defaultStep = {
      finished: false,
      correct: false,
      guessed: {
        hour: null,
        minute: null,
      }
    }

    let defaultSteps = []

    for(let i = 1; i <= 10; i++) {
      defaultSteps[i] = defaultStep
    }

    return defaultSteps
  }

  loadSounds() {
    for(let i = 1; i <= 12; i++) {
      this.loadBuffer('audio/' + i + '.wav', i, 'hour');
    }

    for(let j = 1; j <= 5; j++) {
      this.loadBuffer('audio/minutes/' + j + '.wav', j, 'minutes');
    }

    this.loadBuffer('audio/minutes/10.wav', 10, 'minutes');
    this.loadBuffer('audio/minutes/20.wav', 20, 'minutes');
    this.loadBuffer('audio/minutes/30.wav', 30, 'minutes');
    this.loadBuffer('audio/minutes/_minutes.wav', '_minutes', 'minutes');

    for(let k = 1; k <= 4; k++) {
      this.loadBuffer('audio/quarters/' + k + '_4.wav', k, 'quarters');
    }
  }

  loadBuffer(url, num, hour_min) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = () => {
      this.state.context.decodeAudioData(request.response, (buffer) => {
        let changedBuffers = this.state.buffers;
        changedBuffers[hour_min][num] = buffer;
        this.setState({
          buffers: changedBuffers,
        });
      }, function() {
        console.error('Something bad happened.');
      });
    }
    request.send();
  }

  changeMinuteMode(minuteMode) {
    this.setState({minuteMode: minuteMode})
  }

  guessHandler(correct, index, step, guessed) {
    let learnSteps = this.state.learnSteps

    learnSteps[index].score = (correct ? ++learnSteps[index].score : learnSteps[index].score)
    learnSteps[index].progress = ++learnSteps[index].progress
    learnSteps[index].singleSteps[step] = {
      finished: true,
      correct: correct,
      guessed: guessed,
    }

    this.setState({
      learnSteps: learnSteps
    })
  }

  resetStepHandler(learnStep) {
    let state = this.state
    state.learnSteps[learnStep].score = 0
    state.learnSteps[learnStep].progress = 0
    state.learnSteps[learnStep].singleSteps = this.getDefaultSteps()

    this.setState(state)
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        learnSteps: this.state.learnSteps,
        context: this.state.context,
        buffers: this.state.buffers,
        minuteMode: this.state.minuteMode,
        onGuess: this.guessHandler.bind(this),
        onResetStep: this.resetStepHandler.bind(this),
      })
    )
    let learnSteps = []
    this.state.learnSteps.forEach((learnStep, index) => {
      learnSteps.push(
        <LearnStep
          key={index}
          context={this.state.context}
          link={learnStep.link}
          title={learnStep.title}
          description={learnStep.description}
          score={learnStep.score}
          progress={learnStep.progress}
          possibleScore={learnStep.possibleScore}
        />
      )
    })

    return (
      <div>
        <Header onMinuteModeChange={this.changeMinuteMode.bind(this)} />
        <main className="container">
          <nav id="learn-steps">
            <ul className="learn-steps row">
              {learnSteps}
            </ul>
          </nav>
          {childrenWithProps}
        </main>
        <Footer />
      </div>
    )
  }
}
