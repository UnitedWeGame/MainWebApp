import dispatcher from "../dispatcher";
import * as UserActions from "./UserActions";

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

// Remove a game from the user's library
export function removeGame(id, platform){
    $.get( "/api/games/" + id + "/" + platform + "/removeFromLibrary/", function( data ) {

      dispatcher.dispatch({
          type: "REMOVE_GAME",
          gameId: id,
          platform: platform
      });
    });
}


export function sendTextInvite(gameId){

    $.get( "/api/games/"+ gameId + "/groupNotification", function( data ) {
    });

}

// Tell store that all xbox games should be displayed
export function showXboxGames(){
	dispatcher.dispatch({
            type: "SHOW_XBOX_GAMES"
        });

}

// Tell store that all steam games should be displayed
export function showSteamGames(){
	dispatcher.dispatch({
            type: "SHOW_STEAM_GAMES"
        });

}

// Tell store that all playstation games should be displayed
export function showPlaystationGames(){
	dispatcher.dispatch({
            type: "SHOW_PLAYSTATION_GAMES"
        });

}
