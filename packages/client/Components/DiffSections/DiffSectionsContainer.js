import { connect } from 'react-redux';
import DiffSections from './DiffSections';

const mapStateToProps = store => {
    const { diffs } = store;
    const { documentsDiffs } = diffs;

    return { documentsDiffs };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DiffSections);