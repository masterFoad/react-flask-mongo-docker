import React, {Component} from 'react';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from '../container/file-upload-container'
import "../styles/style.scss"

class FileUpload extends Component {

    constructor(props) {
        super(props);
    }

    onFileChange = event => {
        this.props.onJsonUpload(event.target.files[0])
    };

    fileData = () => {
        if (this.props.jsonToUpload.selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.props.jsonToUpload.selectedFile.name}</p>
                    <p>
                        Last Modified:{" "}
                        {this.props.jsonToUpload.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                <p className={"upload_label"}>
                    Choose test case json
                </p>
                <div>
                    <label style={{
                        padding: "6px 23px",
                        background: "#3f4257",
                        borderRadius: "30px",
                        color: "white",
                        fontWeight: 300,
                        fontSize: 14,
                        margin: "10px 0",
                        transition: "all 0.2s ease-in",
                        cursor: "pointer",
                        outline: "none",
                    }}>
                        <input type="file" accept={".json"} onChange={this.onFileChange} />
                    </label>
                </div>
                {this.fileData()}
            </div>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(FileUpload);