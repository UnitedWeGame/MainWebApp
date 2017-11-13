import React from "react";
import { Link } from "react-router";

import NavBar from "../components/layout/NavBar";


export default class LayoutNoSideStatus extends React.Component {
    render() {
        const { location } = this.props;

        const entirePageStyle = {
            paddingBottom: "200px"
        };

        const containerStyle = {
            marginTop: "20px",
            marginLeft: "10px",
        };

        return (
            <div style={entirePageStyle}>

                <NavBar location={location} />

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
