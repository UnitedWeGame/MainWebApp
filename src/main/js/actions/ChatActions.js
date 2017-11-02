import dispatcher from "../dispatcher";

// Sends information to the ChatStore so the chat window can be updated
// to start chatting with the username given
export function startSoloChat(username, imageUrl){

    dispatcher.dispatch({
        type: "START_SOLO_CHAT",
        partner: username,
        partnerImg: imageUrl
    });
}
