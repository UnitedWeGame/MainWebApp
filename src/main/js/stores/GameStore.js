import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import UserStore from "./UserStore";

class GameStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        this.game = {
          title: "Title Not Found",
          firstReleaseDate: "Release Date Not Found",
          userRating: 0,
          communityRating: "No rating found",
          communityRatingCount: "",
          summary: "Game summary not found",
          usersReview: false,
          otherReviews: "No reviews for this game",
          friendsWhoOwn: "No friends own this game",
          screenshots: [{id: 0, url: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/me0xfxmsvrqihgrfxh9r.jpg"},
           {id: 1, url: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/cjg7nanyb1vxzzq1ki9q.jpg"},
           {id: 2, url: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/ka2i4aehuuibfecyaphh.jpg"}]
        };

    }

    getGame(){
      return this.game;
    }

    setGame(gameInfo){
      if(gameInfo.title){
        this.game.title = gameInfo.title;
      }

      //console.log("number of screenshots: " + gameInfo.screenshots.length)
      if(gameInfo.screenshots.length > 0){
        this.game.screenshots = gameInfo.screenshots;
      }
      else
        this.game.screenshots = [{id: 0, url: "https://i.imgur.com/mACD6Ea.jpg"}]

      if(gameInfo.firstReleaseDate){
        this.game.firstReleaseDate = gameInfo.firstReleaseDate;
      }
      if(gameInfo.userRating){
        this.game.userRating = gameInfo.userRating;
      }
      if(gameInfo.totalRating){
        this.game.communityRating = gameInfo.totalRating;
      }
      if(gameInfo.totalRatingCount){
        this.game.communityRatingCount = gameInfo.totalRatingCount;
      }
      if(gameInfo.summary){
        this.game.summary = gameInfo.summary;
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
