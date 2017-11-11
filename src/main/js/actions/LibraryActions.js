import dispatcher from "../dispatcher";
import * as UserActions from "./UserActions";

// Retrieves information for a game from our database.
// Section refers to which tab of the game page should be displayed to the user
export function getGameInfo(gameId, section){
    // if section was not provided, set it to 0
    section = (typeof section !== 'undefined') ?  section : 0;

    $.get( "/api/games/" + gameId, function( data ) {
        dispatcher.dispatch({
                type: "GET_GAME_INFO",
                gameInfo: data,
                tabIndex: section
            });
    });
}

export function getAllGames(){
    $.get( "/api/games/", function( data ) {
        dispatcher.dispatch({
                type: "GET_ALL_GAMES",
                games: data
            });
    });
}

export function addGame(id, platform){
    $.get( "/api/games/" + id + "/" + platform + "/addToLibrary/", function( data ) {
      console.log(data);
      UserActions.getCurrentUserData(platform);
    });
}

export function removeGame(id, platform){
    $.get( "/api/games/" + id + "/" + platform + "/removeFromLibrary/", function( data ) {
      UserActions.getCurrentUserData(platform);
    });
}


export function sendTextInvite(gameId){

    $.get( "/api/games/"+ gameId + "/groupNotification", function( data ) {
    });

}

export function showXboxGames(){
	dispatcher.dispatch({
            type: "SHOW_XBOX_GAMES"
        });

}

export function showSteamGames(){
	dispatcher.dispatch({
            type: "SHOW_STEAM_GAMES"
        });

}

export function showPlaystationGames(){
	dispatcher.dispatch({
            type: "SHOW_PLAYSTATION_GAMES"
        });

}
