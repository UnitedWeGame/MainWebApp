import dispatcher from "../dispatcher";

export function updateSettings(settings){
	console.log("in updateSettings")
  $.ajax({
		url: "/api/userSettings",
		type:"POST",
		data: JSON.stringify({"email": settings.email,
													"imageURL": settings.imageURL,
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