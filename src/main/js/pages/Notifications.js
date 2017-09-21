import React from "react";
import {Button} from "react-bootstrap";
import UserStore from "../stores/UserStore";
import * as FriendActions from "../actions/FriendActions";

export default class Notifications extends React.Component {

    constructor(){
      super();
      this.updateNotificationList = this.updateNotificationList.bind(this);
      const notificationList = UserStore.getNotifications();

      this.state = {
        notificationList: notificationList
      }
    }

    componentWillMount() {
        UserStore.on("change", this.updateNotificationList);
    }

    componentWillUnmount() {
        UserStore.removeListener("change", this.updateNotificationList);
    }

    updateNotificationList() {
      this.setState({
          notificationList: UserStore.getNotifications()
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

  btn1onClick(type, requestId){
    if(type == "friendRequest"){
      UserStore.removeNotification(requestId);
      FriendActions.acceptFriendRequest(requestId);
    }
  }

  btn2onClick(type, requestId){

    if(type == "friendRequest"){
      UserStore.removeNotification(requestId);
      FriendActions.denyFriendRequest(requestId);
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
      btn2Text = "Ignore";
    }

    return (
      <div class="autosize-container">
        <span>
          <img src={imageUrl} alt="Profile picture"/>
          &nbsp;&nbsp;
          <strong>{user} {verb}</strong>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            bsStyle={btn1Style}
            onClick={this.btn1onClick.bind(this, type, id)}
            >
              {btn1Text}
          </Button>
          &nbsp;&nbsp;
          <Button
            bsStyle={btn2Style}
            onClick={this.btn2onClick.bind(this, type, id)}
            >
              {btn2Text}
          </Button>
        </span>
        <hr/>
      </div>

    );
  }
}
