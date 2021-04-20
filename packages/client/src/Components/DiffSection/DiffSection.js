import { Component } from 'react';

import styles from './DiffSection.styles';
import { withStyles } from '../../Common/styles';

class DiffSection extends Component {
    render() {
        const { classes, docs } = this.props;

        console.log('docs', docs);

        return (
            <div id="previous-run" className={classes.diffSection}>
                <div id="previous-run-lines"></div>
                <div id="previous-run-code"></div>
            </div>
        );
    }
}

export default withStyles(DiffSection)(styles);