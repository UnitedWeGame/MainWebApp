import dispatcher from "../dispatcher";
//gets list of a user's friends who are currently logged in to UnitedWeGame
export function getOnlineNow(){
    $.get( "/api/friends/online", function( data ) {
    	var friends = [];
    	var i;
    	for(i in data){
    		var obj = {
    			"username": data[i].username,
    			"ID" : data[i].id,
    			"imageUrl": data[i].imageUrl
    		};
    		friends.push(obj);
    	}
        dispatcher.dispatch({
                type: "UPDATE_ONLINE_NOW",
                friends: friends
            });
    setTimeout(getOnlineNow, 20000);
    });
}