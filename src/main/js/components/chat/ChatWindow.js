import React from "react";
import {Launcher} from "react-chat-window";
import ChatStore from "../../stores/ChatStore";
import UserStore from "../../stores/UserStore";
import * as ChatActions from "../../actions/ChatActions";


export default class ChatWindow extends React.Component {
    constructor() {
        super();
        this.updateCurrentChat = this.updateCurrentChat.bind(this);
        this.setUsername = this.setUsername.bind(this);
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
            console.log(allConversations);
            ChatActions.loadAllConversations(allConversations);
        });
        socket.on('newMessage', function(messageInfo) {
            console.log("Received a message!")
            console.log("Message was from: " + messageInfo.from)
            console.log("Message list is this long: " + messageInfo.messageList.length)
            ChatActions.receiveMessage(messageInfo);
        });
      }

      componentWillMount(){
        ChatStore.on("change", this.updateCurrentChat);
        UserStore.on("change", this.setUsername);

      }

      componentWillUnmount(){
        ChatStore.removeListener("change", this.updateCurrentChat);
        UserStore.removeListener("change", this.setUsername);

      }

      setUsername(){
        socket.emit('loadConversations', UserStore.getUsername());
        this.setState({
          username: UserStore.getUsername()
        });
      }

      updateCurrentChat(){
        console.log("Update current chat called!")
        this.setState({
          isOpen: ChatStore.getIsOpen(),
          partner: ChatStore.getCurrentPartner(),
          chatImgUrl: ChatStore.getCurrentChatImgUrl(),
          messageList: ChatStore.getCurrentMessageList(),
          newMessagesCount: ChatStore.getCurrentNewMessagesCount()
        })
      }

      onMessageWasSent(message) {
        console.log("Before formatting message, this.state.messageList is: \n")
        for (var index in this.state.messageList){
          var message = this.state.messageList[index];
          console.log("Author: " + message.author);
        }
        var messageList = [...this.state.messageList, message]
        console.log("onMessageWasSent, author: " + message.author);
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
              author: 'me',
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
