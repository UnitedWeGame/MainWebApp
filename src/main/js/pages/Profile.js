import React from "react";
import FriendStore from "../stores/FriendStore";
import GeneralUserStore from "../stores/GeneralUserStore";
import * as GeneralUserActions from "../actions/GeneralUserActions";
import { Image, Jumbotron } from "react-bootstrap";
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
    const friendList = FriendStore.getAll();
    var user = GeneralUserStore.getUser();
    var games = GeneralUserStore.getGames();

    this.state = {
        friendList: friendList,
        user: user,
        games: games,
        index: 0
    };
    GeneralUserActions.getUserData(props.params.userID);
  }

  componentWillMount() {
    FriendStore.on("change", this.getFriends);
    GeneralUserStore.on("change", this.getUser);
    GeneralUserStore.on("change", this.getGames);
  }

  componentWillUnmount() {
    FriendStore.removeListener("change", this.getFriends);
    GeneralUserStore.removeListener("change", this.getUser);
    GeneralUserStore.removeListener("change", this.getGames);
  }

  getUser(){
    this.setState({
      user: GeneralUserStore.getUser()
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

  render() {
    const { params } = this.props;
    
    const friends = this.state.friendList.map((person) => <Friend key={person.id} {...person}/> );
    const library = this.state.games.map((game) => <MinLibraryItem key={game.id} {...game}/> );

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
          <Jumbotron style={headerStyle}>
            <Image className={profilePicClass} width="150" src={this.state.user.imageUrl} circle responsive/> 
            <h2>{this.state.user.username} </h2>
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