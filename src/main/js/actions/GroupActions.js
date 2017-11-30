import dispatcher from "../dispatcher";

export function getGroup(id){
	$.get( "/api/group/" + id, function( data ){
		dispatcher.dispatch({
			type: "GET_GROUP_DATA",
			group: data
		});
	});
}

/* Gets all groups contained in the server's database,
including those user is not a part of */
export function getAllGroups(){
	$.get( "/api/group/allGroups/" + id, function( data ){
		dispatcher.dispatch({
			type: "GET_ALL_GROUPS",
			groups: data
		});
	});
}

export function joinGroup(groupId, userId){
  $.get( "/api/group/" + groupId + "/addMember/" + userId,
    function( data ){
      console.log("the data:");
      console.log(data);
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
        type: "UPDATE_POST",
        post: response
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
