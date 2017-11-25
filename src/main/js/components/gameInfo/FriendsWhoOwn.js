import React from "react";
import * as GameInfoActions from "../../actions/GameInfoActions";
import GameStore from "../../stores/GameStore";

export default class FriendsWhoOwn extends React.Component {
  constructor(){
      super();
      this.updateFriendList = this.updateFriendList.bind(this);

      var friendList = GameStore.getFriendsWhoOwn();

      this.state = {
          friendList: friendList
      };
  }

  componentWillMount() {
      GameStore.on("change", this.updateFriendList);
  }

  componentWillUnmount() {
      GameStore.removeListener("change", this.updateFriendList);
  }

  updateFriendList(){
    console.log("Calling GameStore.getFriendsWhoOwn() inside FriendsWhoOwn Class")
    this.setState({
      friendList: GameStore.getFriendsWhoOwn()
    });
  }

  render(){
    const friends = this.state.friendList.map((f) => <FriendWhoOwns key={f.id} {...f}/> );
    var text = "";
    if(friends.length == 0)
      text = "No friends own this game..."
    return(
      <div style={{paddingLeft: "10%"}}>
        <br/>
        <h3 class="text-center">{text}</h3>
        {friends}
      </div>
    );

  }
}

class FriendWhoOwns extends React.Component {

  render(){
    const {id} = this.props;
    const {username} = this.props;
    const {profilePic} = this.props;

    return (
      <div class="autosize-container">
        <span>
          <img src={profilePic} alt="Profile picture"/>
          &nbsp;&nbsp;
          <strong>{username}</strong>
        </span>
        <hr/>
      </div>

    );
  }
}
