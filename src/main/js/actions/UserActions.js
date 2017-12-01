import dispatcher from "../dispatcher";

/* NOTE: these actions only apply to "me" and no other user */

export function getCurrentUserData(platform){
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

export function updateSettings(settings){
	console.log("in updateSettings")
	console.log(settings)
  $.ajax({
		url: "/api/userSettings",
		type:"POST",
		data: JSON.stringify({"email": settings.email,
													"imageUrl": settings.imageURL,
													"coverPhoto": settings.coverPhoto,
													"steamId": settings.steamId,
													"xboxGamertag": settings.xboxGamertag,
													"psnGamertag": settings.psnGamertag,
													"smsEnabled": settings.smsEnabled }),
		contentType:"application/json; charset=utf-8",
		dataType:"json",
		success: function(response ){
			console.log("this is the response: ");
			console.log(response);
      dispatcher.dispatch({
        type: "UPDATE_SETTINGS",
        settings: response
      });
		}
  })
}
