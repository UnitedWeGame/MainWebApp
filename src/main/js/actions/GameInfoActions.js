import dispatcher from "../dispatcher";

// Retrieves information for a game from our database.
// Section refers to which tab of the game page should be displayed to the user
export function getGameInfo(gameId, section){
    // if section was not provided, set it to 0
    section = (typeof section !== 'undefined') ?  section : 0;

    $.get( "/api/games/" + gameId, function( data ) {
        dispatcher.dispatch({
                type: "GET_GAME_INFO",
                gameInfo: data,
                tabIndex: section
            });
    });

    getFriendsWhoOwn(gameId);
}

/* Posts a new game rating (1-5) to our server */
export function postRating(id, rating){
    var data = {"rating": rating};
    // Currently does nothing ...
}

/* Posts a game review to our server */
export function postGameReview(id, reviewTitle, review, rating){
    $.ajax({
       url: "/api/games/" + id + "/addRating",
       type:"POST",
       data: JSON.stringify(
         {
           "rating": rating,
           "reviewTitle": reviewTitle,
           "review": review
          }
       ),
       contentType:"application/json; charset=utf-8",
       dataType:"json",
       success: function(response ){
         console.log("Response after posting new game review:" + response);
       }
    })

    dispatcher.dispatch({
                type: "NEW_GAME_REVIEW",
                headline: reviewTitle,
                review: review,
                rating: rating
            });
}

// Returns a list of friends who own a particular game
export function getFriendsWhoOwn(gameId){
  console.log("getFriendsWhoOwn action was called!")
  $.get( "/api/games/" + gameId + "/friendsOwn", function( data ) {
      dispatcher.dispatch({
              type: "GET_FRIENDS_WHO_OWN",
              friends: data
          });
  });
}
