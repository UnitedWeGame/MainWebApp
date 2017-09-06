import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import UserStore from "./UserStore";

class LibraryStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        this.shownGames = [];
        this.allOwnedGames = [];

    }

    getAll(){
        return this.shownGames;
    }

    // called when user logs in
    initOwnedGames(games){
        this.allOwnedGames = games;
        this.setXBoxGames();
    }


    setXBoxGames(){
        this.shownGames = [];
        var games = this.allOwnedGames;
        for(var i = 0; i < games.length; i++){

            if(games[i].platform.title == "Xbox 360"
                || games[i].platform.title == "Xbox Live"
                || games[i].platform.title == "Xbox One"){
                this.shownGames.push(games[i]);
            }
        }

        this.emit("change");
    }

    setSteamGames(){
        this.shownGames = [];
        var games = this.allOwnedGames;

        for(var i = 0; i < games.length; i++){

            if(games[i].platform.title == "Steam")
                this.shownGames.push(games[i]);
        }

        this.emit("change");
    }

    setPlaystationGames(){
        this.shownGames = [];
        var games = this.allOwnedGames;

        for(var i = 0; i < games.length; i++){

            if(games[i].platform.title == "PS3"
                || games[i].platform.title == "PS4")
                this.shownGames.push(games[i]);
        }

        this.emit("change");
    }

    handleActions(action){
        switch (action.type) {
            case "GET_USER_DATA": {
                this.initOwnedGames(action.user.games);
                break;
            }
            case "SHOW_XBOX_GAMES": {
                this.setXBoxGames();
                break;
            }
            case "SHOW_STEAM_GAMES": {
                this.setSteamGames();
                break;
            }
            case "SHOW_PLAYSTATION_GAMES": {
                this.setPlaystationGames();
                break;
            }
        }
    }

}
const libraryStore = new LibraryStore();
dispatcher.register(libraryStore.handleActions.bind(libraryStore));
export default libraryStore;
