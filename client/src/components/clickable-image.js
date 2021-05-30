import React from "react";
import "../styles/clickable-image-style.scss"
import ModalDialogIndependent from "./modal-dialog-independent";

export default class ImageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
    }

    handleShowDialog = () => {
        this.setState({isOpen: !this.state.isOpen});
    };

    render() {
        return (<div style={{zIndex: 10}}>
            <img
                src={this.props.path}
                onClick={this.handleShowDialog}
                alt="no image"
                style={{width: "100%", height: "100%"}}
            />
            {this.state.isOpen && <ModalDialogIndependent dialog={{
                title: this.props.title,
                closeBtn: "Close",
                mode: 'success',
                descriptionComponent: (<div>
                    <div>
                        <h5>
                            {this.props.description}
                        </h5>
                    </div>
                    <img
                        style={{width: "100%", height: "100%"}}
                        className="image"
                        src={this.props.polygon_path}
                        onClick={this.handleShowDialog}
                        alt="no image"/>
                </div>),
                onOkClick: () => this.handleShowDialog()
            }}/>}
        </div>);
    }
}