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
          myRating: 0,
          communityRating: "No rating found",
          communityRatingCount: "",
          summary: "Game summary not found",
          platforms: "",
          myReview: {
            title: "",
            review: ""
          },
          friendReviews: [],
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
      this.game.id = gameInfo.id;

      if(gameInfo.title)
        this.game.title = gameInfo.title;

      console.log(gameInfo.title + " has id of: " + this.game.id)

      if(gameInfo.screenshots.length > 0)
        this.game.screenshots = gameInfo.screenshots;
      else
        this.game.screenshots = [{id: 0, url: "https://i.imgur.com/mACD6Ea.jpg"}]

      if(gameInfo.firstReleaseDate)
        this.game.firstReleaseDate = gameInfo.firstReleaseDate;
      else
        this.game.firstReleaseDate = "No release date found."

      if(gameInfo.totalRating)
        this.game.communityRating = gameInfo.totalRating;
      else
        this.game.communityRating = "No community rating found."

      if(gameInfo.totalRatingCount)
        this.game.communityRatingCount = gameInfo.totalRatingCount;
      else
        this.game.communityRatingCount = 0

      if(gameInfo.summary)
        this.game.summary = gameInfo.summary;
      else
        this.game.summary = "No summary was found for this game.";

      if(gameInfo.myRating){
        this.game.myReview.title = gameInfo.myRating.reviewTitle;
        this.game.myReview.review = gameInfo.myRating.review;
        this.game.myRating = gameInfo.myRating.rating;
      }
      else {
        this.game.myReview.title = "";
        this.game.myReview.review = "";
        this.game.myRating = 0;
      }

      if(gameInfo.friendsRatings)
        this.game.friendReviews = gameInfo.friendsRatings;
      else
        this.game.friendReviews = [];

      if(gameInfo.friendsWhoOwn)
        this.game.friendsWhoOwn = gameInfo.friendsWhoOwn;
      else
        this.game.friendsWhoOwn = "No friends own this game.";


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
