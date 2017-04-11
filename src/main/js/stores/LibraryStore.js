import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class LibraryStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        //this.test = [];
        this.games = [
            {
                "url": "http://images.igdb.com/igdb/image/upload/t_cover_big/l3n0zuklmgkloi1udslt.png",
                "id": "123",
                "title": "Mass Effect"
            },
            {
                "url": "http://images.igdb.com/igdb/image/upload/t_cover_big/jk9el4ksl4c7qwaex2y5.png",
                "id": "1234",
                "title": "Zelda"
            }
        ];

        // fetch('/Friends.json')
        //     .then(function(response) {
        //         return response.json();
        //     }).then(function(json) {
        //     component.test = json;
        //     component.emit("change");
        // });
        // console.log("test: " + test);
    }

    getAll(){
        return this.games;
    }

}
const libraryStore = new LibraryStore();
//dispatcher.register(friendStore.handleActions.bind(friendStore));
export default libraryStore;
