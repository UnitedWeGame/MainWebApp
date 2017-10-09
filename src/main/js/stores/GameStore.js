import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import UserStore from "./UserStore";

class GameStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
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
          friendReviews: [
            {
              userID: 2222,
              username: "kelpaso",
              rating: 4,
              headline: "One of the best games this year",
              review: "There are so many things I love about this game. First, the graphics are just incredible. Way better than the last edition. And the multiplayer has gotten really really good."
            },
            {
              userID: 4444,
              username: "n00bPwn3r",
              rating: 2.5,
              headline: "Meh...",
              review: "I was pretty disappointed with this one. I had high expectations after the last release, but I just can't stand multiplayer."
            },
            {
              userID: 5555,
              username: "Salty17",
              rating: 4.5,
              headline: "Everything I wanted",
              review: "Finally. I had been waiting for ages for this game to come out and it did not disappoint. The storyline is amazing. I've been playing this for two weeks straight."
            }
          ],
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

      //console.log("number of screenshots: " + gameInfo.screenshots.length)
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
        console.log("got my review from the server")
      }
      else{
        Object.assign(this.game.myReview, this.myDefaultReview);
        console.log("using my default review...\nreview: " + this.game.myReview.title)
      }


      if(gameInfo.otherReviews){
        this.game.otherReviews = gameInfo.otherReviews;
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

      console.log("game store updated with new review:\nheadline: " + 
        headline + "\nreview: " + review + "\nrating" + rating);
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
