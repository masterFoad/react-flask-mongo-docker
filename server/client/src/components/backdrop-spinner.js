import React, {Component} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from "react-redux";
import {mapStateToProps} from "../container/backdrop-spinner-container";
import withStyles from "@material-ui/core/styles/withStyles";
import {compose} from "redux";

const styles = (theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});


class BackdropSpinner extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{zIndex: 9999}}>
                <Backdrop className={styles.backdrop} style={{zIndex: 9999}} open={this.props.isLoading}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </div>
        );
    }
}

export default compose(
    withStyles(styles, {
        name: 'BackdropSpinner',
    }),
    connect(mapStateToProps),
)(BackdropSpinner);