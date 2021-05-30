import React from 'react';
import '../styles/modal-dialog-independent.scss';

export default class ModalDialogIndependent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        if (!this.props.dialog) {
            return <div></div>;
        }

        let onOkClick = this.props.showDialog;
        if (this.props.dialog && this.props.dialog.onOkClick) {
            onOkClick = () => {
                this.props.dialog.onOkClick();
            };
        }
        let onCancelClick = this.props.showDialog;
        if (this.props.dialog && this.props.dialog.onCancelClick) {
            onCancelClick = () => {
                this.props.showDialog();
                this.props.dialog.onCancelClick();
            };
        }

        let iconClassName = 'fa fa-check';

        if (this.props.dialog.mode === 'error') {
            iconClassName = 'fa fa-times';
        }

        if (this.props.dialog.mode === 'warning') {
            iconClassName = 'fa fa-exclamation';
        }

        return (
            <div className="modal-dialog">
                <div className={`dialog-overlay ${this.props.dialog ? " show" : ""}`}>
                    <div className={`dialog-body ${this.props.dialog && this.props.dialog.mode === 'error'
                        ? 'error-dialog' : this.props.dialog.mode === 'warning'
                            ? "warning-dialog" : "success-dialog"}`}>
                        {this.props.dialog && <div>
                            <div className="header-icon">
                                <i className={iconClassName}></i>
                            </div>
                            <div className="header">
                                {this.props.dialog.title ? this.props.dialog.title : ""}
                            </div>
                            <div className="description">
                                {this.props.dialog.descriptionComponent ? this.props.dialog.descriptionComponent : ""}
                            </div>

                            <div className="description" dangerouslySetInnerHTML={{
                                __html: (this.props.dialog.description ? this.props.dialog.description : "")
                            }}>

                            </div>
                            <div className="buttons">
                                {this.props.dialog.closeBtn &&
                                <div className="ok-btn action-button" type="button"
                                     onClick={onOkClick}>
                                    {this.props.dialog.closeBtn}
                                </div>}

                                {this.props.dialog.cancelBtn &&
                                <div className="ok-btn" type="button"
                                     onClick={onCancelClick}>
                                    {this.props.dialog.cancelBtn}
                                </div>}
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}