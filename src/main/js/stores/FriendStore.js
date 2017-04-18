import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class FriendStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        //this.friends = [];
        this.friends = [
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

        // fetch('/Friends.json')
        //     .then(function(response) {
        //         return response.json();
        //     }).then(function(json) {
        //     component.friends = json;
        //     component.emit("change");
        // });
    }

    getAll(){
        return this.friends;
    }

}
const friendStore = new FriendStore();
//dispatcher.register(friendStore.handleActions.bind(friendStore));
export default friendStore;
