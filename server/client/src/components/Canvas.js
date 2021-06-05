import React from "react";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "../container/Canvas-container";
import FormData from "form-data";

const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }))

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dimensions: {}};
        this.img = null
    }

    dataURLtoFile = (dataurl, filename) => {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
    };

    draw = (x, y, w, h) => {
        const canvas = document.getElementById('canvas');
        if (canvas.getContext) {
            const ctx = canvas.getContext('2d');
            ctx.strokeStyle = "#FF0000";
            ctx.strokeRect(x, y, w, h);
        }
    };

    draw_recactangles = async () => {
        this.props.setLoading(true)
        const dataUrl = await toDataURL(this.props.link);

        const formData = new FormData();
        const imagefile = this.dataURLtoFile(dataUrl, this.props.link.replace("/static/images/", ""));
        formData.append("file", imagefile);


        fetch("http://localhost:8081/pred_image", {
            method: 'POST',
            body: formData
        })
            .then((res) => {
                this.props.setLoading(false);
                if (res.status === 200) {
                    return res;
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
            .then(res => res.json())
            .then((polgyons_list) => {
                    console.log(polgyons_list)
                    polgyons_list.map(polgyon => {
                        const cur_polies = polgyon
                        // const cur_polies = polgyon.map(points => points.map(p => p * 0.6))
                        // const points_list = cur_polies.map(points => new Point(...points));

                        const x1 = polgyon[0][0]
                        const y1 = polgyon[0][1]

                        const y2 = polgyon[1][1]
                        const x2 = polgyon[3][0]

                        this.draw(x1, y1, x2 - x1, y2 - y1)
                    });
                    this.props.setLoading(false)
                }
            )
            .catch(err => {
                this.props.setLoading(false);
                console.error(err)
            });

    }

    componentDidMount() {
        this.img = new Image();
        this.img.crossOrigin = 'anonymous';
        this.img.src = this.props.link;
        const canvas = document.getElementById('canvas');

        const ctx = canvas.getContext('2d');
        this.img.onload = () => {
            this.setState({
                dimensions: {
                    height: this.img.naturalHeight,
                    width: this.img.naturalWidth
                }
            }, () => {
                ctx.drawImage(this.img, 0, 0);
                this.draw_recactangles()
            });
        };
    }

    render() {
        return (
            <div style={{display: "flex", position: "relative"}}>
                <canvas id="canvas" width={this.state.dimensions.width} height={this.state.dimensions.height}
                        style={{overflow: "scroll"}}></canvas>
            </div>
        )
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Canvas);