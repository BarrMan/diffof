import { Component } from 'react';
import PropTypes from 'prop-types';

export default class JsonDiff extends Component {
  componentDidMount() {
    const { location, loadDocumentDiffs } = this.props;
    const queryParams = new URLSearchParams(location.search);

    loadDocumentDiffs(
      queryParams.get('fromIndex'),
      queryParams.get('toIndex'),
      queryParams.get('fromSource'),
      queryParams.get('toSource')
    );
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

JsonDiff.propTypes = {
  children: PropTypes.array.isRequired,
  loadDocumentDiffs: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};
