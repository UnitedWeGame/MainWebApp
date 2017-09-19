import dispatcher from "../dispatcher";
import * as UserActions from "./UserActions";


export function getGameInfo(gameId){
    $.get( "/api/games/" + gameId, function( data ) {
    // var data = {
    //   title: "Zelda",
    //   releaseDate: "October 11, 2016",
    //   usersRating: 3.5,
    //   communityRating: 5,
    //   gameSummary: "An epic game",
    //   usersReview: false
    //
    // }
        dispatcher.dispatch({
                type: "GET_GAME_INFO",
                gameInfo: data
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
    console.log("/api/games/" + id + "/" + platform + "/addToLibrary/")
}

export function removeGame(id, platform){
    $.get( "/api/games/" + id + "/" + platform + "/removeFromLibrary/", function( data ) {
      console.log(data);
      UserActions.getCurrentUserData(platform);
    });
    console.log("/api/games/" + id + "/" + platform + "/removeFromLibrary/")
}


export function sendTextInvite(gameId){
	console.log("sending text for game number: " + gameId);

    $.get( "/api/games/"+ gameId + "/groupNotification", function( data ) {
    	console.log("Response from server after trying to send texts: ");
    	console.log(data);
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
