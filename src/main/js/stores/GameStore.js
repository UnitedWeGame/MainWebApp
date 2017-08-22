import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import UserStore from "./UserStore";

class GameStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        this.game = {};
        this.game.title = "Title Not Found";
        this.game.releaseDate = "Release Date Not Found";
        this.game.userRating = 0;
        this.game.communityRating = "No rating found";
        this.game.gameSummary = "Game summary not found";
        this.game.usersReview = false;
        this.game.otherReviews = "No reviews for this game";
        this.game.friendsWhoOwn = "No friends own this game";

    }

    getGame(){
      return this.game;
    }

    setGame(gameInfo){
      if(gameInfo.title){
        this.game.title = gameInfo.title;
      }
      if(gameInfo.releaseDate){
        this.game.releaseDate = gameInfo.releaseDate;
      }
      if(gameInfo.userRating){
        this.game.userRating = gameInfo.userRating;
      }
      if(gameInfo.communityRating){
        this.game.communityRating = gameInfo.communityRating;
      }
      if(gameInfo.gameSummary){
        this.game.gameSummary = gameInfo.gameSummary;
      }
      if(gameInfo.usersReview){
        this.game.usersReview = gameInfo.usersReview;
      }
      if(gameInfo.otherReviews){
        this.game.otherReviews = gameInfo.otherReviews;
      }
      if(gameInfo.friendsWhoOwn){
        this.game.friendsWhoOwn = gameInfo.friendsWhoOwn;
      }


        this.emit("change");
    }




    handleActions(action){
        switch (action.type) {
            case "GET_GAME_INFO": {
                this.setGame(action.gameInfo);
                break;
            }
        }
    }

}
const GameStore = new GameStore();
dispatcher.register(gameStore.handleActions.bind(gameStore));
export default gameStore;
