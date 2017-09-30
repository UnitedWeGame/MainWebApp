import React from "react";
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
        userID: userID
    };

    GeneralUserActions.getUserData(props.params.userID);
  }

  componentWillMount() {
    FriendStore.on("change", this.getFriends);
    GeneralUserStore.on("change", this.getUser);
    GeneralUserStore.on("change", this.getGames);
    GeneralUserStore.on("change", this.updateFriendRequestButton);

  }

  componentWillUnmount() {
    FriendStore.removeListener("change", this.getFriends);
    GeneralUserStore.removeListener("change", this.getUser);
    GeneralUserStore.removeListener("change", this.getGames);
    GeneralUserStore.removeListener("change", this.updateFriendRequestButton);

  }

  getUser(){
    this.setState({
      user: GeneralUserStore.getUser(),
      userID: GeneralUserStore.getUserID()
    });

  }

  getFriends(){
    this.setState({
      friendList: FriendStore.getAll()
    });
  }

  getGames(){
    this.setState({
      games: GeneralUserStore.getGames()
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
    console.log("in the isFriend Function")
    console.log("user: " + this.state.user)
    console.log("userID: " + this.state.userID)
    console.log("friend list is this long: " + this.state.friendList.length)
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

    const friends = this.state.friendList.map((person) => <Friend key={person.id} {...person}/> );
    const library = this.state.games.map((game) => <MinLibraryItem key={game.id} {...game}/> );

    {/* Button for sending friend request to user featured on profile, if not yet a friend*/}
    var coverBtnStyle = {display: "none"};
    if(this.state.showFriendRequestButton)
        coverBtnStyle = { display: "initial" };



    const headerStyle = {
      background: "url('http://cdn.wccftech.com/wp-content/uploads/2016/07/the-legend-of-zelda-breath-of-the-wild-horizon.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    };

    const profilePicClass = {
      opacity: 1.0
    };

    const controlPanel = (
    <CustomTabs index={this.state.index} onChange={this.handleTabChange} fixed>
      <Tab label='Library'>
        {library}
        <LibrarySearch/>
      </Tab>
      <Tab label='Friends'><large>{friends}</large></Tab>
      <Tab label='Groups'><large>To do...</large></Tab>
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
        <img width="50" src={imageUrl} alt="Profile Picture"/>
          &nbsp;&nbsp;
          <strong>{title}</strong>
        </span>
      </div>
    );
  }
}
