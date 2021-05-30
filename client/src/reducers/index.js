import {combineReducers} from 'redux';
import appState from './app-state';
import uploadState from './upload-state';
import galleryState from "./gallery-state";

const AppStore = combineReducers({
    appState,
    uploadState,
    galleryState
});

export default AppStore;
