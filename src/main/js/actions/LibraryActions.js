import dispatcher from "../dispatcher";

export function getGameInfo(gameId){
    //$.get( "/api/games/" + gameId, function( data ) {
        dispatcher.dispatch({
                type: "GET_GAME_INFO",
                gameInfo: data
            });
    //});
}

export function sendTextInvite(gameId){
	console.log("sending text for game number: " + gameId);

    $.get( "/api/games/"+ gameId + "/groupNotification", function( data ) {
    	console.log("Response from server after trying to send texts: ");
    	console.log(data);
    });

}

export function showXBoxGames(){
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
