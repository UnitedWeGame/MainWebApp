import React from "react";
import { Link } from "react-router";

import Nav from "../components/layout/Nav";


export default class LayoutNoSideStatus extends React.Component {
    render() {
        const { location } = this.props;

        const entirePageStyle = {
            paddingBottom: "200px"
        };

        const containerStyle = {
            marginTop: "60px",
            marginLeft: "10px",
        };

        return (
            <div style={entirePageStyle}>

                <Nav location={location} />

                <div class="container" style={containerStyle}>
                    <div class="row">

                        <div class="col-md-12">
                              {this.props.children}
                        </div>

                     </div>
                </div>
            </div>

        );
    }
}
