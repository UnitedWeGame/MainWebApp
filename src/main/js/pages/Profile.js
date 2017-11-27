import React from "react";
import { Link } from "react-router";
import FriendStore from "../stores/FriendStore";
import GeneralUserStore from "../stores/GeneralUserStore";
import UserStore from "../stores/UserStore";
import * as GeneralUserActions from "../actions/GeneralUserActions";
import * as FriendActions from "../actions/FriendActions";
import { Button, Image, Jumbotron, Modal } from "react-bootstrap";
import {Tab} from "react-toolbox";
import Friend from "../components/friend/Friend";
import LibrarySearch from "../components/library/LibrarySearch";
import CustomTabs from "../components/uiPieces/CustomTabs";


export default class Profile extends React.Component {
constructor(props){
    super(props);

    this.getFriends = this.getFriends.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getGames = this.getGames.bind(this);
    this.getGroups = this.getGroups.bind(this);
    this.isFriend = this.isFriend.bind(this);
    this.isUser = this.isUser.bind(this);
    this.onFriendRequestClick = this.onFriendRequestClick.bind(this);
    this.openRequestSentModal = this.openRequestSentModal.bind(this);
    this.closeRequestSentModal = this.closeRequestSentModal.bind(this);
    this.updateFriendRequestButton = this.updateFriendRequestButton.bind(this);

    const friendList = FriendStore.getAll();
    var user = GeneralUserStore.getUser();
    var userID = GeneralUserStore.getUserID();
    var games = GeneralUserStore.getGames();
    const loggedInUserID = UserStore.getUserID();
    var groups = GeneralUserStore.getGroups();
    var showFriendRequestButton = false;

    this.state = {
        btnDisabled: false,
        btnText: "Send Friend Request",
        friendList: friendList,
        games: games,
        index: 0,
        loggedInUserID: loggedInUserID,
        showFriendRequestButton: showFriendRequestButton,
        showRequestSentModal: false,
        user: user,
        userID: userID,
        groups: groups
    };

    GeneralUserActions.getUserData(props.params.userID);
    GeneralUserActions.getGroups(props.params.userID);
    GeneralUserActions.getFriends(props.params.userID);
  }

  componentWillMount() {
    //FriendStore.on("change", this.getFriends);
    GeneralUserStore.on("userChange", this.getUser);
    GeneralUserStore.on("userChange", this.getGames);
    GeneralUserStore.on("change", this.updateFriendRequestButton);
    GeneralUserStore.on("groupsChange", this.getGroups);
    GeneralUserStore.on("friendChange", this.getFriends);
  }

  componentWillUnmount() {
    //FriendStore.removeListener("change", this.getFriends);
    GeneralUserStore.removeListener("userChange", this.getUser);
    GeneralUserStore.removeListener("userChange", this.getGames);
    GeneralUserStore.removeListener("change", this.updateFriendRequestButton);
    GeneralUserStore.removeListener("groupsChange", this.getGroups);
    GeneralUserStore.removeListener("friendChange", this.getFriends);
  }

  getUser(){
    this.setState({
      user: GeneralUserStore.getUser(),
      userID: GeneralUserStore.getUserID()
    });

  }

  getFriends(){
    this.setState({
      friendList: GeneralUserStore.getFriends()
    });
  }

  getGames(){
    this.setState({
      games: GeneralUserStore.getGames()
    });
  }

  getGroups(){
    this.setState({
      groups: GeneralUserStore.getGroups()
    });
  }

  handleTabChange = (index) => {
    this.setState({index});
  };

  openRequestSentModal(){
    this.setState({ showModal: true});
  }

  closeRequestSentModal(){
    this.setState({ showModal: false});
  }

  updateFriendRequestButton(){
    if(!this.isFriend() && !this.isUser())
      this.setState({ showFriendRequestButton: true});
  }

  // returns true if the user featured on the profile page is a friend of
  // the logged-in user
  isFriend(){
    if(!this.state.userID)
      return true;
    /*console.log("in the isFriend Function")
    console.log("user: " + this.state.user)
    console.log("userID: " + this.state.userID)
    console.log("friend list is this long: " + this.state.friendList.length)*/
    var alreadyFriends = false;
    var friends = this.state.friendList; // friends of logged-in user
    for(var i = 0; i < friends.length; i++){
      if(this.state.userID == friends[i].id){
        alreadyFriends = true;
        break;
      }
    }
    console.log("isFriend returned: " + alreadyFriends)
    return alreadyFriends;
  }

  // returns true if the user featured on the profile page is the logged-in user
  isUser(){
    if(!this.state.userID)
      return true;
    if(this.state.loggedInUserID == this.state.userID){
    console.log("isUser returned: true")
      return true;
    }
    else{
      console.log("isUser returned: false")
      return false;
    }
  }

  onFriendRequestClick(){
    this.openRequestSentModal();
    FriendActions.sendFriendRequest(this.state.userID);
    this.setState({
      btnText: "Request Sent!",
      btnDisabled: true
    });

  }

  render() {
    const { params } = this.props;

    const friends = this.state.friendList.map((person) => <Friend isProfilePage={true} key={person.id} {...person}/> );
    const library = this.state.games.map((game) => <MinLibraryItem key={game.id} {...game}/> );
    const groups = this.state.groups.map((group) => <MinGroupItem key={group.id} {...group}/> );

    {/* Button for sending friend request to user featured on profile, if not yet a friend*/}
    var coverBtnStyle = {display: "none"};
    if(this.state.showFriendRequestButton)
        coverBtnStyle = { display: "initial" };

    var coverPhotoUrl = "url('http://cdn.wccftech.com/wp-content/uploads/2016/07/the-legend-of-zelda-breath-of-the-wild-horizon.jpg')";
    if(this.state.user.profile){
      const profile = this.state.user.profile;
      coverPhotoUrl = "url('"+profile.coverPhoto+"')";
    }

    const headerStyle = {
      background: coverPhotoUrl,
      backgroundSize: "cover",
      backgroundPosition: "center"
    };

    const profilePicClass = {
      opacity: 1.0
    };

    const controlPanel = (
    <CustomTabs index={this.state.index} onChange={this.handleTabChange} fixed>
      <Tab label='Library'>
        <LibrarySearch/>
        {library}
      </Tab>
      <Tab label='Friends'><large>{friends}</large></Tab>
      <Tab label='Groups'><large>{groups}</large></Tab>
    </CustomTabs>
    );

      return (
        <div>
        <Modal show={this.state.showRequestSentModal} onHide={this.closeRequestSentModal}>
            <Modal.Header closeButton>
              <Modal.Title>Request Sent!</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button bsStyle="success" onClick={this.closeRequestSentModal}>OK</Button>
            </Modal.Footer>
          </Modal>
          <Jumbotron style={headerStyle}>
            <Image className={profilePicClass} width="150" src={this.state.user.imageUrl} circle responsive/>
            <h2>{this.state.user.username} </h2>
            <Button bsStyle="success" style={coverBtnStyle} onClick={this.onFriendRequestClick} disabled={this.state.btnDisabled}>{this.state.btnText}</Button>
          </Jumbotron>
          {controlPanel}
        </div>
      );
    }
}

class MinLibraryItem extends React.Component {
  render(){
    const {title} = this.props;
    const {imageUrl} = this.props;

    const resize = {
      height:50
    };

    return(
      <div>
        <span>
        <Image width="50" src={imageUrl} alt="Profile Picture" thumbnail responsive/>
          &nbsp;&nbsp;
          <strong>{title}</strong>
        </span>
      </div>
    );
  }
}

class MinGroupItem extends React.Component {
  render(){
    const {id} = this.props;
    const {groupName} = this.props;
    const {coverPhoto} = this.props;

    return(
      <div>
        <span>
          <img width="50" src={coverPhoto} alt="Group Picture"/>
          &nbsp;
          <Link to={`group/${id}`}><strong>{groupName}</strong></Link>
        </span>
      </div>
    );
  }
}
