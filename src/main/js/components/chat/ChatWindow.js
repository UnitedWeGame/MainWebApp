import React from "react";
import {Launcher} from "react-chat-window";
import ChatStore from "../../stores/ChatStore";
import UserStore from "../../stores/UserStore";
import * as ChatActions from "../../actions/ChatActions";
import { findDOMNode } from "react-dom";

export default class ChatWindow extends React.Component {
    constructor() {
        super();
        this.updateCurrentChat = this.updateCurrentChat.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.clickChatWindow = this.clickChatWindow.bind(this);
        var isOpen = ChatStore.getIsOpen();
        var partner = ChatStore.getCurrentPartner();
        var chatImgUrl = ChatStore.getCurrentChatImgUrl();
        var messageList = ChatStore.getCurrentMessageList();
        var newMessagesCount = ChatStore.getCurrentNewMessagesCount();
        const username = UserStore.getUsername();


        this.state = {
          messageList: messageList,
          newMessagesCount: newMessagesCount,
          isOpen: isOpen,
          partner: partner,
          chatImgUrl: chatImgUrl,
          username: username
        };


        socket.on('allConvos', function(allConversations) {
            ChatActions.loadAllConversations(allConversations);
        });
        socket.on('newMessage', function(messageInfo) {
            ChatActions.receiveMessage(messageInfo);
        });
      }

      componentWillMount(){
        ChatStore.on("change", this.updateCurrentChat);
        ChatStore.on("click", this.clickChatWindow)
        UserStore.on("change", this.setUsername);

      }

      componentWillUnmount(){
        ChatStore.removeListener("change", this.updateCurrentChat);
        ChatStore.removeListener("click", this.clickChatWindow)
        UserStore.removeListener("change", this.setUsername);

      }

      clickChatWindow(){
        console.log("In the clickChatWindow() !")
        const el = findDOMNode(this.refs.chatwindow);
        console.log("Eleement is : " + el);
        $(el).click();
      }

      setUsername(){
        socket.emit('loadConversations', UserStore.getUsername());
        this.setState({
          username: UserStore.getUsername()
        });
      }

      updateCurrentChat(){
        this.setState({
          isOpen: ChatStore.getIsOpen(),
          partner: ChatStore.getCurrentPartner(),
          chatImgUrl: ChatStore.getCurrentChatImgUrl(),
          messageList: ChatStore.getCurrentMessageList(),
          newMessagesCount: ChatStore.getCurrentNewMessagesCount()
        })
      }

      onMessageWasSent(message) {

        var messageList = [...this.state.messageList, message]
        this.setState({
          messageList: messageList
        });
        console.log("Message List IS EMPTY? " + messageList.length);
        let messageListCopy = JSON.parse(JSON.stringify(messageList));
        console.log("Message list copy is this long " + messageListCopy.length);
        ChatActions.sendMessage(messageListCopy, UserStore.getUsername(), this.state.partner);


      }

      _sendMessage(text) {
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
            <div ref="chatwindow">
              <Launcher
                  agentProfile={{
                    teamName: this.state.partner,
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
