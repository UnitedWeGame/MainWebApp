import React from "react";
import { hashHistory, IndexLink, Link } from "react-router";
import {Badge, Button, ButtonToolbar, DropdownButton, FormGroup, Glyphicon, MenuItem, Nav, Navbar, NavDropdown, NavItem, Overlay, OverlayTrigger, Tooltip} from "react-bootstrap";
import * as UserActions from "../../actions/UserActions";
import * as FriendActions from "../../actions/FriendActions";
import * as NotificationActions from "../../actions/NotificationActions";
import UserStore from "../../stores/UserStore";
import NotificationStore from "../../stores/NotificationStore";
import Searchbar from "./Searchbar.js";


export default class NavBar extends React.Component {

  constructor() {
    super();

    this.onDropdownSelect = this.onDropdownSelect.bind(this);
    this.setNotificationCount = this.setNotificationCount.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setUserID = this.setUserID.bind(this);
    const username = UserStore.getUsername();
    const userID = UserStore.getUserID();
    var notificationCount =  NotificationStore.getNotificationCount();
    var notificationHeadline =  NotificationStore.getHeadline();

    this.state = {
        collapsed: true,
        usernameDisplay: username,
        userID: userID,
        notificationCount: notificationCount,
        notificationHeadline: notificationHeadline
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
      notificationCount: NotificationStore.getNotificationCount(),
      notificationHeadline: NotificationStore.getHeadline()
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
    if(eventKey == 5.1){
    }
    else if(eventKey == 5.2){
      return;
    }
    else if(eventKey == 5.3){
      return;
    }
  }


  render() {

    const glyphBellStyle = {
      fontSize: "16px"
    }

    const logoStyle = {
      paddingTop: "8px"
    }

    const brandStyle = {
      display: "flex",
      alignItems: "center"
    }


    const tooltipNotifications = (
      <Tooltip id="tooltip"><strong>{this.state.notificationHeadline}</strong></Tooltip>
    );

    return (
      <Navbar fluid fixedTop>
        <Navbar.Header>
          <Navbar.Brand style={brandStyle}>
            <a href="#" style={logoStyle}>
            <img
            src="http://i.imgur.com/yK9sv5L.png" alt="United We Game"/>
            </a>
          </Navbar.Brand >
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
              <Searchbar />
            </FormGroup>
          </Navbar.Form>
          <Nav pullRight>
            <NavItem eventKey={1} href="/users#/activity">Activity</NavItem>
            <NavItem eventKey={2} href="/users#/friends">Friends</NavItem>
            <NavItem eventKey={3} href="/users#/library">Library</NavItem>
            <NavItem eventKey={4} href={"/users#/profile/" + this.state.userID}><strong>{this.state.usernameDisplay}</strong></NavItem>
            <OverlayTrigger placement="bottom" overlay={tooltipNotifications}>
              <NavItem eventKey={5} href="/users#/notifications">
                  <Glyphicon style={glyphBellStyle} glyph="bell" /><Badge>{this.state.notificationCount}</Badge>
              </NavItem>
            </OverlayTrigger>
            <NavDropdown eventKey={6} title="" id="basic-nav-dropdown">
              <MenuItem eventKey={6.1} href="/users#/groupSettings">Create a Group</MenuItem>
              <MenuItem eventKey={6.2} href="/users#/notifications">Notifications</MenuItem>
              <MenuItem eventKey={6.3} href="/users#/settings">Settings</MenuItem>
              <MenuItem eventKey={6.4} href="/logout">Logout</MenuItem>

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    );
  }

}
