import dispatcher from "../dispatcher";

function formatMessageList(messageList, me, partner) {
  /*console.log("In formatMessageList")
  console.log("messageList is this long: " + messageList.length)*/
  console.log("me " + me);
  console.log("partner " + partner);
    for (var index in messageList) {
        var message = messageList[index];
        console.log("message: " + message.data.text)
        console.log("formatMessageList, author: " + message.author);
        if (message.author == "me") {
            message.author = me;
        } else {
            message.author = partner;
        }
    }
    console.log("after formatMessageList, list is this long: " + messageList.length)
    return messageList;
}

// Sends information to the ChatStore so the chat window can be updated
// to start chatting with the username given
export function startSoloChat(username, imageUrl){

    dispatcher.dispatch({
        type: "START_SOLO_CHAT",
        partner: username,
        partnerImg: imageUrl
    });
}

export function loadAllConversations(allConversations) {
  dispatcher.dispatch({
    type: "LOAD_CONVERSATIONS",
    conversations: allConversations
  });
}

export function sendMessage(messageList, me, partner) {
  var messageInfo = {to: partner, from: me, messageList: formatMessageList(messageList, me, partner)};
  socket.emit("chatMessage", messageInfo);
  dispatcher.dispatch({
    type: "WRITE_MESSAGE",
    messageList: messageList
  });
}

export function receiveMessage(messageInfo) {
  dispatcher.dispatch({
    type: "RECEIVE_MESSAGE",
    messageList: messageInfo.messageList,
    from: messageInfo.from
  });
}
