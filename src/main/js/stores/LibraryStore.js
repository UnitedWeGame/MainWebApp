import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import UserStore from "./UserStore";

class LibraryStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        this.shownGames = [];
        this.allOwnedGames = [];
        this.shownPlatform = "";

        // some non-games automatically pulled in with user's Xbox and Steam libraries.
        // Exclude them.
        this.nonGames = new Set();
        this.nonGames.add("Netflix").add("Xbox Home").add(
          "Amazon Instant Video").add("YouTube");

    }

    getAll(){
        return this.shownGames;
    }

    // Returns a string for the platform that this.shownGames are a part of
    getCurrentPlatform(){
        return this.shownPlatform;
    }

    // called when user logs in, and when user adds a game
    initOwnedGames(games, platform){
        for(var i = 0; i < games.length; i++){
          if(this.isNonGame(games[i].title))
            continue;
          this.allOwnedGames.push(games[i])
        }

        if(platform == "PS3" || platform == "PS4")
          this.setPlaystationGames();
        else if(platform == "Steam")
          this.setSteamGames();
        else
          this.setXboxGames();
    }

    // Returns true if gameTitle is something like "Amazon Instant Video", etc.
    isNonGame(gameTitle){
      if(this.nonGames.has(gameTitle))
        return true;
      else
        return false;
    }

    // removes a game from the user's library
    removeGame(gameId, platform){
      for(var i = this.allOwnedGames.length-1; i>=0; i--) {
        if(this.allOwnedGames[i].id === gameId){
          this.allOwnedGames.splice(i,1);
        }
      }

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

        this.shownPlatform = "Xbox";
        this.emit("change");
    }

    setSteamGames(){
        this.shownGames = [];
        var games = this.allOwnedGames;

        for(var i = 0; i < games.length; i++){
            if(games[i].platform.title == "Steam")
                this.shownGames.push(games[i]);
        }

        this.shownPlatform = "Steam";
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

        this.shownPlatform = "PS";
        this.emit("change");
    }

    handleActions(action){
        switch (action.type) {
            case "GET_CURRENT_USER_DATA": {
                this.initOwnedGames(action.user.games, action.platform);
                break;
            }
            case "REMOVE_GAME": {
                this.removeGame(action.gameId, action.platform);
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
