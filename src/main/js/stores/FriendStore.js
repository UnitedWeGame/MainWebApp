import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class FriendStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        this.allFriends = [];
        this.friendsPlayingNow = [
            {
                "gamerTag": "weetermachine",
                "ID": "123",
                "game": "Donkey Kong Country",
                "platform": "Super Nintendo",
                "imageUrl": "http://images.igdb.com/igdb/image/upload/t_micro/l3n0zuklmgkloi1udslt.png"
            },
            {
                "gamerTag": "logangsta",
                "ID": "124",
                "game": "Snake",
                "platform": "TI-89",
                "imageUrl": "http://images.igdb.com/igdb/image/upload/t_micro/l3n0zuklmgkloi1udslt.png"
            },
            {
                "gamerTag": "jacksonHenriettaMurphysGamerTag",
                "ID": "125",
                "game": "Mario 64",
                "platform": "You should know this",
                "imageUrl": "http://images.igdb.com/igdb/image/upload/t_micro/l3n0zuklmgkloi1udslt.png"
            }
        ];

        
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
    }

    handleActions(action){
        switch (action.type) {
            case "GET_ALL_FRIENDS_DATA": {
                this.setAll(action.friends);
                console.log(" IN THE HANDLE ACTIONS FUNCTION");
                break;
            }
        }
    }

}
const friendStore = new FriendStore();
dispatcher.register(friendStore.handleActions.bind(friendStore));
export default friendStore;
