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

    this.getMyFriends = this.getMyFriends.bind(this);
    this.getProfileFriends = this.getProfileFriends.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getLoggedInUser = this.getLoggedInUser.bind(this);
    this.isMeOrFriend = this.isMeOrFriend.bind(this);
    this.onFriendRequestClick = this.onFriendRequestClick.bind(this);
    this.openRequestSentModal = this.openRequestSentModal.bind(this);
    this.closeRequestSentModal = this.closeRequestSentModal.bind(this);

    const myFriendList = FriendStore.getAll();
    // the friends of whoever's profile is currently showing:
    const generalFriendList = GeneralUserStore.getFriends();
    var user = GeneralUserStore.getUser();
    var userID = GeneralUserStore.getUserID();
    var games = GeneralUserStore.getGames();
    const loggedInUserID = UserStore.getUserID();
    var groups = GeneralUserStore.getGroups();

    this.state = {
        btnDisabled: false,
        btnText: "Send Friend Request",
        myFriendList: myFriendList,
        generalFriendList: generalFriendList,
        games: games,
        index: 0,
        loggedInUserID: loggedInUserID,
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
    FriendStore.on("change", this.getMyFriends);
    GeneralUserStore.on("friendChange", this.getProfileFriends);
    GeneralUserStore.on("userChange", this.getUser);
    UserStore.on("change", this.getLoggedInUser);
  }

  componentWillUnmount() {
    FriendStore.removeListener("change", this.getMyFriends);
    GeneralUserStore.removeListener("friendChange", this.getProfileFriends);
    GeneralUserStore.removeListener("userChange", this.getUser);
    UserStore.removeListener("change", this.getLoggedInUser);
  }

  getLoggedInUser(){
    this.setState({
      loggedInUserID: UserStore.getUserID()
    });
  }

  getUser(){
    this.setState({
      user: GeneralUserStore.getUser(),
      userID: GeneralUserStore.getUserID(),
      games: GeneralUserStore.getGames(),
      groups: GeneralUserStore.getGroups()
    });
  }

  getProfileFriends(){
    this.setState({
      generalFriendList: GeneralUserStore.getFriends()
    });
  }

  getMyFriends(){
    this.setState({
      myFriendList: FriendStore.getAll()
    });
  }

  /* When a tab is clicked (e.g. games, friends, groups), updates tab state */
  handleTabChange = (index) => {
    this.setState({index});
  };

  openRequestSentModal(){
    this.setState({ showModal: true});
  }

  closeRequestSentModal(){
    this.setState({ showModal: false});
  }


  // returns true if the supplied userid belongs to the user or a friend of
  // the user
  isMeOrFriend(userID){
    if(!this.state.loggedInUserID){
       return false;
     }
    if(userID === this.state.loggedInUserID){
      return true;
    }
    var friends = this.state.myFriendList; // friends of logged-in user
    if(this.state.myFriendList.length === 0) {
      return false
    }
    for(var i = 0; i < friends.length; i++){
      if(userID === friends[i].id){
        return true;
      }
    }
    return false;
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
    const userID = parseInt(params.userID); // convert to int
    const showFriendRequestButton = !this.isMeOrFriend(userID);

    const friends = this.state.generalFriendList.map((person) => <Friend isProfilePage={true} key={person.id} {...person}/> );
    const library = this.state.games.map((game) => <MinLibraryItem key={game.id} {...game}/> );
    const groups = this.state.groups.map((group) => <MinGroupItem key={group.id} {...group}/> );

    {/* Button for sending friend request to user featured on profile, if not yet a friend*/}
    var coverBtnStyle = {display: "none"};
    if(showFriendRequestButton)
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
