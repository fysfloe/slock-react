import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { initAudio } from '../LearnReducer';
import { connect } from 'react-redux';

export class LearnStep extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    initAudio(this.state);
    this.setState({isMounted: true}); // eslint-disable-line
  }

  render() {
    return (
      <div className="learn-step col-md">
        <h3 className="learn-step-title">
          <Link to={`/learn/${this.props.step.slug}-${this.props.step.cuid}`} >
            {this.props.step.title}
          </Link>
        </h3>
        <p className="learn-step-desc">{this.props.step.desc}</p>
        <div className="learn-step-progress"></div>
        <div className="learn-step-score"></div>
      </div>
    );
  }
}

LearnStep.propTypes = {
  step: PropTypes.shape({
    number: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

// Retrieve data from store as props
function mapStateToProps(props) {
  return props;
}

export default connect(mapStateToProps)(LearnStep);
