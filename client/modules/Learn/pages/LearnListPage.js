import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import LearnList from '../components/LearnList';

// Import Actions
import { fetchSteps } from '../LearnActions';

// Import Selectors
import { getSteps } from '../LearnReducer';

class LearnListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchSteps());
  }

  render() {
    return (
      <LearnList steps={this.props.steps} />
    );
  }
}

// Actions required to provide data for this component to render in sever side.
LearnListPage.need = [() => { return fetchSteps(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    steps: getSteps(state),
  };
}

LearnListPage.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

LearnListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(LearnListPage);
