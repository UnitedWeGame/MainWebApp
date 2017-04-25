import dispatcher from "../dispatcher";

export function getAllFriends(){
    var name;
    $.get( "/api/friends", function( data ) {
        dispatcher.dispatch({
                type: "GET_ALL_FRIENDS_DATA",
                friends: data
            });
        console.log("In the action");
        console.log("Received this data: " + data);
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