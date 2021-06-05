import {uploadImage} from "../actions/upload-actions";

import React from "react";

export const mapStateToProps = ({uploadState, appState}) => {
    return {
        imageToUpload: uploadState.imageToUpload,
        isCurrentlyLoading: appState.isLoading
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        onImageUpload: (image) => {
            dispatch(uploadImage(image))
        }
    }
};