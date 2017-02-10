import React, { Component } from 'react'
import LearnStep from './LearnStep'
import Header from './Header'
import Footer from './Footer'
import OwnInput from './OwnInput'

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      buffers: {
        hour: [],
        chromatic: [],
        minutes: [],
        quarters: [],
      },
    }
  }

  componentWillMount() {
    this.loadSounds()

    window.AudioContext = window.AudioContext || window.webkitAudioContext
    this.setState({
      context: new AudioContext(),
      minuteMode: localStorage.getItem('minuteMode') || 'minutes',
      hourMode: localStorage.getItem('hourMode') || 'major',
      learnSteps: JSON.parse(localStorage.getItem('learnSteps')) || [
        {
          link: "/learn-the-basics",
          template: "learn-the-basics.js",
          title: "Learn the Basics",
          description: "Learn slocks basics by listening to some times.",
          score: 0,
          progress: 0,
          possibleScore: 10,
          singleSteps: this.getDefaultSteps(0),
        },
        {
          link: "/try-it-yourself",
          template: "try-it-yourself.js",
          title: "Try it Yourself",
          description: "Listen to some times and guess.",
          score: 0,
          progress: 0,
          possibleScore: 10,
          singleSteps: this.getDefaultSteps(1),
        },
        {
          link: "/become-an-expert",
          template: "become-an-expert.js",
          title: "Become an Expert",
          description: "Test your knowledge and become a slock expert!",
          score: 0,
          progress: 0,
          possibleScore: 10,
          singleSteps: this.getDefaultSteps(2),
        },
      ],
    })
  }

  componentDidUpdate() {
    localStorage.setItem('learnSteps', JSON.stringify(this.state.learnSteps))
    localStorage.setItem('minuteMode', this.state.minuteMode)
    localStorage.setItem('hourMode', this.state.hourMode)
  }

  getDefaultSteps(learnStep) {
    let defaultSteps = []

    for(let i = 1; i <= 10; i++) {
      defaultSteps[i] = {
        finished: false,
        correct: false,
        guessed: {
          hour: null,
          minute: null,
        },
        time: this.randomTime(),
      }
    }

    return defaultSteps
  }

  randomTime() {
    return {
      hour: Math.floor(Math.random() * 12) + 1,
      minutes: Math.floor(Math.random() * 59),
    }
  }

  loadSounds() {
    for(let i = 1; i <= 12; i++) {
      this.loadBuffer('audio/' + i + '.wav', i, 'hour');
    }

    for(let i = 1; i <= 12; i++) {
      this.loadBuffer('audio/chromatic/' + i + '.wav', i, 'chromatic');
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

  changeHourMode(hourMode) {
    this.setState({hourMode: hourMode})
  }

  guessHandler(correct, index, step, guessed) {
    let learnSteps = this.state.learnSteps

    learnSteps[index].score = (correct ? ++learnSteps[index].score : learnSteps[index].score)
    learnSteps[index].progress = ++learnSteps[index].progress
    learnSteps[index].singleSteps[step] = {
      finished: true,
      correct: correct,
      guessed: guessed,
      time: learnSteps[index].singleSteps[step].time
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
        hourMode: this.state.hourMode,
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
        <Header
          onMinuteModeChange={this.changeMinuteMode.bind(this)}
          minuteMode={this.state.minuteMode}
          onHourModeChange={this.changeHourMode.bind(this)}
          hourMode={this.state.hourMode}
        />
        <main className="container">
          <OwnInput
            context={this.state.context}
            buffers={this.state.buffers}
            minuteMode={this.state.minuteMode}
            hourMode={this.state.hourMode}
          />
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
