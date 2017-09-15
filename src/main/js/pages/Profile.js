import React from "react";
import FriendStore from "../stores/FriendStore";
import GeneralUserStore from "../stores/GeneralUserStore";
import * as GeneralUserActions from "../actions/GeneralUserActions"
import { Grid, Row, Col, Image, Jumbotron } from "react-bootstrap";
import Friend from "../components/friend/Friend"

export default class Profile extends React.Component {
constructor(props){
    super(props);

    this.getFriends = this.getFriends.bind(this);
    this.getUser = this.getUser.bind(this);
    const friendList = FriendStore.getAll();
    var user = GeneralUserStore.getUser();
    console.log("ummmmmmmmmmmmmmmmmmmm");

    this.state = {
        friendList: friendList,
        user: user
    };
    GeneralUserActions.getUserData(props.params.userID);
  }

  componentWillMount() {
    console.log("in componentWillMount");
    FriendStore.on("change", this.getFriends);
    GeneralUserStore.on("change", this.getUser);
  }

  componentWillUnmount() {
    console.log("in componentWillUnmount");
    FriendStore.removeListener("change", this.getFriends);
    GeneralUserStore.removeListener("change", this.getUser);
  }
/*
  componentWillReceiveProps(nextProps){
    this.setState({
      children: nextProps.children
    });
  }*/

  getUser(){
    console.log("in getUser in Profile.js");
    this.setState({
      user: GeneralUserStore.getUser()
    });
  }

  getFriends(){
    this.setState({
        friendList: FriendStore.getAll()
    });
  } 

  render() {
    const { params } = this.props;
    //console.log(params.userID);
    
    const friends = this.state.friendList.map((person) => <Friend key={person.id} {...person}/> );
    console.log(this.state.user)

    const headerStyle = {
      background: "url('http://cdn.wccftech.com/wp-content/uploads/2016/07/the-legend-of-zelda-breath-of-the-wild-horizon.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    };

    const profilePicClass = {
      opacity: 1.0
    };

  const gridInstance = (
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
  );

      return (
          <div>
            <Jumbotron style={headerStyle}>
              <Image className={profilePicClass} src="https://images.igdb.com/igdb/image/upload/t_cover_big/kln2xrk7av3dzrt60auq.png" circle responsive/> 
              <h2>{this.state.user.username} </h2>
            </Jumbotron>
            {gridInstance}
              {/*<h1 class="text-center">Profile Page Coming Soon...</h1>*/}
            
          </div>
      );
    }
}