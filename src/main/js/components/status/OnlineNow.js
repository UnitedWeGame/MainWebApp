import React from "react";
import {Button, Overlay, OverlayTrigger, Tooltip} from "react-bootstrap";
import * as ChatActions from "../../actions/ChatActions";
import OnlineNowStore from "../../stores/OnlineNowStore";
import * as OnlineNowActions from "../../actions/OnlineNowActions";
import {Image} from "react-bootstrap";

/*
* Component that appears throughout the site and displays a list of the user's 
* friends who are currently logged in to UnitedWeGame.
*/
export default class OnlineNow extends React.Component {
    constructor(props){
        super(props);
        OnlineNowActions.getOnlineNow();

        this.getFriends = this.getFriends.bind(this);
        const friendList = OnlineNowStore.getAll();

        this.state = {
            friendList: friendList
        };
    }

    componentWillMount() {
        OnlineNowStore.on("change", this.getFriends);
    }

    componentWillUnmount() {
        OnlineNowStore.removeListener("change", this.getFriends);
    }

    getFriends(){
        this.setState({
            friendList: OnlineNowStore.getAll()
        });
    }


    render() {
        var friends = this.state.friendList.map((person) => <FriendOnline key={person.ID} {...person}/> );
        if(friends.length == 0) friends = "No friends are online...";
        return (
            <div class="well pre-scrollable">
                {/*<h3 class="text-center"> Online Now: </h3>*/}
                <div>{friends}</div>
            </div>
        );
    }
}

/*
* Individual friend component that appears in the Online now component
*/
class FriendOnline extends React.Component {
  constructor(props){
      super(props);
      this.startChat = this.startChat.bind(this);
  }

  startChat(username, imageUrl){
    ChatActions.startSoloChat(username, imageUrl);
  }

  render() {
      const {username} = this.props;
      const {imageUrl} = this.props;

      const tooltipChat = (
      <Tooltip id="tooltip"><strong>Chat</strong></Tooltip>
      );

      return (
          <div class="autosize-container" id="friend">
              <p>
                  <Image width="50" src={imageUrl} alt="Profile Picture" thumbnail responsive/>
                &nbsp;
                <OverlayTrigger placement="bottom" overlay={tooltipChat}>
                  <Button bsStyle="link" onClick={this.startChat.bind(this, username, imageUrl)}><strong>{username}</strong></Button>
                </OverlayTrigger>
              </p>
              <hr/>
          </div>
      );
  }
}
