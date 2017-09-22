import React from "react";
import FriendStore from "../stores/FriendStore";
import GeneralUserStore from "../stores/GeneralUserStore";
import * as GeneralUserActions from "../actions/GeneralUserActions";
import { Tab, Tabs, Image, Jumbotron } from "react-bootstrap";
import Friend from "../components/friend/Friend";
import LibrarySearch from "../components/library/LibrarySearch";

export default class Profile extends React.Component {
constructor(props){
    super(props);

    this.getFriends = this.getFriends.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getGames = this.getGames.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    const friendList = FriendStore.getAll();
    var user = GeneralUserStore.getUser();
    var games = GeneralUserStore.getGames();

    this.state = {
        friendList: friendList,
        user: user,
        games: games,
        activeTab: props.activeTab || 1
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

  handleSelect(selectedTab) {
    // The active tab must be set into the state so that
    // the Tabs component knows about the change and re-renders.
    this.setState({
      activeTab: selectedTab
    });
  }

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

  /*const gridInstance = (
    <Grid>
      <Row className="show-grid">
        <Col md={12}> <h2> Game Library: </h2>  </Col>
      </Row>
      <hr/>
      <Row className="show-grid">
        <Col sm={6} md={6}> <h2>Friends: </h2> <br/> {friends}  <br/></Col>
        <Col sm={6} md={6}> <h2>Groups: </h2> <br/><br/></Col>
      </Row>
    </Grid>
  );*/

  const controlPanel = (
    <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
        <Tab eventKey={1} title="Library">
          {library}
          <LibrarySearch/>
        </Tab>
        <Tab eventKey={2} title="Friends">{friends}</Tab>
        <Tab eventKey={3} title="Groups">Tab 3 content</Tab>
      </Tabs>
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
          {/*<Image width="75" src={imageUrl} rounded responsive/> */}
          &nbsp;&nbsp;
          <strong>{title}</strong> 
        </span>
      </div>
    );
  }
}