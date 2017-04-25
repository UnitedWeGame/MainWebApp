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