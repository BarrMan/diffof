import React from 'react';
import PropTypes from 'prop-types';
import { withClasses } from '../../Common/styles';

const Header = ({ classes }) => (
  <span className={classes.header}>
    <span className={withClasses(classes.green, classes.borderDotted)}>Diff</span>
    <span className={withClasses(classes.red, classes.italic)}>Of</span>
  </span>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Header;
