import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import ChatStore from "./ChatStore";
import FriendStore from "./FriendStore";


class NotificationStore extends EventEmitter{
    constructor(){
        super();

        this.notifications = [
          {id: 98, user: "MarioMaster", verb: "wants to be friends!", type: "friendRequest", imageUrl: "http://images.igdb.com/igdb/image/upload/t_micro/l3n0zuklmgkloi1udslt.png"},
          {id: 99, user: "Game4Life", verb: "wants to be friends!", type: "friendRequest", imageUrl: "https://images.igdb.com/igdb/image/upload/t_micro/scutr4p9gytl4txb2soy.jpg"}
        ];

        this.latestHeadline = this.notifications.length + " new notifications";
    }

    getNotifications(){
        return this.notifications;
    }

    getNotificationCount(){
        return this.notifications.length;
    }

    getHeadline(){
      return this.latestHeadline;
    }

    removeNotification(id){
      for(var i = this.notifications.length-1; i>=0; i--) {
        if( this.notifications[i].id == id)
          this.notifications.splice(i,1);
      }
      this.latestHeadline = this.notifications.length + " new notifications";
      this.emit("change");
    }

    // returns true if the friend request is already in the notification list
    notificationListContains(friendRequest){
      var containsRequest = false;
      const notifications = this.notifications
      for(var i = 0; i < notifications.length; i++){
        if(notifications[i].id == friendRequest.id)
          containsRequest = true;
      }
      return containsRequest;
    }

    updateFriendRequests(friendRequests){
      var listChanged = false;
      for(var i = 0; i < friendRequests.length; i++){
        var request = friendRequests[i]
        if(!this.notificationListContains(request)){
          var notification = {};
          notification.id = request.id;
          notification.type = "friendRequest";
          notification.user = request.ownerUsername;
          notification.imageUrl = request.ownerImageUrl;
          notification.verb = "wants to be friends!";
          this.notifications.unshift(notification); // add to the front of array
          listChanged = true;
        }
      }
      if(listChanged){
        this.latestHeadline = this.notifications.length + " new notifications";
        this.emit("change");
      }
    }

    addMsgToNotifications(from){
      console.log("from: " + from)
      if(ChatStore.currentChat.partner == from)
        return;
      var notification = {};
      notification.id = this.notifications.length;
      notification.type = "newMessage";
      notification.user = from;
      notification.verb = "sent you a message!";
      this.notifications.unshift(notification); // add to the front of array
      this.latestHeadline = "New message from "  + from;
      this.emit("change");
    }

    removeMsgNotification(partner){
      console.log("Notifications are this long:" + this.notifications.length);
      for(var i = this.notifications.length-1; i>=0; i--) {
        if(
          this.notifications[i].type === "newMessage" &&
          this.notifications[i].user === partner
        )
        this.notifications.splice(i,1);
      }
      this.latestHeadline = this.notifications.length + " new notifications";
      this.emit("change");
    }

    /*
       When a user opens a chat window or changes their chat window,
       we want to remove any unread message notifications for their new chat partner
    */
    removeMsgNotificationAfterWait(partner){
      // wait a brief period to allow ChatStore to update .currentChat
      setTimeout(() => this.removeMsgNotification(partner), 1000);
    }


    handleActions(action){
        switch (action.type) {
            case "FRIEND_REQUEST_RECEIVED": {
                this.updateFriendRequests(action.friendRequests);
                break;
            }
            case "RECEIVE_MESSAGE": {
                this.addMsgToNotifications(action.from);
                break;
            }
            case "START_SOLO_CHAT": {
                this.removeMsgNotificationAfterWait(action.partner);
                break;
            }
        }
    }
}
const notificationStore = new NotificationStore();
dispatcher.register(notificationStore.handleActions.bind(notificationStore));
export default notificationStore;
