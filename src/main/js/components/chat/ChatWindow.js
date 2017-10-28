import React from "react";
import {Launcher} from "react-chat-window";


export default class ChatWindow extends React.Component {
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

          return (
            <div>
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
          );
      }
}
