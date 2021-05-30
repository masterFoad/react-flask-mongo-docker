import {UPDATE_CACHE} from "../actions/gallery-actions";

const getInitState = () => {
    return {imagesCache: []};
};


const galleryState = (state = getInitState(), action) => {
    switch (action.type) {
        case UPDATE_CACHE:
            return Object.assign({}, state, {
                imagesCache: action.imagesCache
            });
        default:
            return state;
    }
};

export default galleryState;
