import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import UserStore from "./UserStore";

class GameStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        this.game = {
          title: "Title Not Found",
          releaseDate: "Release Date Not Found",
          userRating: 0,
          communityRating: "No rating found",
          gameSummary: "Game summary not found",
          usersReview: false,
          otherReviews: "No reviews for this game",
          friendsWhoOwn: "No friends own this game",
        };

        console.log("game store constructor was successful")

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
const gameStore = new GameStore();
dispatcher.register(gameStore.handleActions.bind(gameStore));
export default gameStore;
