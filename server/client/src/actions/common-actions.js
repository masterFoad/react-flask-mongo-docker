export const LOADING = 'LOADING';
export const SERVER_ERROR = 'SERVER_ERROR';
export const SHOW_DIALOG = 'SHOW_DIALOG';

export const isLoading = (status) => {
    return {
        type: LOADING,
        status
    }
};

export const showDialog = (options) => {
    return {
        type: SHOW_DIALOG,
        dialog: (options)
    }
};


export const serverError = (error, refresh) => {
    return {
        type: SERVER_ERROR,
        error,
        refresh
    }
};
