import dispatcher from "../dispatcher";

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
    setTimeout(getOnlineNow, 5000);
    });
}