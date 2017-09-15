import React from "react";
import { Link } from "react-router";
import {Button, ButtonToolbar, ButtonGroup, Modal, Overlay, OverlayTrigger, Popover} from 'react-bootstrap';
import * as LibraryActions from "../../actions/LibraryActions";

export default class LibraryItem extends React.Component {
    constructor(){
        super();
        this.openRemoveGameModal = this.openRemoveGameModal.bind(this);
    		this.closeRemoveGameModal = this.closeRemoveGameModal.bind(this);
        this.state = {
          inviteSentCount: 0,
          inviteButtonText: "Invite friends via text",
          showModal: false
        };

        console.log("inviteSentCount: " + this.state.inviteSentCount);
        //this.handleInvite = this.handleInvite.bind(this);
    }

    getGameInfo(id, event) {
      LibraryActions.getGameInfo(id);
    }

    handleInvite(id, event) {
        LibraryActions.sendTextInvite(id);
        this.setState({
            inviteButtonText: "Sent!"
        });
    }

    removeGame(id, platform, event) {
      console.log("game to remove: " + id + ", " + platform)
      LibraryActions.removeGame(id, platform);
      // add logic to show the games for the correct platform
      //if(platform == "PS3" || platform == "PS4")
      //  LibraryActions.showPlaystationGames();
    }

    openRemoveGameModal() {
    	this.setState({ showModal: true });
  	}

    closeRemoveGameModal() {
    	this.setState({ showModal: false });
  	}



    render() {
        const {imageUrl} = this.props;
        const {title} = this.props;
        const {id} = this.props;
        const platform = this.props.platform.title;

        const titleTextStyle = {};
        const coverStyle = {
            cursor: "pointer"
        }
        const itemStyle = {
            margin: 25,
        };


        const popoverClickRootClose = (
            <Popover id="popover-trigger-click-root-close" title={title}>
                <ButtonGroup vertical>
                    <Button bsStyle="success" onClick={this.handleInvite.bind(this, id)} block>{this.state.inviteButtonText}</Button>
                    <Button onClick={this.getGameInfo.bind(this, id)}><Link to="game">Game information</Link></Button>
                    <Button>Write a review</Button>
                    <Button>Read friend reviews</Button>
                    <Button bsStyle="danger" onClick={this.openRemoveGameModal}>Remove game</Button>
                </ButtonGroup>
            </Popover>
        );

        return (

            <span style={itemStyle}>

                    <Modal show={this.state.showModal} onHide={this.closeRemoveGameModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>Are You Sure?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <p>Remove game from library?</p>

                      </Modal.Body>

                      <Modal.Footer>
                        <ButtonToolbar>
                          <Button bsStyle="danger" onClick={this.removeGame.bind(this, id, platform)}>Remove</Button>
                          <Button onClick={this.closeRemoveGameModal}>Cancel</Button>
                        </ButtonToolbar>
                      </Modal.Footer>
                    </Modal>

                    <OverlayTrigger trigger="click" rootClose placement="right" overlay={popoverClickRootClose}>
                        <img src={imageUrl} style={coverStyle} alt="Game cover"/>
                    </OverlayTrigger>
            </span>

        );
    }
}
