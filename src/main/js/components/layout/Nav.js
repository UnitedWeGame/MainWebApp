import React from "react";
import { hashHistory, IndexLink, Link } from "react-router";
import {Badge, ButtonToolbar, DropdownButton, MenuItem} from "react-bootstrap";
import * as UserActions from "../../actions/UserActions";
import * as FriendActions from "../../actions/FriendActions";
import * as NotificationActions from "../../actions/NotificationActions";
import UserStore from "../../stores/UserStore";
import NotificationStore from "../../stores/NotificationStore";
import Searchbar from "./Searchbar.js";


export default class Nav extends React.Component {

  constructor() {
    super();

    this.onDropdownSelect = this.onDropdownSelect.bind(this);
    this.setNotificationCount = this.setNotificationCount.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setUserID = this.setUserID.bind(this);
    const username = UserStore.getUsername();
    const userID = UserStore.getUserID();
    var notificationCount =  NotificationStore.getNotificationCount();
    this.state = {
        collapsed: true,
        usernameDisplay: username,
        userID: userID,
        notificationCount: notificationCount
    };

    UserActions.getCurrentUserData();
    FriendActions.getAllFriends();
    FriendActions.getNowPlaying();
    NotificationActions.getFriendRequests();

  }

  componentWillMount() {
    UserStore.on("change", this.setUsername);
    UserStore.on("change", this.setUserID);
    NotificationStore.on("change", this.setNotificationCount);

  }

  componentWillUnmount() {
    UserStore.removeListener("change", this.setUsername);
    UserStore.removeListener("change", this.setUserID);
    NotificationStore.removeListener("change", this.setNotificationCount);

  }

  setNotificationCount(){
    this.setState({
      notificationCount: NotificationStore.getNotificationCount()
    });
  }

  setUsername(){
    this.setState({
      usernameDisplay: UserStore.getUsername()
    });
  }

  setUserID(){
    this.setState({
      userID: UserStore.getUserID()
    });
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
    console.log("toggled");
  }

  onDropdownSelect(eventKey) {
    console.log("Drop down items selected: " + eventKey)
    if(eventKey == 1){
      console.log("Should direct to notifications")
      hashHistory.push("/notifications");
      return;
    }

    else if(eventKey == 2){
      hashHistory.push("/settings");
      return;
    }

    else if(eventKey == 3){
      hashHistory.push("/logout");
    }

    else if(eventKey == 4){
      hashHistory.push("/groups");
    }
  }


  render() {

    var iconMenuSettings = {
        inverse: true,
        icon:'more_vert',
        position:'topRight'
      }

    const logoStyle = {
      marginBottom: "6px"
    }

    const { location } = this.props;
    const { collapsed } = this.state;
    const activityClass = location.pathname === "/" ? "active" : "";
    const friendsClass = location.pathname.match(/^\/friends/) ? "active" : "";
    const libraryClass = location.pathname.match(/^\/library/) ? "active" : "";
    const profileClass = location.pathname.match(/^\/profile/) ? "active" : "";

    const navClass = collapsed ? "collapse" : "";

    return (
      <nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
          {/*<!-- Brand, search, and toggle get grouped for better mobile display -->*/}
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#" style={logoStyle}><img src="http://i.imgur.com/yK9sv5L.png" alt="United We Game"/></a>
          </div>

          {/*<!-- Collect the nav links, forms, and other content for toggling -->*/}
          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">

            <ul class="nav navbar-nav navbar-right">
              <li class={activityClass}>
                <Link to="activity" onClick={this.toggleCollapse.bind(this)}>Activity</Link>
              </li>
              <li class={friendsClass}>
                <Link to="friends" onClick={this.toggleCollapse.bind(this)}>Friends</Link>
              </li>
              <li class={libraryClass}>
                <Link to="library" onClick={this.toggleCollapse.bind(this)}>Library</Link>
              </li>
              <li class={profileClass}>
                <Link to={`profile/${this.state.userID}`} onClick={this.toggleCollapse.bind(this)}><strong>{this.state.usernameDisplay}</strong></Link>
              </li>
              <li>
                <a href="/logout"> Logout</a>
              </li>
                <DropdownButton bsStyle="link" title=""  id="dropdown">
                  <MenuItem eventKey="1" onSelect={this.onDropdownSelect}>Notifications &nbsp;&nbsp; <Badge>{this.state.notificationCount}</Badge></MenuItem>
                  <MenuItem eventKey="2" onSelect={this.onDropdownSelect}>Settings</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="3" onSelect={this.onDropdownSelect}>Logout</MenuItem>
                  <MenuItem eventKey="4" onSelect={this.onDropdownSelect}>Create a Group</MenuItem>
                </DropdownButton>
            </ul>

            <div class="navbar-form navbar-left hidden-xs">
              <div class="form-group">
                  <Searchbar />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

}
