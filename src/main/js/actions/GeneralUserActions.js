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
