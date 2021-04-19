import api from '../api';
import { LOAD_DIFFS_START, LOAD_DIFFS_COMPLETE } from '../constants/actionTypes';

const actions = {
    loadDiffsStart: () => ({
        type: LOAD_DIFFS_START,
    }),
    
    loadDiffsComplete: documentsDiffs => ({
        type: LOAD_DIFFS_COMPLETE,
        payload: documentsDiffs,
    }),
    
    loadDocumentsDiffs: (fromIndex, toIndex, fromSource, toSource) => async dispatch => {
        dispatch(actions.loadDiffsStart());
        const documentsDiffs = await api.loadDocumentsDiffs(fromIndex, toIndex, fromSource, toSource);
        dispatch(actions.loadDiffsComplete(documentsDiffs))
    },
}

export default actions;