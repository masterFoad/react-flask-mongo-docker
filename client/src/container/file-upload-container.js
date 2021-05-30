import {uploadJson} from "../actions/upload-actions";
import React from "react";

export const mapStateToProps = ({uploadState, appState}) => {
    return {
        jsonToUpload: uploadState.jsonToUpload,
        isCurrentlyLoading: appState.isLoading,
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        onJsonUpload: (jsonFile) => {
            dispatch(uploadJson(jsonFile))
        }
    }
};