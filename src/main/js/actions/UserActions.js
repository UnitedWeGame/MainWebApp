import dispatcher from "../dispatcher";

export function getUserData(){
    var name;
    $.get( "/api/users/me", function( data ) {
        //user = data;
        dispatcher.dispatch({
                type: "GET_USER_DATA",
                user: data
            });
    });

}