import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = ({ children, classes }) => <div className={classes.paragraph}>{children}</div>;

Paragraph.propTypes = {
  children: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default Paragraph;
