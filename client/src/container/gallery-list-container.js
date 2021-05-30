import React from "react";
import {updateGalleryCache} from "../actions/gallery-actions";
import {isLoading} from "../actions/common-actions";
import {gallery_schema} from "../utils/json-validator"
import {showDialog} from "../actions/common-actions";

export const mapStateToProps = ({appState, galleryState}) => {
    return {
        imagesCache: galleryState.imagesCache,
        isLoading: appState.isLoading
    };
};


export const mapDispatchToProps = (dispatch) => {
    return {
        refreshCache: () => {
            dispatch(isLoading(true))
            return fetch("/get-list-of-images").then((res) => {
                if (res) {
                    return res.json()
                } else {
                    return {
                        "images": []
                    }
                }
            }).then((res) => {
                dispatch(isLoading(false))
                const imagesList = res["images"].filter((image) => gallery_schema.isValid(image));
                dispatch(updateGalleryCache(imagesList))
            })
                .catch(err => {
                    dispatch(isLoading(false))
                    console.error(err)
                })
        },
        showDiag: (title, component, onOkClick) => {
            dispatch(showDialog({
                title: title,
                closeBtn: "Close",
                mode: 'success',
                descriptionComponent: component,
                onOkClick: () => onOkClick && onOkClick()
            }))
        }
    }
};