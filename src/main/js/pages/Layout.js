import React from "react";
import { Link } from "react-router";

import Nav from "../components/layout/Nav";
import OnlineNow from "../components/status/OnlineNow";
import NowPlaying from "../components/status/NowPlaying";
import {Launcher} from "react-chat-window";



export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
          messageList: [],
          newMessagesCount: 0,
          isOpen: false
        };
      }

      onMessageWasSent(message) {
        this.setState({
          messageList: [...this.state.messageList, message]
        })
      }

      sendMessage(text) {
        if (text.length > 0) {
          const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1
          this.setState({
            newMessagesCount: newMessagesCount,
            messageList: [...this.state.messageList, {
              author: 'them',
              type: 'text',
              data: { text }
            }]
          })
        }
      }

      handleClick() {
        this.setState({
          isOpen: !this.state.isOpen,
          newMessagesCount: 0
        })
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

        return (
            <div style={entirePageStyle}>

                <Nav location={location} />

                <div style={chatStyle}>
                  <Launcher
                      agentProfile={{
                        teamName: 'react-live-chat',
                        imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                      }}
                      onMessageWasSent={this.onMessageWasSent.bind(this)}
                      messageList={this.state.messageList}
                      newMessagesCount={this.state.newMessagesCount}
                      handleClick={this.handleClick.bind(this)}
                      isOpen={this.state.isOpen}
                  />
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
            </div>

        );
    }
}
