import React from "react";
import FriendStore from "../../stores/FriendStore";

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
        const friends = this.state.friendList.map((person) => <FriendPlaying key={person.ID} {...person}/> );
        
        console.log("In the render now playing list");
        console.log(friends);    
        return (
            <div class="well pre-scrollable">
                {/*<h3 class="text-center"> Playing Now: </h3>*/}
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
                <img src={imageUrl} alt="Mountain View"/>
                <hr/>
            </div>
        );
    }
}