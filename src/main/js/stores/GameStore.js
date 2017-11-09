import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import UserStore from "./UserStore";

/* Information pertaining to a particular game */
class GameStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        // Initialize
        this.game = {
          id: 0,
          title: "Title Not Found",
          firstReleaseDate: "Release Date Not Found",
          myRating: 4,
          communityRating: "No rating found",
          communityRatingCount: "",
          summary: "Game summary not found",
          platforms: "",
          myReview: {
            title: "Sweet game!",
            review: "This is one of my favorite games. Great for multiplayer, but also fun playing solo. At first I was a little hesitant to buy because of the big price tag. But I'm glad I did!"
          },
          friendReviews: [],
          friendsWhoOwn: "No friends own this game",
          screenshots: [{id: 0, url: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/me0xfxmsvrqihgrfxh9r.jpg"},
           {id: 1, url: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/cjg7nanyb1vxzzq1ki9q.jpg"},
           {id: 2, url: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/ka2i4aehuuibfecyaphh.jpg"}]
        };

        this.myDefaultReview = {
            title: "Sweet game!",
            review: "This is one of my favorite games. Great for multiplayer, but also fun playing solo. At first I was a little hesitant to buy because of the big price tag. But I'm glad I did!"
        };
        this.myDefaultRating = 4;

    }

    getGame(){
      return this.game;
    }

    setGame(gameInfo){
      this.game.id = gameInfo.id;

      if(gameInfo.title){
        this.game.title = gameInfo.title;
      }
      console.log(gameInfo.title + " has id of: " + this.game.id)

      if(gameInfo.screenshots.length > 0){
        this.game.screenshots = gameInfo.screenshots;
      }
      else
        this.game.screenshots = [{id: 0, url: "https://i.imgur.com/mACD6Ea.jpg"}]

      if(gameInfo.firstReleaseDate){
        this.game.firstReleaseDate = gameInfo.firstReleaseDate;
      }

      if(gameInfo.myRating){
        this.game.myRating = gameInfo.myRating;
      }
      else
        this.game.myRating = this.myDefaultRating;


      if(gameInfo.totalRating){
        this.game.communityRating = gameInfo.totalRating;
      }
      if(gameInfo.totalRatingCount){
        this.game.communityRatingCount = gameInfo.totalRatingCount;
      }
      if(gameInfo.summary){
        this.game.summary = gameInfo.summary;
      }

      if(gameInfo.myReview){
        this.game.myReview = gameInfo.myReview;
      }
      else{
        Object.assign(this.game.myReview, this.myDefaultReview);
      }

      if(gameInfo.friendsRatings){
        this.game.friendReviews = gameInfo.friendsRatings;
        console.log("a friend review looks like this: " + gameInfo.friendsRatings[0])
      }
      if(gameInfo.friendsWhoOwn){
        this.game.friendsWhoOwn = gameInfo.friendsWhoOwn;
      }


        this.emit("change");
    }

    handleNewReview(headline, review, rating){
      this.game.myReview.title = headline;
      this.game.myReview.review = review;
      this.game.myRating = rating;

      this.emit("change");
    }


    handleActions(action){
        switch (action.type) {
            case "GET_GAME_INFO": {
                this.setGame(action.gameInfo);
                break;
            }
            case "NEW_GAME_REVIEW": {
                this.handleNewReview(action.headline, action.review, action.rating);
                break;
            }
        }
    }

}
const gameStore = new GameStore();
dispatcher.register(gameStore.handleActions.bind(gameStore));
export default gameStore;
