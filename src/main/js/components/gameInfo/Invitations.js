import React from "react";
import {Button, Checkbox, FormGroup} from "react-bootstrap";
import * as GameInfoActions from "../../actions/GameInfoActions";
import GameStore from "../../stores/GameStore";

export default class Invitations extends React.Component {
  constructor(props){
      super(props);
      this.updateFriendList = this.updateFriendList.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.addFriendToInviteList = this.addFriendToInviteList.bind(this);
      this.removeFriendFromInviteList = this.removeFriendFromInviteList.bind(this);


      var friendList = GameStore.getFriendsWhoOwn();
      var friendsToInvite = [];
      this.state = {
          friendList: friendList, // all friends
          friendsToInvite: friendsToInvite,
          gameId: this.props.gameInfo.id
      };
  }

  componentWillMount() {
      GameStore.on("change", this.updateFriendList);
  }

  componentWillUnmount() {
      GameStore.removeListener("change", this.updateFriendList);
  }

  updateFriendList(){
    this.setState({
      friendList: GameStore.getFriendsWhoOwn()
    });
  }

  addFriendToInviteList(friendId){
    var friendsToInvite = this.state.friendsToInvite;
    if(friendsToInvite.includes(friendId)) return;
    friendsToInvite.push(friendId);
    this.setState({
      friendsToInvite: friendsToInvite
    });
  }

  removeFriendFromInviteList(friendId){
    var friendsToInvite = this.state.friendsToInvite;
    for(var i = friendsToInvite.length-1; i>=0; i--) {
      if( friendsToInvite[i] === friendId)
        friendsToInvite.splice(i,1);
    }
    this.setState({
      friendsToInvite: friendsToInvite
    });
  }



  handleSubmit(event){
    event.preventDefault();
    GameInfoActions.sendSmsInvites(this.state.gameId, this.state.friendsToInvite);
  }

  render(){
    const friends = this.state.friendList.map((f) => <FriendWhoOwns
      key={f.id} addFriendToInviteList={this.addFriendToInviteList}
      removeFriendFromInviteList={this.removeFriendFromInviteList}
      {...f}
      /> );
    var text = "";

    if(friends.length == 0){
      return(
        <div>
          <br/>
          <h3 class="text-center">No friends own this game...</h3>
        </div>
      );
    }

    else{
      return(
        <div>
          <br/>
          <h3 class="text-center">Choose friends to receive an SMS text invitation</h3>
          <br/>
          <div style={{paddingLeft: "30%"}}>
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                {friends}
              </FormGroup>
              <Button bsStyle="success" type="submit">Send</Button>
            </form>
          </div>
        </div>
      );
    }

  }
}

class FriendWhoOwns extends React.Component {
  constructor(props){
      super(props);
      this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
      this.state = { checkboxChecked: false}
  }

  // called whenever a friend's checkbox is selected or unselected
  handleCheckboxChange(friendId, event){
    this.setState({ checkboxChecked: event.target.checked});
    if(event.target.checked)
      this.props.addFriendToInviteList(friendId);
    else
      this.props.removeFriendFromInviteList(friendId);
  }

  render(){
    const {id} = this.props;
    const {username} = this.props;

    return (
      <div>
        <Checkbox checked={this.state.checkboxChecked}
          onChange={this.handleCheckboxChange.bind(this, id)}>
          {username}
        </Checkbox>

        <hr/>
      </div>

    );
  }
}
