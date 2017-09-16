import dispatcher from "../dispatcher";

export function getCurrentUserData(){
// platform variable optional for specifying which library games should be shown
// when LibraryStore.initGames() is called
    var name;
    $.get( "/api/users/me", function( data ) {
        //user = data;
        dispatcher.dispatch({
            type: "GET_CURRENT_USER_DATA",
            user: data,
            platform: platform
            });
    });

}
