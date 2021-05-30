import React from "react";

export const mapStateToProps = ({appState}) => {
    return {
        isLoading: appState.isLoading
    };
};