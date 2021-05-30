import {
    INPUT_DESCRIPTION,
    INPUT_TITLE,
    UPLOAD_DATA_TO_SERVER,
    UPLOAD_IMAGE,
    UPLOAD_JSON
} from "../actions/upload-actions";

const getInitState = () => {
    return {imageToUpload: [], jsonToUpload: {}, title: "", description: ""};
};


const uploadState = (state = getInitState(), action) => {
    switch (action.type) {
        case UPLOAD_IMAGE:
            return Object.assign({}, state, {
                imageToUpload: action.data
            });

        case UPLOAD_JSON:
            return Object.assign({}, state, {
                jsonToUpload: action.data
            });

        case INPUT_TITLE:
            return Object.assign({}, state, {
                title: action.data
            });

        case INPUT_DESCRIPTION:
            return Object.assign({}, state, {
                description: action.data
            });

        case UPLOAD_DATA_TO_SERVER:
            return getInitState();


        default:
            return state;
    }
};

export default uploadState;