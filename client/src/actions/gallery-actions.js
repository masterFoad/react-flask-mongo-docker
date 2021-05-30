export const UPDATE_CACHE = 'UPDATE_CACHE';


export const updateGalleryCache = (imagesCache) => {
    return {
        type: UPDATE_CACHE,
        imagesCache
    }
};