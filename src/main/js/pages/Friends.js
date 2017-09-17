import React from "react";
import FriendStore from "../stores/FriendStore";
import Friend from "../components/friend/Friend"


export default class Friends extends React.Component {
    constructor(){
        super();
        this.getFriends = this.getFriends.bind(this);
        const friendList = FriendStore.getAll();

        this.state = {
            friendList: friendList,
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

   

    render() {
        const friends = this.state.friendList.map((person) => <Friend key={person.id} {...person}/> );

        return (
            <div class="well">
                <h1 class="text-center">Friends</h1>
                <br/>
                <div>{friends}</div>
            </div>
        );
    }
}