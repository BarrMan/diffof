import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import JsonDiff from './JsonDiff';
import diffsActions from '../../actions/diffsActions';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  loadDocumentDiffs: (fromIndex, toIndex, fromSource, toSource) =>
    dispatch(diffsActions.loadDocumentsDiffs(fromIndex, toIndex, fromSource, toSource)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JsonDiff));
