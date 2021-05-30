import {LOADING, SERVER_ERROR, SHOW_DIALOG} from "../actions/common-actions";

const appState = (state = {isLoading: false}, action) => {
    switch (action.type) {
        case LOADING:
            return Object.assign({}, state, {
                isLoading: action.status
            });
        case SERVER_ERROR:
            return Object.assign({}, state, {
                error: "server error, please try again\n" + action.error
            });
        case SHOW_DIALOG:
            return Object.assign({}, state, {
                dialog: action.dialog
            });
        default:
            return state;
    }
};

export default appState;
