import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import dummyMessageHistory from "./dummyMessageHistory";
import FriendStore from "./FriendStore";
import UserStore from "./UserStore";


class ChatStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        this.isOpen = true;
        this.imageUrl = "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png";
        this.allChats = [
          {
          partner: "noName",
          imageUrl: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
          messageList: dummyMessageHistory,
          newMessagesCount: 1
          }
        ];
        this.currentChat = this.allChats[0];
    }

    getIsOpen(){
      return this.isOpen;
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
        for(var i = 0; i < this.allChats.length; i++){
          if(this.allChats[i].partner === partner)
            this.currentChat = this.allChats[i];
        }
        //this.currentChat.partner = partner;
        //this.currentChat.imageUrl = partnerUrl;
        //$( #chatwindow ).click(function(){
        //}
        //this.isOpen = true;
        this.emit("change");
        this.emit("click");
    }

    getPartner(members, me) {
      for (var index in members) {
          var member = members[index];
          if (member != me) {
            return member;
          }
      }
    }

    decodeMessageList(messageList, me) {
        for (var index in messageList) {
            var message = messageList[index];
            console.log("Message author is: " + message.author)
            if (message.author == me) {
                message.author = "me";
            } else {
                message.author = "them";
            }
        }
        return messageList;
    }

    loadConversations(conversations) {
        var me = UserStore.getUsername();
        console.log("in store, load conversations. Me is: " + me)
        for (var index in conversations) {
            var conversation = conversations[index];
            var newConversation = {};
            var members = conversation.members;
            var messageList = conversation.messageList;
            console.log("messageList from chat server was this long: " + messageList.length)

            var partner = this.getPartner(members, me);
            console.log("getPartner returned: " + partner)
            newConversation.partner = partner;
            newConversation.messageList = messageList;
            for(var i = 0; i < messageList.length; i++){
              console.log("Loaded message: " + messageList[i].data.text + " , author: " + messageList[i].author);
            }
            //newConversation.messageList = this.decodeMessageList(messageList, me);
            newConversation.imageUrl = this.imageUrl // use dummy data for now...
            //console.log("DECODED messageList from chat server was this long: " + newConversation.messageList.length)
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
        for(var i = 0; i < messageList.length; i++){
          console.log("message number " + i + ": " + messageList[i].data.text + " author: " + messageList[i].author)
        }

        for (var index in this.allChats) {
            if (this.allChats[index].partner === from) {
                //this.allChats[index].messageList = this.decodeMessageList(messageList, UserStore.getUsername());
                this.allChats[index].messageList = messageList;

            }
        }
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
