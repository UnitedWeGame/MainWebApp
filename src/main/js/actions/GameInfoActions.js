import dispatcher from "../dispatcher";

export function postRating(id, rating){
    var data = {"rating": rating};
    $.post( "/api/games/" + id + "/addRating/", data, function( response ) {
      console.log(response);

    });
}
