import React from "react";
import { Link } from "react-router";

import Nav from "../components/layout/Nav";
import OnlineNow from "../components/status/OnlineNow";
import NowPlaying from "../components/status/NowPlaying";


export default class Layout extends React.Component {
    render() {
        const { location } = this.props;
        const entirePageStyle = {
            background: "url('http://cdn.wccftech.com/wp-content/uploads/2016/07/the-legend-of-zelda-breath-of-the-wild-horizon.jpg')",
            backgroundSize: "cover",
            webkitBackgroundSize: "cover",
            mozBackgroundSize: "cover",
            oBackgroundSize: "cover",
            paddingBottom: "200px"

        };

        const containerStyle = {
            marginTop: "60px",
            marginLeft: "10px",
        };

        const sideStatusPanel = {
            backgroundColor: "#272A2F",
            paddingTop: "5px"
        };

        console.log("layout");
        return (
            <div style={entirePageStyle}>

                <Nav location={location} />

                <div class="container" style={containerStyle}>
                    <div class="row">

                        <div class="col-md-4">
                            <div style={sideStatusPanel}>
                                <h2 class="text-center">Playing Now</h2>
                                <NowPlaying/>
                            </div>

                            <br/><br/>

                            <div style={sideStatusPanel}>
                                <h2 class="text-center">Online Now</h2>
                                <OnlineNow/>
                            </div>

                        </div>

                        <div class="col-md-1">
                        </div>

                        <div class="col-md-7">
                                {this.props.children}
                        </div>
                        

                     </div>
                </div>
            </div>

        );
    }
}
