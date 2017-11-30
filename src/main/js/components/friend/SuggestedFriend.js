import React from "react";
import * as FriendActions from "../../actions/FriendActions"
import FriendStore from "../../stores/FriendStore";
import {Button, ButtonToolbar, ButtonGroup, Overlay, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap';
import { Link } from "react-router";
import {Image} from "react-bootstrap";


export default class SuggestedFriend extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showFriendAddedModal: false
        };

    this.openFriendAddedModal = this.openFriendAddedModal.bind(this);
    this.closeFriendAddedModal = this.closeFriendAddedModal.bind(this);

    }

    addFriend(friendId) {
      FriendActions.sendFriendRequest(friendId);
      this.openFriendAddedModal();
    }


    openFriendAddedModal() {
      this.setState({ showfriendAddedModal: true });
    }

    closeFriendAddedModal(friendId) {
      this.setState({ showfriendAddedModal: false });
      FriendActions.removeSuggestedFriend(friendId)
    }

    render() {
        const {username} = this.props;
        const {id} = this.props;
        const {imageUrl} = this.props;

        const spacingStyle = {
        	display: "inlineBlock",
        	width: "30px"
        }

        const hrStyle = {
          border: "none",
          background: "#D3D3D3",
          color: "#D3D3D3"
        }

        const tooltip = (
  			<Tooltip id="tooltip"><strong>See their profile.</strong></Tooltip>
  		  );




        return (
            <div class="autosize-container">
                <span>
                <Image width="50" src={imageUrl} alt="Profile Picture" responsive thumbnail/>
                 &nbsp;&nbsp;
    				<OverlayTrigger placement="right" overlay={tooltip}>
      					<Link to={`profile/${id}`}><strong>{username}</strong></Link>
            </OverlayTrigger>
                <Button className="pull-right" bsStyle="success" onClick={this.addFriend.bind(this,id)}>
                  Send friend request
                </Button>
                </span>

                <hr style={hrStyle}/>


            {/* Modal shown after user sends a friend request*/}
            <Modal show={this.state.showfriendAddedModal} onHide={this.closeFriendAddedModal.bind(this, id)}>
                <Modal.Header closeButton>
                  <Modal.Title>A friend request has been sent to {username}!</Modal.Title>
                </Modal.Header>

              <Modal.Footer>
                <ButtonToolbar>
                  <Button bsStyle="success" onClick={this.closeFriendAddedModal.bind(this, id)}>OK</Button>
                </ButtonToolbar>
              </Modal.Footer>
            </Modal>
            </div>
        );
    }
}
