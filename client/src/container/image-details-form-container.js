import {doneUploadToServer, inputDescription, inputTitle} from "../actions/upload-actions";
import {isLoading, showDialog} from "../actions/common-actions";
import React from "react";

export const mapStateToProps = ({uploadState}) => {
    return {
        imageToUpload: uploadState.imageToUpload,
        jsonToUpload: uploadState.jsonToUpload,
        title: uploadState.title,
        description: uploadState.description
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        setLoading: (status) => {
            dispatch(isLoading(status))
        },
        onTitleChange: (title) => {
            dispatch(inputTitle(title));
        },
        onDescriptionChange: (description) => {
            dispatch(inputDescription(description))
        },
        showDiag: (msg, type) => {
            dispatch(showDialog({
                title: msg,
                closeBtn: "OK",
                mode: type
            }))
        },
        showDiagComponent: (title, component, onOkClick) => {
            dispatch(showDialog({
                title: title,
                closeBtn: "Close",
                mode: 'warning',
                descriptionComponent: component,
                onOkClick: () => onOkClick && onOkClick()
            }))
        },
        doneUploadToServer: () => {
            dispatch(doneUploadToServer())
        }
    }
};