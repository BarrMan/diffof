import {
    LOAD_DIFFS_START,
    LOAD_DIFFS_COMPLETE,
    SET_HIGHLIGHTED_LINE,
    UNSET_HIGHLIGHTED_LINE
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
        case SET_HIGHLIGHTED_LINE: {
            const { highlightedLine } = payload;

            return {
                ...state,
                highlightedLine,
            };
        }
        case UNSET_HIGHLIGHTED_LINE: {
            const { highlightedLine, ...restState } = state;

            return {
                ...restState
            };
        }
        default:
            return state;
    }
};

export default diffsReducer;