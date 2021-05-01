import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import { withStyles } from '../Common/styles';

const useStyles = createUseStyles({
  changeGroups: {
    float: 'left',
    width: 300,
    marginTop: 60,
    marginLeft: 10,
  },
});

const ChangeGroups = ({ classes }) => <div className={classes.changeGroups} />;

ChangeGroups.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(ChangeGroups)(useStyles);
