import React from "react";
import FriendStore from "../stores/FriendStore";
import Friend from "../components/friend/Friend";
import SuggestedFriend from "../components/friend/SuggestedFriend";
import CustomTabs from "../components/uiPieces/CustomTabs";
import {Tab} from "react-toolbox";

export default class Friends extends React.Component {
    constructor(){
        super();
        this.getFriends = this.getFriends.bind(this);
        const friendList = FriendStore.getAll();
        const suggestedFriendList = FriendStore.getSuggestedFriends();

        this.state = {
            friendList: friendList,
            suggestedFriendList: suggestedFriendList,
            index: 0
        };
    }

    componentWillMount() {
        FriendStore.on("change", this.getFriends);

    }

    componentWillUnmount() {
        FriendStore.removeListener("change", this.getFriends);
    }

    getFriends(){
        this.setState({
            friendList: FriendStore.getAll(),
            suggestedFriendList: FriendStore.getSuggestedFriends()
        });
    }

    handleTabChange = (index) => {
      this.setState({index});
    };


    render() {
        const friends = this.state.friendList.map((person) => <Friend isProfilePage={false} key={person.id} {...person}/> );
        const suggestedFriends = this.state.suggestedFriendList.map((person) => <SuggestedFriend key={person.id} {...person}/> );


        return (
            <div class="well">
                <h1 class="text-center">Friends</h1>
                <br/>
                <CustomTabs index={this.state.index} onChange={this.handleTabChange} fixed>
                  <Tab label='My Friends'>
                    <div>{friends}</div>
                  </Tab>
                  <Tab label='Suggested'>
                    <div>{suggestedFriends}</div>
                  </Tab>
                </CustomTabs>
            </div>
        );
    }
}
