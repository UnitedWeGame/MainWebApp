import dispatcher from "../dispatcher";
/* NOTE: these actions are used for an arbitrary user and not necessarily "me "*/
//gets user based on id
export function getUserData(id){
  $.get( "/api/users/" + id, function( data ){
    dispatcher.dispatch({
      type: "GET_USER_DATA",
      user: data
    });
  });
}

//gets a full json list of all the site's users
export function getAllUsers(){
    $.get( "/api/users/", function( data ){
        dispatcher.dispatch({
            type: "GET_ALL_USERS",
            users: data
        });
    });
}

//gets full json list of groups to which user with userId belongs
export function getGroups(userId){
    $.get( "/api/users/groups/" + userId, function( data ){
        dispatcher.dispatch({
            type: "GET_GROUPS",
            groups: data
        });
    });
}

//gets full json list of userId's friends
export function getFriends(userId){
    $.get( "/api/friends/" + userId, function( data ){
        dispatcher.dispatch({
            type: "GET_FRIENDS",
            friends: data
        });
    });
}
