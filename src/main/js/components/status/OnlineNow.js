import React from "react";
import OnlineNowStore from "../../stores/OnlineNowStore";

export default class OnlineNow extends React.Component {
    constructor(){
        super();
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
        const friends = this.state.friendList.map((person) => <FriendOnline key={person.ID} {...person}/> );
        return (
            <div class="well pre-scrollable">
                <h3 class="text-center"> Online Now: </h3>
                <div>{friends}</div>
            </div>
        );
    }
}


class FriendOnline extends React.Component {
    render() {
        const {login} = this.props;
        const {imageUrl} = this.props;

        return (
            <div class="autosize-container" id="friend">
                <p><img src={imageUrl} alt="Mountain View"/>
                    {login} is currently online</p>
                <hr/>
            </div>
        );
    }
}