import dispatcher from "../dispatcher";

export function getCurrentUserData(){
    var name;
    $.get( "/api/users/me", function( data ) {
        //user = data;
        dispatcher.dispatch({
            type: "GET_CURRENT_USER_DATA",
            user: data
        });
    });

}
