import dispatcher from "../dispatcher";

export function getGroup(id){
	$.get( "/api/group/" + id, function( data ){
		dispatcher.dispatch({
			type: "GET_GROUP_DATA",
			group: data
		});
	});
}

export function joinGroup(groupId, userId){
  $.get( "/api/group/" + groupId + "/addMember/" + userId, function( data ){
		dispatcher.dispatch({
			type: "UPDATE_GROUP",
			group: data
		});
	});
}

export function updateActivityFeed(group, groupPost){
  $.ajax({
    url: "/api/group/" + group.id + "/createPost",
    type:"POST",
    data: JSON.stringify({
    	"userId": groupPost.userId,
    	"username": groupPost.username,
    	"content": groupPost.content,
    	"imageUrl": groupPost.imageUrl,
    	"timestamp": groupPost.timestamp
    	 }),
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    success: function(response ){
      dispatcher.dispatch({
        type: "UPDATE_GROUP",
        group: response
      });
    }
  });
}
//posting to /api/group
export function updateSettings(settings){
	$.ajax({
    url: "/api/group/",
    type:"POST",
    data: JSON.stringify({
    	"groupName": settings.groupName,
    	"description": settings.description,
    	"coverPhoto": settings.coverPhoto
     }),
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    success: function(response ){
      dispatcher.dispatch({
        type: "UPDATE_GROUP",
        group: response
      });
    }
  });
}

