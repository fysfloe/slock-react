import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
// import styles from './Header.css';

export function Header(props, context) {
  return (
    <header>
      <h1>
        <Link to="/" ><FormattedMessage id="siteTitle" /></Link>
      </h1>
      {
        context.router.isActive('/', true)
        ? ''
        : null
      }
    </header>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default Header;
