import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class FriendStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        //this.friends = [];
        this.friends = [
            {
                "login": "weetermachine",
                "ID": "123",
                "imageUrl": "http://images.igdb.com/igdb/image/upload/t_micro/l3n0zuklmgkloi1udslt.png"
            },
            {
                "login": "logangsta",
                "ID": "124",
                "imageUrl": "http://images.igdb.com/igdb/image/upload/t_micro/l3n0zuklmgkloi1udslt.png"
            },
            {
                "login": "jackson",
                "ID": "125",
                "imageUrl": "http://images.igdb.com/igdb/image/upload/t_micro/l3n0zuklmgkloi1udslt.png"
            },
            {
                "login": "frederick",
                "ID": "126",
                "imageUrl": "http://images.igdb.com/igdb/image/upload/t_micro/l3n0zuklmgkloi1udslt.png"
            },
            {
                "login": "RichardHead",
                "ID": "127",
                "imageUrl": "http://images.igdb.com/igdb/image/upload/t_micro/l3n0zuklmgkloi1udslt.png"
            },
            {
                "login": "racist12YearOld",
                "ID": "128",
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
