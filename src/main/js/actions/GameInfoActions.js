import dispatcher from "../dispatcher";

/* Posts a new game rating (1-5) to our server */
export function postRating(id, rating){
    var data = {"rating": rating};
    // $.ajax({
    //    url: "/api/games/" + id + "/addRating",
    //    type:"POST",
    //    data: JSON.stringify({data}),
    //    contentType:"application/json; charset=utf-8",
    //    dataType:"json",
    //    success: function(response ){
    //      console.log("Response after posting new game rating:" + response);
    //    }
    // });
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
