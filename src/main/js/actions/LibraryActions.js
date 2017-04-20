import dispatcher from "../dispatcher";

export function sendTextInvite(gameId){
	console.log("sending text for game number: " + gameId);

    $.get( "/api/games/"+ gameId + "/groupNotification", function( data ) {
    	console.log("Response from server after trying to send texts: ");
    	console.log(data);
    });

}