import { Component } from 'react';

export default class JsonDiff extends Component {
    componentDidMount() {
        const { location } = this.props;
        const queryParams = new URLSearchParams(location.search);

        this.props.loadDocumentDiffs(queryParams.get('fromIndex'), queryParams.get('toIndex'), queryParams.get('fromSource'), queryParams.get('toSource'));
    }

    render() {
        return this.props.children;
    }
}

