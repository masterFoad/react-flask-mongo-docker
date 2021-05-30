import {showDialog} from '../actions/common-actions';

export const mapStateToProps = ({appState}) => {
    return {
        dialog:appState.dialog,
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        showDialog: () => {
            dispatch(showDialog());
        },
    };
};
