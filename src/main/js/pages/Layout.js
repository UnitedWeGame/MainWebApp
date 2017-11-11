import React from "react";
import { Link } from "react-router";

import NavBar from "../components/layout/NavBar";
import OnlineNow from "../components/status/OnlineNow";
import NowPlaying from "../components/status/NowPlaying";
import ChatWindow from "../components/chat/ChatWindow";
import Alert from "react-s-alert";

export default class Layout extends React.Component {
    constructor() {
        super();
      }

    render() {
        const { location } = this.props;
        const entirePageStyle = {
            background: "url('http://cdn.wccftech.com/wp-content/uploads/2016/07/the-legend-of-zelda-breath-of-the-wild-horizon.jpg')",
            backgroundSize: "cover",
            paddingBottom: "300px",
        };

        const chatStyle = {
          zIndex: "1000000",
          position: "relative"
        };

        const containerStyle = {
            marginTop: "60px",
            marginLeft: "10px",
        };

        const sideStatusPanel = {
            backgroundColor: "#272A2F",
            paddingTop: "5px"
        };

        const navStyle = {
            width: "100%"
        };

        return (
            <div style={entirePageStyle}>

                <NavBar style={navStyle}location={location} />

                <div style={chatStyle}>
                  <ChatWindow />
                </div>

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

                <Alert
                  stack={{limit: 3}}
                  effect="slide"
                  position="top-right"
                  timeout={3000}
                />
            </div>

        );
    }
}
