import dispatcher from "../dispatcher";

function formatMessageList(messageList, me, partner) {
  /*console.log("In formatMessageList")
  console.log("messageList is this long: " + messageList.length)*/
    for (var index in messageList) {
        var message = messageList[index];
        if (message.author == "me") {
            message.author = me;
        } else {
            message.author = partner;
        }
    }
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
  //var messageInfo = {to: partner, from: me, messageList: formatMessageList(messageList, me, partner)};
  var messageInfo = {to: partner, from: me, messageList: messageList};
  socket.emit("chatMessage", messageInfo);
  console.log("In Send Message Action: Sent message!!!!")
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
