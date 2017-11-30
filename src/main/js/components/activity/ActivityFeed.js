import React from "react";
import ActivityStore from "../../stores/ActivityStore";
import FriendStore from "../../stores/FriendStore";
import * as PostActions from "../../actions/PostActions";
import {Image} from "react-bootstrap";


export default class ActivityFeed extends React.Component {
    constructor(){
        super();
        this.getActivity = this.getActivity.bind(this);
        this.getFriends = this.getFriends.bind(this);
        PostActions.getFriendsActivity();
        const activityList = ActivityStore.getAll();
        const friendList = FriendStore.getAll();

        this.state = {
          activityList : activityList,
          friendList: friendList
        };
    }

    componentWillMount() {
        ActivityStore.on("change", this.getActivity);
        FriendStore.on("change", this.getFriends);
    }

    componentWillUnmount() {
        ActivityStore.removeListener("change", this.getActivity);
        FriendStore.removeListener("change", this.getFriends);
    }

    getActivity(){
        this.setState({
            activityList: ActivityStore.getAll()
        });
    }

    getFriends(){
        this.setState({
            friendList: FriendStore.getAll()
        });
    }

  render() {
    var images = [];
    var newActivityList = jQuery.extend(true, [], this.state.activityList);
    var newFriendList = jQuery.extend(true, [], this.state.friendList);

    newActivityList.forEach((a) => {
        newFriendList.forEach((f) => {
            if(a.userId == f.id){
                a.imageUrl = f.imageUrl;
            }
        });
    });

    var activities = [];
    if(newActivityList){
      activities = this.state.activityList.map((a) => <Item key={a.ID} {...a}/> );
    }
    else { activities = "Loading posts..."}

    const textareaStyle = {
        height: 50,
        resize: "none",
        borderRadius: 4,
        width: "100%"
    };

    return (
        <div>
            {activities}
        </div>
    );
  }
}

class Item extends React.Component {
    render(){
        const {username} = this.props;
        const {content} = this.props;
        const {imageUrl} = this.props;

        return (
            <div>
                <p> <Image width="50" src={imageUrl} alt="Profile Picture" thumbnail responsive/> {username} {content} </p>
            <hr/>
            </div>
        );
    }
}
