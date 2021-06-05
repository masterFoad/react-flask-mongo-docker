export const UPDATE_CACHE = 'UPDATE_CACHE';
export const SET_CANVAS_DIMENSIONS = 'SET_CANVAS_DIMENSIONS';


export const updateGalleryCache = (imagesCache) => {
    return {
        type: UPDATE_CACHE,
        imagesCache
    }
};

export const setCanvasDimensions = (width, height) => {
    return {
        type: UPDATE_CACHE,
        data: {
            width,
            height
        }
    }
};