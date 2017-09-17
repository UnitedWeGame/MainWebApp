import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class FriendStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        this.allFriends = [];
        this.friendsPlayingNow = [];


    }

    getAll(){
        return this.allFriends;
    }

    getPlayingNow(){
        return this.friendsPlayingNow;
    }

    setAll(friends){
        console.log("IN THE SET ALL FUNCTION");
        console.log(friends);

        this.allFriends = friends;
        this.emit("change");
    }

    setPlayingNow(friendsPlayingNow){
        this.friendsPlayingNow = friendsPlayingNow;
        this.emit("change");
    }

    removeFriend(friendId){
      for(var i = this.allFriends.length-1; i>=0; i--) {
        if( this.allFriends[i].id == friendId)
          this.allFriends.splice(i,1);
      }

      for(var i = this.friendsPlayingNow.length-1; i>=0; i--) {
        if( this.friendsPlayingNow[i].id == friendId)
          this.friendsPlayingNow.splice(i,1);
      }

      this.emit("change");
    }

    handleActions(action){
        switch (action.type) {
            case "GET_ALL_FRIENDS_DATA": {
                this.setAll(action.friends);
                console.log(" IN THE HANDLE ACTIONS FUNCTION");
                break;
            }
            case "UPDATE_NOW_PLAYING":{
                this.setPlayingNow(action.friends);
                break;
            }
            case "REMOVE_FRIEND": {
                this.removeFriend(action.friendId);
                break;
            }
        }
    }

}
const friendStore = new FriendStore();
dispatcher.register(friendStore.handleActions.bind(friendStore));
export default friendStore;
