import React from "react";
import FriendPlaying from "./FriendPlaying";
import FriendStore from "../../stores/FriendStore";

export default class NowPlaying extends React.Component {
    constructor(){
        super();
        this.getFriends = this.getFriends.bind(this);
        const friendList = FriendStore.getAll();

        this.state = {
            friendList: friendList
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
        const friends = this.state.friendList.map((person) => <FriendPlaying key={person.ID} {...person}/> );
        return (
            <div>
                <div>{friends}</div>
            </div>
        );
    }
}