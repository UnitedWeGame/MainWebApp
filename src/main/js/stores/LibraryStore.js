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
    initOwnedGames(games, platform){
        this.allOwnedGames = games;

        if(platform == "PS3" || platform == "PS4")
          this.setPlaystationGames();
        else if(platform == "Steam")
          this.setSteamGames();
        else
          this.setXboxGames();
    }


    setXboxGames(){
        this.shownGames = [];
        var games = this.allOwnedGames;
        for(var i = 0; i < games.length; i++){

            if(games[i].platform.title == "Xbox360"
                || games[i].platform.title == "XboxLive"
                || games[i].platform.title == "XboxOne"){
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
                this.initOwnedGames(action.user.games, action.platform);
                break;
            }
            case "SHOW_XBOX_GAMES": {
                this.setXboxGames();
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
