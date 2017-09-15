import React from "react";
import { IndexLink, Link } from "react-router";
import * as UserActions from "../../actions/UserActions"
import * as FriendActions from "../../actions/FriendActions"
import UserStore from "../../stores/UserStore";


export default class Nav extends React.Component {

  constructor() {
    super();

    this.setUsername = this.setUsername.bind(this);
    this.setUserID = this.setUserID.bind(this);
    const username = UserStore.getUsername();
    const userID = UserStore.getUserID();
    this.state = {
        collapsed: true,
        usernameDisplay: username
    };

    UserActions.getCurrentUserData();
    FriendActions.getAllFriends();
    FriendActions.getNowPlaying();
  }

  componentWillMount() {
    UserStore.on("change", this.setUsername);
    UserStore.on("change", this.setUserID);
  }

  componentWillUnmount() {
    UserStore.removeListener("change", this.setUsername);
    UserStore.removeListener("change", this.setUserID);
  }

  setUsername(){
    this.setState({
      username: UserStore.getUsername()
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
                <Link to={`profile/${this.state.userID}`} onClick={this.toggleCollapse.bind(this)}><strong>{this.state.username}</strong></Link>
              </li>
              <li>
                <a href="/logout"> Logout</a>
              </li> 
              <li>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" onClick={this.toggleCollapse.bind(this)} aria-haspopup="true" aria-expanded={collapsed}> <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" class="divider"></li>
                  <li><a href="#">Separated link</a></li>
                </ul>
              </li>
            </ul>
            <form class="navbar-form navbar-left hidden-xs">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Search"/>
              </div>
              <button type="submit" class="btn btn-default">Go</button>
            </form>
          </div>
        </div>
      </nav>
    );
  }

}