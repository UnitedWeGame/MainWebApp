import React from "react";
import {Button, ButtonToolbar, Image} from "react-bootstrap";
import NotificationStore from "../stores/NotificationStore";
import * as FriendActions from "../actions/FriendActions";
import * as ChatActions from "../actions/ChatActions";


export default class Notifications extends React.Component {

    constructor(){
      super();
      this.updateNotificationList = this.updateNotificationList.bind(this);
      const notificationList = NotificationStore.getNotifications();

      this.state = {
        notificationList: notificationList
      }
    }

    componentWillMount() {
        NotificationStore.on("change", this.updateNotificationList);
    }

    componentWillUnmount() {
        NotificationStore.removeListener("change", this.updateNotificationList);
    }

    updateNotificationList() {
      this.setState({
          notificationList: NotificationStore.getNotifications()
      })
    }

    render() {
      const notifications = this.state.notificationList.map((n) => <Notification key={n.id} {...n}/> );
      var text = "";
      if(notifications.length == 0)
        text = "You have no new notifications..."
      const pageStyle = {
        backgroundColor: "#272A2F"
      }

        return (
            <div class="well">
                <h1 class="text-center">Notifications</h1>
                <br/>
                <p class="text-center">{text}</p>
                {notifications}

            </div>

        );
    }
}

class Notification extends React.Component {

  /* Called when the left button is clicked. user is the friend's username,
  imageUrl is the friend's */
  btn1onClick(type, notificationId, user, imageUrl){
    if(type == "friendRequest"){
      const requestId = notificationId;
      NotificationStore.removeNotification(requestId);
      FriendActions.acceptFriendRequest(requestId);
    }
    else if(type == "newMessage"){
      NotificationStore.removeNotification(notificationId);
      ChatActions.startSoloChat(user, imageUrl);
    }
  }

  /* Called when the right button is clicked. user is the friend's username,
  imageUrl is the friend's */
  btn2onClick(type, notificationId, user, imageUrl){

    if(type == "friendRequest"){
      const requestId = notificationId;
      NotificationStore.removeNotification(requestId);
      FriendActions.denyFriendRequest(requestId);
    }
    else if(type == "newMessage"){
      NotificationStore.removeNotification(notificationId);
    }
  }

  render(){
    const {id} = this.props;
    const {user} = this.props;
    const {verb} = this.props;
    const {imageUrl} = this.props;
    const {type} = this.props;
    var btn1Style = "link";
    var btn2Style = "link";
    var btn1Text = "";
    var btn2Text = "";

    if(type == "friendRequest"){
      btn1Style = "success";
      btn1Text = "Accept";
      btn2Style = "danger";
      btn2Text = "Deny";
    }
    else if(type == "newMessage"){
      btn1Style = "success";
      btn1Text = "Read";
      btn2Style = "danger";
      btn2Text = "Ignore";
    }

    return (
      <div class="autosize-container">
        <span>
          <Image width="50" src={imageUrl} alt="Profile Picture" thumbnail responsive/>
          &nbsp;&nbsp;
          <strong>{user} {verb}</strong>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <ButtonToolbar className="pull-right">
          <Button
            bsStyle={btn1Style}
            onClick={this.btn1onClick.bind(this, type, id, user, imageUrl)}
            >
              {btn1Text}
          </Button>
          <Button
            bsStyle={btn2Style}
            onClick={this.btn2onClick.bind(this, type, id, user, imageUrl)}
            >
              {btn2Text}
          </Button>
          </ButtonToolbar>
        </span>
        <hr/>
      </div>

    );
  }
}
