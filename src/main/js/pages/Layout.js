import React from "react";
import { Link } from "react-router";

import NavBar from "../components/layout/NavBar";
import OnlineNow from "../components/status/OnlineNow";
import NowPlaying from "../components/status/NowPlaying";
import ChatWindow from "../components/chat/ChatWindow";
import Alert from "react-s-alert";
import marioSound from "../../resources/static/sounds/mario1.WAV";
// Note: Alert CSS is imported in templates/users/index.html from
//      static/css/alertStyles


export default class Layout extends React.Component {
    constructor() {
        super();
        this.getRootPath = this.getRootPath.bind(this);
        this.backgroundUrls = [
           "http://cdn.wccftech.com/wp-content/uploads/2016/07/the-legend-of-zelda-breath-of-the-wild-horizon.jpg",
           "https://images3.alphacoders.com/114/114869.jpg",
           "http://deskbg.com/s3/wpp/5/5369/mass-effect-city-desktop-background.jpg"
        ];
    }

    // E.g. "/profile/4444" => "profile"
    getRootPath(pathname){
      if(pathname === "/") return "";
      var path = pathname.substring(1);
      var indexOfSlash = path.indexOf("/");
      if(indexOfSlash != -1)
        path = path.substring(0,indexOfSlash);
      return path;
    }
    
    getRandomBackgroundImage() {
    	var randomNumber = Math.floor(Math.random()*this.backgroundUrls.length);
    	return this.backgroundUrls[randomNumber];
    }


    render() {
        const { location } = this.props;

        // determine whether to show the sidebar containing online/playing statuses
        const pathname = this.props.location.pathname;
        var path = this.getRootPath(pathname);
        // NOTE: add new routes to this array if you want the sidebar to be shown
        const pagesShowingSidebar = ["", "activity", "friends", "library", "notifications",
            "settings", "groupSettings"];
        var showSidebar = false;
        if(pagesShowingSidebar.includes(path))
           showSidebar = true;

        var pageBackground = (showSidebar) ?
            "url('" + this.getRandomBackgroundImage() + "') no-repeat center center fixed" :
            "" ;

        const entirePageStyle = {
            background: pageBackground,
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


        const containerStyleNoSidebar = {
            marginTop: "20px",
            marginLeft: "10px",
        };

        return (
            <div style={entirePageStyle}>

                <NavBar style={navStyle} location={location} />

                <div style={chatStyle}>
                  <ChatWindow />
                </div>

                {showSidebar ? (

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
                ) : (

                  <div class="container" style={containerStyleNoSidebar}>
                      <div class="row">

                          <div class="col-md-12">
                                {this.props.children}
                          </div>

                       </div>
                  </div>
                )}

                <Alert
                  stack={{limit: 3}}
                  effect="slide"
                  position="top-right"
                  offset={60}
                  timeout={3000}
                  beep={marioSound}

                />
            </div>

        );
    }
}
