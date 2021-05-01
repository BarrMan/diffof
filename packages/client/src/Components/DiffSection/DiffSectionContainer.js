import { connect } from 'react-redux';
import { withStyles } from '../../Common/styles';
import DiffSection from './DiffSection';
import styles from './DiffSection.styles';
import diffsActions from '../../actions/diffsActions';

const mapStateToProps = (store) => {
  const { diffs } = store;
  const { highlightedLine } = diffs;

  return { selectedLine: highlightedLine };
};

const mapDispatchToProps = (dispatch) => ({
  setSelectedLine: (selectedLine) => dispatch(diffsActions.setHighlightedLine(selectedLine)),
  unsetSelectedLine: () => dispatch(diffsActions.unsetHighlightedLine()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(DiffSection)(styles));
