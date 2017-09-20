import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class FriendStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        this.allFriends = [];
        this.friendsPlayingNow = [];
        this.suggestedFriends = [
          {id: 1010, username: "TheBeast", imageUrl: "http://images.igdb.com/igdb/image/upload/t_micro/l3n0zuklmgkloi1udslt.png"},
          {id: 1011, username: "Prince$$", imageUrl: "https://images.igdb.com/igdb/image/upload/t_micro/scutr4p9gytl4txb2soy.jpg"},
          {id: 1012, username: "PWNER99", imageUrl: "https://images.igdb.com/igdb/image/upload/t_micro/mjustxpafje74fzjbeuy.jpg"}
        ];


    }

    getAll(){
        return this.allFriends;
    }

    getPlayingNow(){
        return this.friendsPlayingNow;
    }

    getSuggestedFriends(){
        return this.suggestedFriends;
    }

    setAll(friends){
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
