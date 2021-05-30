import React from 'react';
import ImageUploader from 'react-images-upload';
import {mapDispatchToProps, mapStateToProps} from '../container/image-drop-container';
import {connect} from "react-redux";

class ImageDrop extends React.Component {

    constructor(props) {
        super(props);
    }

    onDrop = (picture) => {
        this.props.onImageUpload(picture)
    };

    render() {
        return (
            <ImageUploader
                withIcon={false}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.png', '.jpeg']}
                withPreview={true}
                singleImage={true}
            />
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(ImageDrop);