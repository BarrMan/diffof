import { Component } from 'react';
import DiffKind from '@barrman/diffof-common';

import styles from './DiffSection.styles';
import { withStyles } from '../../Common/styles';

class DiffSection extends Component {
    render() {
        const { classes, docs, sectionType } = this.props;

        console.log('docs', docs);
        console.log('sectionType', sectionType);

        return (
            <div id="previous-run" className={classes.diffSection}>
                <div id="previous-run-lines"></div>
                <div id="previous-run-code">{sectionType}</div>
            </div>
        );
    }
}

export const SectionType = {
    CURRENT: 1,
    PREVIOUS: -1,
};

export default withStyles(DiffSection)(styles);