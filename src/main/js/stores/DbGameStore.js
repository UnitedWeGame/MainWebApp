import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class DbGameStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        this.allGames = {};
    }

    getAll(){
        return this.allGames;
    }

    // called when user wants to add a game to library
    // these are all the games in our database, including those unowned by user
    setAllGames(games){
      this.allGames.PS3 = [];
      this.allGames.PS4 = [];
      this.allGames.Steam = [];
      this.allGames.XBox360 = [];
      this.allGames.XBoxOne = [];

      for(var i = 0; i < games.length; i++){

          if(games[i].platform.title == "PS3")
              this.allGames.PS3.push(games[i]);
          if(games[i].platform.title == "PS4")
              this.allGames.PS4.push(games[i]);
          if(games[i].platform.title == "Steam")
              this.allGames.Steam.push(games[i]);
          if(games[i].platform.title == "Xbox 360")
              this.allGames.XBox360.push(games[i]);
          if(games[i].platform.title == "Xbox One")
              this.allGames.XBoxOne.push(games[i]);

      }

      this.emit("change");

    }

    handleActions(action){
        switch (action.type) {
            case "GET_ALL_GAMES": {
                this.setAllGames(action.games);
                break;
            }
        }
    }

}
const dbGameStore = new DbGameStore();
dispatcher.register(dbGameStore.handleActions.bind(dbGameStore));
export default dbGameStore;
