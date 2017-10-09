import dispatcher from "../dispatcher";

export function postRating(id, rating){
    var data = {"rating": rating};
    $.post( "/api/games/" + id + "/addRating/", data, function( response ) {
      console.log(response);

    });
}

export function postGameReview(id, headline, review, rating){
    //var data = {"rating": rating};
    //$.post( "/api/games/" + id + "/addRating/", data, function( response ) {
      //console.log(response);

    //});
    console.log("Posting new review to server:\nID: " + 
    	id + "\nheadline: " + headline + "\nreview: " + review + 
    	"\nrating: " + rating);
    dispatcher.dispatch({
                type: "NEW_GAME_REVIEW",
                headline: headline,
                review: review,
                rating: rating
            });
}
