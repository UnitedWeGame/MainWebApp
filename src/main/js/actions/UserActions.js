import dispatcher from "../dispatcher";

// platform variable optional for specifying which library games should be shown
// when LibraryStore.initGames() is called
export function getUserData(platform){
    var name;
    $.get( "/api/users/me", function( data ) {
        //user = data;
        dispatcher.dispatch({
                type: "GET_USER_DATA",
                user: data,
                platform: platform
            });
    });

}
