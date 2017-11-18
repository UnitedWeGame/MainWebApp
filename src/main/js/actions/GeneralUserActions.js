import dispatcher from "../dispatcher";

export function getUserData(id){
	$.get( "/api/users/" + id, function( data ){
		dispatcher.dispatch({
			type: "GET_USER_DATA",
			user: data
		});
	});
}

export function getAllUsers(){
    $.get( "/api/users/", function( data ){
        dispatcher.dispatch({
            type: "GET_ALL_USERS",
            users: data
        });
    });
}

export function getGroups(userId){
    $.get( "/api/users/groups/" + userId, function( data ){
        dispatcher.dispatch({
            type: "GET_GROUPS",
            groups: data
        });
    });
}

export function getFriends(userId){
    $.get( "/api/friends/" + userId, function( data ){
        dispatcher.dispatch({
            type: "GET_FRIENDS",
            friends: data
        });
    });
}