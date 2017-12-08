import dispatcher from "../dispatcher";

//gets group with id
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
	$.get( "/api/group/allGroups/", function( data ){
		dispatcher.dispatch({
			type: "GET_ALL_GROUPS",
			groups: data
		});
	});
}

//adds userId to group with groupId
export function joinGroup(groupId, userId){
  $.get( "/api/group/" + groupId + "/addMember/" + userId,
    function( data ){
		dispatcher.dispatch({
			type: "UPDATE_GROUP",
			group: data
		});
	});
}

//adds a post made by a group member to that group's activity feed
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
//creates a new group
export function createGroup(group){
  $.ajax({
    url: "/api/group/",
    type:"POST",
    data: JSON.stringify({
      "groupName": group.groupName,
      "description": group.description,
      "coverPhoto": group.coverPhoto,
      "adminUser": group.adminUser
     }),
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    success: function(response ){
      dispatcher.dispatch({
        type: "CREATE_GROUP",
        group: response
      });
    }
  });
}

//edits an existing groups settings
export function updateSettings(settings){
	$.ajax({
    url: "/api/group/saveGroup",
    type:"POST",
    data: JSON.stringify({
      "id": settings.id,
    	"groupName": settings.groupName,
    	"description": settings.description,
    	"coverPhoto": settings.coverPhoto,
      "members": settings.group.members,
      "adminUser": settings.group.adminUser
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
