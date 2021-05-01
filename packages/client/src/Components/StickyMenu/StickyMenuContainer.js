import { connect } from 'react-redux';

import StickyMenu from './StickyMenu';
import styles from './StickyMenu.styles';
import { withStyles } from '../../Common/styles';

const mapStateToProps = (store) => {
  const { diffs } = store;
  const { loading, totalDocuments } = diffs;

  return {
    loading,
    totalDocuments,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(StickyMenu)(styles));
