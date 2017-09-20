import React from "react";
import {Button} from "react-bootstrap";
import UserStore from "../stores/UserStore";

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

        return (
            <div>
                <h1 class="text-center">Notifications</h1>
                <br/>
                {notifications}

            </div>

        );
    }
}

class Notification extends React.Component {
  render(){
    const {user} = this.props;
    const {verb} = this.props;
    const {imageUrl} = this.props;
    var btn1Style = "link";
    var btn2Style = "link";
    var btn1Text = "";
    var btn2Text = "";

    if(this.props.type == "friendRequest"){
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
            >
              {btn1Text}
          </Button>
          &nbsp;&nbsp;
          <Button
            bsStyle={btn2Style}
            >
              {btn2Text}
          </Button>
        </span>
        <hr/>
      </div>

    );
  }
}
