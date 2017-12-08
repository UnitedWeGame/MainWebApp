import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import UserStore from "./UserStore";

/* Information pertaining to a particular game */
class GameStore extends EventEmitter{
    constructor(){
        super();
        var component = this;

        // Initialize member variables
        this.tabIndex = 0; // the game page tab to show

        // has properties: id, username, and profilePic
        this.friendsWhoOwn = [];

        this.game = {
          id: 0,
          title: "Loading...",
          firstReleaseDate: "Release Date Not Found",
          myRating: 0,
          communityRating: "No rating found",
          communityRatingCount: "",
          summary: "Game summary not found",
          platform: "",
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

    getTabIndex(){
      return this.tabIndex;
    }

    getFriendsWhoOwn(){
      return this.friendsWhoOwn;
    }

    setGame(gameInfo, tabIndex){
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

      if(gameInfo.userRating){
        this.game.myReview.title = gameInfo.userRating.reviewTitle;
        this.game.myReview.review = gameInfo.userRating.review;
        this.game.myRating = gameInfo.userRating.rating;
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

      if(gameInfo.platform.title)
        this.game.platform = gameInfo.platform.title;
      else
        this.game.platform = "Platform information cannot be found"

      if(gameInfo.summary)
        this.game.summary = gameInfo.summary;
      else
        this.game.summary = "No summary was found for this game.";

      if(gameInfo.totalRating)
        this.setCommunityRating(gameInfo.totalRating);
        //this.game.communityRating = gameInfo.totalRating;
      else
        this.game.communityRating = "No community rating found."

      if(gameInfo.totalRatingCount)
        this.game.communityRatingCount = gameInfo.totalRatingCount;
      else
        this.game.communityRatingCount = 0

      this.tabIndex = tabIndex;

        this.emit("change");
    }

    handleNewReview(headline, review, rating){
      this.game.myReview.title = headline;
      this.game.myReview.review = review;
      this.game.myRating = rating;
      this.tabIndex = 1; // show the reviews tab
      this.emit("change");
    }

    setFriendsWhoOwn(friends){
      this.friendsWhoOwn = [];
      for(var i = 0; i < friends.length; i++){
        var friend = {};
        friend.id = friends[i].id;
        friend.username = friends[i].username;
        friend.profilePic = friends[i].imageUrl;
        this.friendsWhoOwn.push(friend);
      }

      this.emit("change");
    }

    // Rounds the community rating (float) received from the server and sets it.
    setCommunityRating(rating){
      this.game.communityRating = "" + Math.round(rating) + "/100";
    }


    handleActions(action){
        switch (action.type) {
            case "GET_GAME_INFO": {
                this.setGame(action.gameInfo, action.tabIndex);
                break;
            }
            case "NEW_GAME_REVIEW": {
                this.handleNewReview(action.headline, action.review, action.rating);
                break;
            }
            case "GET_FRIENDS_WHO_OWN": {
                this.setFriendsWhoOwn(action.friends);
                break;
            }
        }
    }

}
const gameStore = new GameStore();
dispatcher.register(gameStore.handleActions.bind(gameStore));
export default gameStore;
