import React from "react";
import {Button} from "react-bootstrap";
import * as ChatActions from "../../actions/ChatActions";
import OnlineNowStore from "../../stores/OnlineNowStore";
import * as OnlineNowActions from "../../actions/OnlineNowActions";

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

      return (
          <div class="autosize-container" id="friend">
              <p><img src={imageUrl} alt="Profile Picture"/>
              &nbsp;
              <Button bsStyle="link" onClick={this.startChat.bind(this, username, imageUrl)}><strong>{username}</strong></Button></p>
              <hr/>
          </div>
      );
  }
}
