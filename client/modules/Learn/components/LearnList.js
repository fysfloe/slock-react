import React, { PropTypes } from 'react';

// Import Components
import LearnStep from './LearnStep';

function LearnList(props) {
  return (
    <div className="listView row">
    {
      props.steps.map(step => (
        <LearnStep
          step={step}
          key={step.cuid}
        />
      ))
    }
    </div>
  );
}

LearnList.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
};

export default LearnList;
