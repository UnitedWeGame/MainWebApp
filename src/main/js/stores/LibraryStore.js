import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import UserStore from "./UserStore";

class LibraryStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        this.games = [];
        //this.test = [];
        // this.games = [
        //     {
        //         "url": "http://images.igdb.com/igdb/image/upload/t_cover_big/kln2xrk7av3dzrt60auq.png",
        //         "id": "123",
        //         "title": "Mass Effect: Andromeda"
        //     },
        //     {
        //         "url": "http://images.igdb.com/igdb/image/upload/t_cover_big/m1qtsn4ehaen83bbp1ee.png",
        //         "id": "1234",
        //         "title": "Forza Motorsport 3"
        //     },
        //     {
        //         "url": "http://images.igdb.com/igdb/image/upload/t_cover_big/gy5jzbxk068kduoki6wx.png",
        //         "id": "125",
        //         "title": "Fallout 4: Nuka World"
        //     },
        //     {
        //         "url": "http://images.igdb.com/igdb/image/upload/t_cover_big/fhbeilnghyhhmjqhinqa.png",
        //         "id": "1236",
        //         "title": "Titanfall 2"
        //     }
        // ];

   
    }

    getAll(){
        return this.games;
    }

    setGames(games){
        this.games = games;
        this.emit("change");
    }


    handleActions(action){
        switch (action.type) {
            case "GET_USER_DATA": {
                this.setGames(action.user.games);
                break;
            }
        }
    }

}
const libraryStore = new LibraryStore();
dispatcher.register(libraryStore.handleActions.bind(libraryStore));
export default libraryStore;
