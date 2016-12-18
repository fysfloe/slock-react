import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

export class Guesser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
    };
  }

  componentDidMount() {
    /* this.setState({
      isMounted: true,
    }); */ // eslint-disable-line
  }

  guess = () => {
    if (this.props.time.hour === this.refs.select_hour.value && this.props.time.minutes === this.refs.select_minutes.value) {
      // alert("guessed correct!");
    } else {
      // alert("guessed incorrect...");
    }
  }

  render = () => {
    let options = [];
    for (let i = 1; i <= 12; i++) {
      options.push(<option key={i}>{i}</option>);
    }
    return (
      <div>
        <div className="row">
          <div className="form-group col-md-4">
            <label htmlFor="hour">Hour:</label>
            <select ref="select_hour" className="form-control" id="hour" name="hour" placeholder="">
              {options}
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="quarters">Minutes:</label>
            <select ref="select_minutes" className="form-control" id="minutes" name="minutes" placeholder="">
              <option>00</option>
              <option>15</option>
              <option>30</option>
              <option>45</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="guess">&nbsp;</label>
            <button type="button" id="guess" className="form-control btn btn-success" onClick={this.guess}>
              Guess
            </button>
          </div>
        </div>
        <span className="correct-time">
          {this.props.time.hour < 10 ? `0${this.props.time.hour}` : this.props.time.hour}:{this.props.time.minutes}
        </span>
      </div>
    );
  }
}

Guesser.propTypes = {
  time: PropTypes.shape({
    hour: PropTypes.string.isRequired,
    minutes: PropTypes.string.isRequired,
  }).isRequired,
};

// Retrieve data from store as props
function mapStateToProps(props) {
  return props;
}

export default connect(mapStateToProps)(Guesser);
