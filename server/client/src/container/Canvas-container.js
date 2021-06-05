import React from "react";
import {isLoading} from "../actions/common-actions";

export const mapStateToProps = ({appState}) => {
    return {
        isCurrentlyLoading: appState.isLoading,
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: (status) => {
            dispatch(isLoading(status))
        }
    }
};