import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class PostStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        //this.friends = [];
        this.posts = [
            {
                "gamerTag": "weetermachine",
                "ID": "123",
                "game": "Donkey Kong Country",
                "platform": "Super Nintendo"
            },
            {
                "gamerTag": "logangsta",
                "ID": "124",
                "game": "Snake",
                "platform": "TI-89"
            },
            {
                "gamerTag": "jacksonHenriettaMurphysGamerTag",
                "ID": "125",
                "game": "Mario 64",
                "platform": "You should know this"
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
        return this.posts;
    }

}
//const friendStore = new FriendStore();
//dispatcher.register(friendStore.handleActions.bind(friendStore));
export default friendStore;