import React from 'react';
import './App.css';
import ImageDetailsForm from "./components/image-details-form"
import ModalDialog from "./components/modal-dialog";
import BackdropSpinner from "./components/backdrop-spinner";
import ImageGridList from "./components/gallery-list";
import MainTabs from "./components/main-tabs";
import Canvas from "./components/Canvas";

function App() {
    return (
        <div className="App">
            <MainTabs listOfComponents={[
                {
                    index: 0,
                    label: "Upload form",
                    component: <ImageDetailsForm/>
                },
                {
                    index: 1,
                    label: "Gallery",
                    component: <ImageGridList/>
                },
                {
                    index: 2,
                    label: "Test",
                    component: <Canvas/>
                },
            ]}/>

            <ModalDialog/>
            <BackdropSpinner/>
        </div>
    );
}

export default App;