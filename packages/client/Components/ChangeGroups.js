import { Component } from 'react';
import { createUseStyles } from 'react-jss';

import { withStyles } from '../Common/styles';

const useStyles = createUseStyles({
    changeGroups: {
        float: 'left',
        width: 300,
        marginTop: 60,
        marginLeft: 10,
    }
});

class ChangeGroups extends Component {
    render() {
        const { classes } = this.props;

        return (<div className={classes.changeGroups}></div>);
    }
}

export default withStyles(ChangeGroups)(useStyles);