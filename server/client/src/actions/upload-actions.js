export const UPLOAD_DATA_TO_SERVER = 'UPLOAD_DATA_TO_SERVER';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const UPLOAD_JSON = 'UPLOAD_JSON';
export const INPUT_TITLE = 'INPUT_TITLE';
export const INPUT_DESCRIPTION = 'INPUT_DESCRIPTION';


export const uploadImage = (data) => {
    return {
        type: UPLOAD_IMAGE,
        data
    }
};

export const uploadJson = (data) => {
    return {
        type: UPLOAD_JSON,
        data
    }
};

export const inputTitle = (data) => {
    return {
        type: INPUT_TITLE,
        data
    }
};

export const inputDescription = (data) => {
    return {
        type: INPUT_DESCRIPTION,
        data
    }
};

export const doneUploadToServer = () => {
    return {
        type: UPLOAD_DATA_TO_SERVER
    }
};

