import React from "react";
import {Button, ButtonToolbar, ButtonGroup, Glyphicon, Overlay, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap';
import { Link } from "react-router";
import * as FriendActions from "../../actions/FriendActions"
import FriendStore from "../../stores/FriendStore";
import * as ChatActions from "../../actions/ChatActions";


export default class Friend extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showUserInfoModal: false,
            showRemoveFriendModal: false
        };

		this.openInfoModal = this.openInfoModal.bind(this);
		this.closeInfoModal = this.closeInfoModal.bind(this);
    this.openRemoveFriendModal = this.openRemoveFriendModal.bind(this);
    this.closeRemoveFriendModal = this.closeRemoveFriendModal.bind(this);
    this.startChat = this.startChat.bind(this);

    }

    removeFriend(id) {
      FriendActions.removeFriend(id);
      this.closeRemoveFriendModal();
    }

  	openInfoModal() {
    	this.setState({ showUserInfoModal: true });
  	}

    closeInfoModal() {
    	this.setState({ showUserInfoModal: false });
  	}

    openRemoveFriendModal() {
      this.setState({ showRemoveFriendModal: true });
    }

    closeRemoveFriendModal() {
      this.setState({ showRemoveFriendModal: false });
    }

    startChat(username, imageUrl){
      ChatActions.startSoloChat(username, imageUrl);
    }

    render() {
        const {username} = this.props;
        const {id} = this.props;
        const {imageUrl} = this.props;
        const {games} = this.props;
        const {gamerIdentifiers} = this.props;

        var gamertag = "";
        if(gamerIdentifiers[0])
        	gamertag = gamerIdentifiers[0].identifier;
        else
        	gamertag = "No gamertag found";


        var gamesStr = "";
        for(var i = 0; i < games.length; i++){
        	gamesStr += (games[i].title + " for " + games[i].platform.title + "\n");
		}




        const spacingStyle = {
        	display: "inlineBlock",
        	width: "30px"
        }

        const hrStyle = {
          border: "none",
          background: "#D3D3D3",
          color: "#D3D3D3"
        }

        const tooltipProfile = (
  			<Tooltip id="tooltip"><strong>See their profile.</strong></Tooltip>
  		  );

        const tooltipRemove = (
  			<Tooltip id="tooltip"><strong>Unfriend</strong></Tooltip>
  		  );

        const tooltipChat = (
  			<Tooltip id="tooltip"><strong>Send/Read messages</strong></Tooltip>
  		  );




        return (
            <div class="autosize-container">
                <span>
                <img src={imageUrl} alt="Profile Picture"/>
                 &nbsp;&nbsp;
                 <OverlayTrigger placement="right" overlay={tooltipProfile}>
      					      <Link to={`profile/${id}`}><strong>{username}</strong></Link>
                 </OverlayTrigger>

                 <ButtonToolbar className="pull-right">
                 <OverlayTrigger placement="bottom" overlay={tooltipChat}>
                    <Button bsStyle="link" bsSize="small" onClick={this.startChat.bind(this, username, imageUrl)}>
                    <Glyphicon glyph="comment" />
                    </Button>
                </OverlayTrigger>

                <OverlayTrigger placement="bottom" overlay={tooltipRemove}>
                   <Button className="pull-right" bsStyle="link" bsSize="small" onClick={this.openRemoveFriendModal}>
                   <Glyphicon glyph="remove" />
                   </Button>
               </OverlayTrigger>
               </ButtonToolbar>

                </span>

                <hr style={hrStyle}/>

		        <Modal show={this.state.showUserInfoModal} onHide={this.closeInfoModal}>
		          	<Modal.Header closeButton>
		            	<Modal.Title><h3>{username}</h3></Modal.Title>
		          	</Modal.Header>
		          	<Modal.Body>
        				<h4>XBox Gamertag</h4>
        				{gamertag}
        				<hr />
		          		<h4>Games They Own</h4>
			            {gamesStr.split("\n").map(i => {
            				return <div>{i}</div>;
        				})}

		          </Modal.Body>
		          <Modal.Footer>
		            <Button onClick={this.closeInfoModal}>Close</Button>
		          </Modal.Footer>
		        </Modal>

            {/* Modal asking user to verify they want to unfriend someone*/}
            <Modal show={this.state.showRemoveFriendModal} onHide={this.closeRemoveFriendModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Are you sure you want to unfriend {username}?</Modal.Title>
                </Modal.Header>

              <Modal.Footer>
                <ButtonToolbar>
                  <Button bsStyle="danger" onClick={this.removeFriend.bind(this, id)}>Unfriend</Button>
                  <Button onClick={this.closeRemoveFriendModal}>Cancel</Button>
                </ButtonToolbar>
              </Modal.Footer>
            </Modal>
            </div>
        );
    }
}
