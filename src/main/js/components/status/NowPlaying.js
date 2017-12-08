import React from "react";
import FriendStore from "../../stores/FriendStore";

/*
* Component that appears throughout the site and displays a list of the user's 
* friends who are currently gaming on platforms the user owns.
*/
export default class NowPlaying extends React.Component {
    constructor(){
        super();
        this.getFriends = this.getFriends.bind(this);
        const friendList = FriendStore.getPlayingNow();

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
            friendList: FriendStore.getPlayingNow()
        });
    }

    render() {
        var friends = this.state.friendList.map((person) => <FriendPlaying key={person.ID} {...person}/> );
        if(friends.length == 0) friends = "Nobody seems to be playing at the moment...";

        return (
            <div class="well pre-scrollable">
                <div>{friends}</div>
            </div>
        );
    }
}

class FriendPlaying extends React.Component {
    render() {

        const {gamerTag} = this.props;
        const {game} = this.props;
        const {platform} = this.props;
        const {imageUrl} = this.props;

        return (
            <div class="autosize-container" id="friend">
                <p>
                 <strong>{gamerTag}</strong> is playing</p>
                <p>{game} <br/> on {platform}</p>
                <img style={{width: 70, height: 70}} src={imageUrl} alt="Mountain View"/>
                <hr/>
            </div>
        );
    }
}
