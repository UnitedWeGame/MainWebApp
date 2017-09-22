import dispatcher from "../dispatcher";

export function getFriendsActivity(){
    $.get( "/api/activityFeed/", function( data ) {
        console.log("data from activity: ");
        console.log(data);
        dispatcher.dispatch({
            type: "GET_FRIENDS_ACTIVITY",
            activity: data
        });
        setTimeout(getFriendsActivity, 5000);
    });
}



export function postStatus(text){
    text = "said: " + text;
    $.ajax({
         url: "/api/activityFeed",
         type:"POST",
         data: JSON.stringify({ "content": text }),
         contentType:"application/json; charset=utf-8",
         dataType:"json",
         success: function(response ){
         console.log("this is the response: ");
         console.log(response);
                dispatcher.dispatch({
                    type: "CREATE_POST",
                    post: response
                });
         }
        })
    //var data = "{\"content\": \""+text+"\"}";
        //{ content: text }
    /*$.post("/api/activityFeed/", 
        JSON.stringify({ "content": text })
        , 
        function(response){
        
    });*/
}

export function createPost(post) {
    /*var ID = Date.now();
    var login;
    $.get( "/api/users/me", function( data ) {
        login = data.username;
        const txt = post.text;
        const newPost = { 
            login: login,
            ID,
            verb: "said: ",
            object: txt,
            imageUrl: "https://images.igdb.com/igdb/image/upload/t_micro/scutr4p9gytl4txb2soy.jpg"
        };*/

        // TODO: POST the post to the server
        dispatcher.dispatch({
            type: "CREATE_POST",
            post: post
        });
    //});
    
}

export function getUser(){
    var name;
    $.get( "/api/users/me", function( data ) {
          name = data.username;
        });

    dispatcher.dispatch({
            type: "GET_USER_NAME",
            name: name
        });
}