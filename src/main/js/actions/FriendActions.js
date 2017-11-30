import dispatcher from "../dispatcher";

/* Get user's friends from our server as well as suggested friends */
export function getAllFriends(){
    var name;
    $.get( "/api/friends", function( data ) {
        dispatcher.dispatch({
                type: "GET_ALL_FRIENDS_DATA",
                friends: data
            });
    });

    $.get( "/api/friends/suggestedFriends", function( data ) {
        dispatcher.dispatch({
                type: "GET_SUGGESTED_FRIENDS",
                suggestedFriends: data
            });
    });


}

/* Query our server to see which friends are currently gaming.
  Here friends refer to friends on xbox live or steam, not UWG friends. */
export function getNowPlaying(){
    $.get( "/api/friends/onlineFeed", function( data ) {
    	var friends = [];
    	var i;
    	for(i in data){
    		var img = data[i].game.imageUrl;
			//var img = img.replace("t_cover_big", "t_thumb");
    		var obj = {
    			"gamerTag": data[i].gamerTag,
    			"ID" : data[i].id,
    			"game": data[i].game.title,
                "platform": data[i].game.platform.title,
                "imageUrl": img
    		};
    		friends.push(obj);
    	}
        dispatcher.dispatch({
                type: "UPDATE_NOW_PLAYING",
                friends: friends
        });
    setTimeout(getNowPlaying, 5000);
    });
}

/* Unfriends a user */
export function removeFriend(userId){
    $.get( "/api/friends/" + userId + "/removeFriend", function( data ) {
      console.log(data);
      dispatcher.dispatch({
              type: "REMOVE_FRIEND",
              friendId: userId
      });
    });
}

/* Removes someone from the users's uggested friend list */
export function removeSuggestedFriend(userId){
      dispatcher.dispatch({
              type: "REMOVE_SUGGESTED_FRIEND",
              friendId: userId
    });
}

export function sendFriendRequest(friendId){
    $.get( "/api/users/" + friendId + "/requestFriend", function( data ) {
      dispatcher.dispatch({
              type: "FRIEND_REQUEST_SENT",
              friendId: friendId
      });
    });
}

export function acceptFriendRequest(requestId){
    $.get( "/api/requests/" + requestId + "/acceptRequest", function( data ) {
      // we now want to show the accepted friend in our friend list,
      // as well as get any new suggested friends.
      getAllFriends();
    });
}

export function denyFriendRequest(requestId){
    $.get( "/api/requests/" + requestId + "/rejectRequest", function( data ) {
      console.log(data)
    });
}
