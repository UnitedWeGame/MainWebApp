import dispatcher from "../dispatcher";


export function getFriendRequests(){
    $.get( "/api/requests/pending", function( data ) {
      console.log("friend request list received: " + data);
      if(data.length > 0){
          dispatcher.dispatch({
                  type: "FRIEND_REQUEST_RECEIVED",
                  friendRequests: data
          });
      }
      setTimeout(getFriendRequests, 120000); // 2 minutes

    });
}
