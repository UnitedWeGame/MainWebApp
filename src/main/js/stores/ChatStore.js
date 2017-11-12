import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import dummyMessageHistory from "./dummyMessageHistory";
import FriendStore from "./FriendStore";
import UserStore from "./UserStore";


class ChatStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        this.isOpen = false;
        this.imageUrl = "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png";
        this.allChats = [
          {
          partner: "noName",
          imageUrl: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
          messageList: dummyMessageHistory,
          newMessagesCount: 0
          }
        ];
        this.currentChat = this.allChats[0];
    }

    getIsOpen(){
      return this.isOpen;
    }

    toggleIsOpen(){
      this.isOpen = !this.isOpen;
    }

    getCurrentChat(){
      return this.currentChat;
    }

    getCurrentPartner(){
      return this.currentChat.partner;
    }

    getCurrentChatImgUrl(){
      return this.currentChat.imageUrl;
    }

    getCurrentMessageList(){
      return this.currentChat.messageList;
    }

    getCurrentNewMessagesCount(){
      return this.currentChat.newMessagesCount;
    }

    startSoloChat(partner, partnerUrl){
        // Find the chat and set it to the current chat
        for(var i = 0; i < this.allChats.length; i++){
          if(this.allChats[i].partner === partner){
            this.currentChat = this.allChats[i];
            break;
          }
        }
        //this.currentChat.partner = partner;
        this.currentChat.imageUrl = partnerUrl;

        this.isOpen = true;
        this.emit("change");
    }

    getPartner(members, me) {
      for (var index in members) {
          var member = members[index];
          if (member != me) {
            return member;
          }
      }
    }

    loadConversations(conversations) {
        var me = UserStore.getUsername();
        for (var index in conversations) {
            var conversation = conversations[index];
            var newConversation = {};
            var members = conversation.members;
            var messageList = conversation.messageList;

            var partner = this.getPartner(members, me);
            newConversation.partner = partner;
            newConversation.messageList = messageList;
            newConversation.newMessagesCount = 0;

            newConversation.imageUrl = this.imageUrl // use dummy data for now...
            this.allChats.push(newConversation)
        }
        this.currentChat = this.allChats[this.allChats.length-1]

        this.emit("change")
    }

    updateMessageList(messageList) {
        this.currentChat.messageList = messageList;
        this.emit("change")
    }

    receiveMessage(messageList, from) {
        console.log("Inside receiveMessage, messageList length: " + messageList.length)
        for (var index in this.allChats) {
            if (this.allChats[index].partner === from) {
                this.allChats[index].messageList = messageList;
            }
        }
        if(this.currentChat.partner === from && !this.isOpen)
          this.currentChat.newMessagesCount++;
        this.emit("change");
    }

    handleActions(action){
        switch (action.type) {
            case "START_SOLO_CHAT": {
                this.startSoloChat(action.partner, action.partnerImg);
                break;
            }
            case "LOAD_CONVERSATIONS": {
                this.loadConversations(action.conversations);
                break;
            }
            case "WRITE_MESSAGE": {
                this.updateMessageList(action.messageList);
                break;
            }
            case "RECEIVE_MESSAGE": {
                this.receiveMessage(action.messageList, action.from);
                break;
            }
        }
    }

}

const chatStore = new ChatStore();
dispatcher.register(chatStore.handleActions.bind(chatStore));
export default chatStore;
