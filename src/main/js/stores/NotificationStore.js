import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class NotificationStore extends EventEmitter{
    constructor(){
        super();

        this.notifications = [
          {id: 1, user: "MarioMaster", verb: "wants to be friends!", type: "friendRequest", imageUrl: "http://images.igdb.com/igdb/image/upload/t_micro/l3n0zuklmgkloi1udslt.png"},
          {id: 2, user: "Game4Life", verb: "wants to be friends!", type: "friendRequest", imageUrl: "https://images.igdb.com/igdb/image/upload/t_micro/scutr4p9gytl4txb2soy.jpg"}
        ];
    }



    getNotifications(){
        return this.notifications;
    }

    getNotificationCount(){
        return this.notifications.length;
    }

    removeNotification(id){
      for(var i = this.notifications.length-1; i>=0; i--) {
        if( this.notifications[i].id == id)
          this.notifications.splice(i,1);
      }

      this.emit("change");
    }

    updateFriendRequests(friendRequests){
      for(var i = 0; i < friendRequests.length; i++){
        var request = friendRequests[i]
        if(!notificationListContains(request)){
          var notification = {};
          notification.id = request.id;
          notification.type = "friendRequest";
          notification.user = request.ownerUsername;
          notification.imageUrl = request.ownerImageUrl;
          notification.verb = "wants to be friends!";
          this.notifications.unshift(notification); // add to the front of array
        }
      }
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

    handleActions(action){
        switch (action.type) {
            case "FRIEND_REQUEST_RECEIVED": {
                this.updateFriendRequests(action.friendRequests);
                break;
            }
        }
    }
}
const notificationStore = new NotificationStore();
dispatcher.register(notificationStore.handleActions.bind(notificationStore));
export default notificationStore;
