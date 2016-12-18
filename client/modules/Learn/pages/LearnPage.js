import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Clock from '../components/Clock';
import Guesser from '../components/Guesser';

// Import Actions
import { fetchStep } from '../LearnActions';

// Import Selectors
import { getStep } from '../LearnReducer';

export class LearnPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      time: {
        hour: '',
        minutes: '',
      },
    };
  }

  componentDidMount() {
    /* this.setState({
      isMounted: true,
    }); */ // eslint-disable-line
  }

  updateComponentState = (time) => {
    this.setState({
      time,
    });
  }

  render() {
    return (
      <div>
        <Helmet title={this.props.step.title} />
        <div>
          <h3>{this.props.step.title}</h3>
          <p>{this.props.step.desc}</p>
          <Clock
            onPlay={this.updateComponentState}
          />
          <Guesser
            time={this.state.time}
          />
        </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
LearnPage.need = [params => {
  return fetchStep(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    step: getStep(state, props.params.cuid),
  };
}

LearnPage.propTypes = {
  step: PropTypes.shape({
    number: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(LearnPage);
