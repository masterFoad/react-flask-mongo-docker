import {SET_CANVAS_DIMENSIONS, UPDATE_CACHE,} from "../actions/gallery-actions";

const getInitState = () => {
    return {imagesCache: [], canvasHeight: 2000, canvasWidth: 800};
};


const galleryState = (state = getInitState(), action) => {
    switch (action.type) {
        case UPDATE_CACHE:
            return Object.assign({}, state, {
                imagesCache: action.imagesCache
            });

        case SET_CANVAS_DIMENSIONS:
            return Object.assign({}, state, {
                canvasWidth: action.data.width,
                canvasHeight: action.data.height
            });
        default:
            return state;
    }
};

export default galleryState;
