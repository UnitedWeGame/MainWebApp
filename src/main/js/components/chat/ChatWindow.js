import React from "react";
import * as ChatActions from "../../actions/ChatActions";
import ChatStore from "../../stores/ChatStore";
import Launcher from "../../lib/reactChatWindow/src/components/Launcher";
import UserStore from "../../stores/UserStore";

// Note: react-chat-window CSS is imported in templates/users/index.html
//      from static/css/chatStyles

export default class ChatWindow extends React.Component {
    constructor() {
        super();
        this.updateCurrentChat = this.updateCurrentChat.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this.onMessageWasSent = this.onMessageWasSent.bind(this);
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
            ChatActions.loadAllConversations(allConversations);
        });
        socket.on('newMessage', function(messageInfo) {
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
        let messageListCopy = JSON.parse(JSON.stringify(messageList));
        ChatActions.sendMessage(messageListCopy, UserStore.getUsername(), this.state.partner);

      }

      _handleClick() {
        ChatStore.toggleIsOpen();
        ChatStore.setCurrentNewMessagesCount(0);
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
                  onMessageWasSent={this.onMessageWasSent}
                  messageList={this.state.messageList}
                  newMessagesCount={this.state.newMessagesCount}
                  handleClick={this._handleClick}
                  isOpen={this.state.isOpen}
              />
            </div>
          );
      }
}
