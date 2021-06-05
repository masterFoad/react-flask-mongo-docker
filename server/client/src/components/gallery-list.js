import React, {Component} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from "@material-ui/core/Button";
import ImageComponent from "./clickable-image";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "../container/gallery-list-container";
import '../styles/gallery-list-style.scss'

class ImageGridList extends Component {

    constructor(props) {
        super(props);
        this.pollServerImgCache();
    }


    pollServerImgCache = () => {
        this.props.refreshCache().then(() => setTimeout(() => {
            this.props.refreshCache()
        }, 5000));
    };


    render() {
        console.log(this.props)
        return (
            <div className={"root"}>
                <GridList cellHeight={160} className={"gridList"} cols={1}>
                    {this.props.imagesCache.map((tile) => (
                        <GridListTile key={tile['_id']} cols={tile.cols || 1}>
                            <Button>
                                <ImageComponent
                                    title={tile.title}
                                    description={tile.description}
                                    path={tile.image_path.substring(1)}
                                    polygon_path={tile.image_path_polygon.substring(1)
                                    }/>
                            </Button>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(ImageGridList);