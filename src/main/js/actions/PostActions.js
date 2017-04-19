import dispatcher from "../dispatcher";

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