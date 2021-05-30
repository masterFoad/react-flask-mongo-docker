import {Container, Grid, TextField} from "@material-ui/core";
import React from "react";
import ImageDrop from "./image-drop";
import FileUpload from "./file-upload";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "../container/image-details-form-container";
import "../styles/style.scss"
import Paper from "@material-ui/core/Paper";
import FormData from "form-data";

class ImageDetailsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleTextChange = (event, callback) => {
        callback(event.target.value)
    };

    uploadAllDetails = async () => {
        this.props.setLoading(true);
        const formData = new FormData();
        const imagefile = this.props.imageToUpload[0];
        const jsonFile = this.props.jsonToUpload;
        formData.append("file", imagefile);
        formData.append("json_details", jsonFile);
        formData.append("title", this.props.title);
        formData.append("description", this.props.description);

        fetch("/upload-img-details", {
            method: 'POST',
            body: formData
        })
            .then((res) => {
                this.props.doneUploadToServer();
                this.props.setLoading(false);
                if (res.status === 200) {
                    this.props.showDiag("Data uploaded successfully", "success")
                } else {
                    switch (res.status) {
                        case 400:
                            this.props.showDiag("Failed to upload details - bad request params", "error");
                            break;
                        case 409:
                            this.props.showDiag("Failed to upload details - duplicate image entry", "error")
                            break;
                        default:
                            this.props.showDiag("Failed to upload details", "error")

                    }
                }

            })
            .catch(err => {
                this.props.doneUploadToServer();
                this.props.setLoading(false);
                console.error(err)
            });

        this.handleClose();

    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        return (
            <div>
                <Button variant="contained" color="default" className="button_class" onClick={this.handleOpen}>
                    Open Upload Form
                </Button>
                {
                    this.state.open && this.props.showDiagComponent(
                        "Upload image details",
                        <Paper>
                            <Container>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField fullWidth label="Title" variant="outlined"
                                                   onChange={(event) => this.handleTextChange(event, this.props.onTitleChange)}/>
                                        <TextField fullWidth label="Description" variant="outlined"
                                                   onChange={(event) => this.handleTextChange(event, this.props.onDescriptionChange)}/>
                                        <FileUpload/>
                                        <ImageDrop/>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Button variant="contained" color="primary" className="button_class"
                                                onClick={this.uploadAllDetails}>
                                            Upload
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Paper>,
                        this.handleClose
                    )
                }
            </div>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(ImageDetailsForm);