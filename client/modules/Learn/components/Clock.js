import React, { PropTypes, Component } from 'react';
import { quarters, audioURL } from '../LearnReducer';
import { connect } from 'react-redux';
// import { Sound } from 'react-sound';
const isBrowser = typeof window !== 'undefined';
const Sound = isBrowser ? require('react-sound') : undefined;

export class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      hour: {
        url: '',
        status: Sound.status.STOPPED,
      },
      minutes: {
        url: '',
        status: Sound.status.STOPPED,
      },
    };
  }

  componentDidMount() {
    /* this.setState({
      isMounted: true,
    }); */ // eslint-disable-line
  }

  playRandomSound = (e) => {
    e.preventDefault();

    const randomNumber = Math.floor((Math.random() * 11) + 1);
    const randomNumberQ = Math.floor((Math.random() * 3));

    const hour = this.state.hour;
    hour.status = Sound.status.STOPPED;

    this.props.onPlay(
      {
        hour: randomNumber,
        minutes: quarters[randomNumberQ],
      }
    );

    this.setState({
      hour,
      minutes: {
        url: `${audioURL}quarters/${quarters[randomNumberQ]}.wav`,
        number: quarters[randomNumberQ],
        status: Sound.status.PLAYING,
      },
    });

    setTimeout(
      () => {
        this.setState({
          hour: {
            url: `${audioURL}${randomNumber}.wav`,
            number: randomNumber,
            status: Sound.status.PLAYING,
          },
        });
      },
      1800
    );
  }

  render = () => {
    return (
      <div>
        <button id="play" className="btn btn-default" onClick={this.playRandomSound}>Random</button>
        <Sound
          url={this.state.hour.url}
          playStatus={this.state.hour.status}
        />
        <Sound
          url={this.state.minutes.url}
          playStatus={this.state.minutes.status}
        />
      </div>
    );
  }
}

Clock.propTypes = {
  onPlay: PropTypes.func.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(props) {
  return props;
}

export default connect(mapStateToProps)(Clock);
