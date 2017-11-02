import React from "react";
import {Launcher} from "react-chat-window";
import ChatStore from"../../stores/ChatStore";


export default class ChatWindow extends React.Component {
    constructor() {
        super();
        this.updateCurrentChat = this.updateCurrentChat.bind(this);
        var isOpen = ChatStore.getIsOpen();
        var partners = ChatStore.getCurrentPartners()[0];
        var chatImgUrl = ChatStore.getCurrentChatImgUrl();
        var messageList = ChatStore.getCurrentMessageList();
        var newMessagesCount = ChatStore.getCurrentNewMessagesCount();


        this.state = {
          messageList: messageList,
          newMessagesCount: newMessagesCount,
          isOpen: isOpen,
          partners: partners,
          chatImgUrl: chatImgUrl
        };
      }

      componentWillMount(){
        ChatStore.on("change", this.updateCurrentChat);
      }

      componentWillUnmount(){
        ChatStore.removeListener("change", this.updateCurrentChat);
      }

      updateCurrentChat(){
        this.setState({
          isOpen: ChatStore.getIsOpen(),
          partners: ChatStore.getCurrentPartners(),
          chatImgUrl: ChatStore.getCurrentChatImgUrl(),
          messageList: ChatStore.getCurrentMessageList(),
          newMessagesCount: ChatStore.getCurrentNewMessagesCount()
        })
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
                    teamName: this.state.partners,
                    imageUrl: this.state.chatImgUrl
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
