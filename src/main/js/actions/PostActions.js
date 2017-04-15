import dispatcher from "../dispatcher";

export function createPost(post) {
    const ID = Date.now();
    const txt = post.text;
    const login = post.login;
    const newPost = {
        login: login,
        ID,
        verb: "said: ",
        object: txt,
        imageUrl: "https://images.igdb.com/igdb/image/upload/t_micro/scutr4p9gytl4txb2soy.jpg"
    };

    //make call to server here

    dispatcher.dispatch({
        type: "CREATE_POST",
        post: newPost
    });
}