import {
    LOAD_DIFFS_START,
    LOAD_DIFFS_COMPLETE
} from '../constants/actionTypes';

const diffsReducer = (state = {}, action) => {
    const { payload } = action;

    switch (action.type) {
        case LOAD_DIFFS_START:
            return {
                ...state,
                loading: true,
            };
        case LOAD_DIFFS_COMPLETE:
            const { documentDiffs, totalDocuments } = payload;
            return {
                ...state,
                loading: false,
                documentsDiffs: documentDiffs,
                totalDocuments,
            };
        default:
            return state;
    }
};

export default diffsReducer;