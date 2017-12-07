import dispatcher from "../dispatcher";

//gets a list of all activities made by the user's friends
export function getFriendsActivity(){
    $.get( "/api/activityFeed/", function( data ) {
        dispatcher.dispatch({
            type: "GET_FRIENDS_ACTIVITY",
            activity: data
        });
        setTimeout(getFriendsActivity, 5000);
    });
}

//creates an activity feed post
export function postStatus(text){
    if(text.trim().length !== 0) {
        text = "said: " + text;
        $.ajax({
            url: "/api/activityFeed",
            type: "POST",
            data: JSON.stringify({"content": text}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                dispatcher.dispatch({
                    type: "CREATE_POST",
                    post: response
                });
            }
        })
    }
}