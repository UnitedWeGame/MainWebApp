import React from "react";
import FriendStore from "../stores/FriendStore";
import {Button, ButtonToolbar, ButtonGroup, Overlay, OverlayTrigger, Tooltip} from 'react-bootstrap';


export default class Friends extends React.Component {
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
        const friends = this.state.friendList.map((person) => <Friend key={person.id} {...person}/> );
        
        console.log("IN THE RENDER ALL FRIENDS FUNCTION");
        console.log(friends);

        return (

            <div class="well">
                <h1 class="text-center">Friends</h1>
                <br/>
                <div>{friends}</div>
            </div>
        );
    }
}

class Friend extends React.Component {
    render() {
        const {username} = this.props;
        const {imageUrl} = this.props;
        const spacingStyle = {
        	display: "inlineBlock",
        	width: "30px"
        }
        
        const tooltip = (
  			<Tooltip id="tooltip"><strong>Click to see their game library.</strong></Tooltip>
  		);

        return (
            <div class="autosize-container">
                <span>
                <img src={imageUrl} alt="Profile Picture"/>
                 &nbsp;&nbsp;
    			<OverlayTrigger placement="right" overlay={tooltip}>
      				<Button bsStyle="link" bsSize="large"><strong>{username}</strong></Button>
    			</OverlayTrigger>
                </span>
                 
                <hr/>
            </div>
        );
    }
}
