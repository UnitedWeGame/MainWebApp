import dispatcher from "../dispatcher";

export function getAllFriends(){
    var name;
    $.get( "/api/friends", function( data ) {
        dispatcher.dispatch({
                type: "GET_ALL_FRIENDS_DATA",
                friends: data
            });
    });

}

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


export function removeFriend(id){
    $.get( "/api/friends/" + id + "/removeFriend", function( data ) {
      console.log(data);
      dispatcher.dispatch({
              type: "REMOVE_FRIEND",
              friendId: id
      });
    });
}

export function sendFriendRequest(id){
    $.get( "/api/users/" + id + "/requestFriend", function( data ) {
      console.log(data);
      dispatcher.dispatch({
              type: "FRIEND_REQUEST_SENT",
              friendId: id
      });
    });
}

export function acceptFriendRequest(requestId){
    console.log("except friend request api call")
    $.get( "/api/requests/" + requestId + "/acceptRequest", function( data ) {
      console.log(data);
    });
}

export function denyFriendRequest(requestId){
    $.get( "/api/requests/" + requestId + "/denyRequest", function( data ) {
      console.log(data);
    });
}
