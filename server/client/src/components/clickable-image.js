import React from "react";
import "../styles/clickable-image-style.scss"
import ModalDialogIndependent from "./modal-dialog-independent";
import Canvas from "./Canvas";

export default class ImageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false, dimensions: {}};
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
                    <div className={"display_container"}
                         style={{position: "relative", maxWidth: 800, maxHeight: 500, overflow: "scroll"}}>

                        <Canvas link={this.props.path}/>

                    </div>

                </div>),
                onOkClick: () => this.handleShowDialog()
            }}/>}
        </div>);
    }
}