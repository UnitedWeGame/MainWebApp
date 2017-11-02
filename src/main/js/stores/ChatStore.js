import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import dummyMessageHistory from "./dummyMessageHistory";
import FriendStore from "./FriendStore";


class ChatStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        this.isOpen = true;
        this.currentChat = {
          partners: ["logangster"],
          imageUrl: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
          messageList: dummyMessageHistory,
          newMessagesCount: 1
        }
        this.allChats = []
    }

    getIsOpen(){
      return this.isOpen;
    }

    getCurrentChat(){
      return this.currentChat;
    }

    getCurrentPartners(){
      return this.currentChat.partners;
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
        this.currentChat.partners = partner;
        this.currentChat.imageUrl = partnerUrl;
        this.isOpen = true;
        this.emit("change");
    }

    handleActions(action){
        switch (action.type) {
            case "START_SOLO_CHAT": {
                this.startSoloChat(action.partner, action.partnerImg);
                break;
            }
        }
    }

}

const chatStore = new ChatStore();
dispatcher.register(chatStore.handleActions.bind(chatStore));
export default chatStore;
