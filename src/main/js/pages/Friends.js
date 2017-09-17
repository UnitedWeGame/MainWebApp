import React from "react";
import FriendStore from "../stores/FriendStore";
import Friend from "../components/friend/Friend"
import CustomTabs from "../components/uiPieces/CustomTabs";
import {Tab} from "react-toolbox";

export default class Friends extends React.Component {
    constructor(){
        super();
        this.getFriends = this.getFriends.bind(this);
        const friendList = FriendStore.getAll();

        this.state = {
            friendList: friendList,
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
            friendList: FriendStore.getAll()
        });
    }

    handleTabChange = (index) => {
      this.setState({index});
    };


    render() {
        const friends = this.state.friendList.map((person) => <Friend key={person.id} {...person}/> );

        return (
            <div class="well">
                <h1 class="text-center">Friends</h1>
                <br/>
                <CustomTabs index={this.state.index} onChange={this.handleTabChange} fixed>
                  <Tab label='My Friends'>
                    <div>{friends}</div>
                  </Tab>
                  <Tab label='Suggested'><large>Not yet implemented</large></Tab>
                </CustomTabs>
            </div>
        );
    }
}
