import React from "react";
import { Link } from "react-router";
import {Button, ButtonToolbar, ButtonGroup, Modal, Overlay, OverlayTrigger, Popover} from 'react-bootstrap';
import * as LibraryActions from "../../actions/LibraryActions";

export default class LibraryItem extends React.Component {
    constructor(props){
        super(props);
        this.openRemoveGameModal = this.openRemoveGameModal.bind(this);
    		this.closeRemoveGameModal = this.closeRemoveGameModal.bind(this);
        this.handleInvite = this.handleInvite.bind(this);
        var imgWidth = 264;
        var imgHeight = 305;
        if(this.props.platform.title == "Steam"){
          imgWidth = 368;
          imgHeight = 138;
        }
        this.state = {
          imgWidth: imgWidth,
          imgHeight: imgHeight,
          inviteSentCount: 0,
          inviteButtonText: "Invite friends via text",
          showModal: false
        };

        console.log("inviteSentCount: " + this.state.inviteSentCount);
    }

    getGameInfo(id, event) {
      LibraryActions.getGameInfo(id);
    }

    handleInvite(id, event) {
        if (this.state.inviteButtonText == "Sent!")
          return;
        LibraryActions.sendTextInvite(id);
        this.setState({
            inviteButtonText: "Sent!"
        });
    }

    removeGame(id, platform, event) {
      console.log("game to remove: " + id + ", " + platform)
      LibraryActions.removeGame(id, platform);
      
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
                    <Button bsStyle="success" onClick={() => this.handleInvite(id)} block>{this.state.inviteButtonText}</Button>
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
                        <img src={imageUrl} style={coverStyle} width={this.state.imgWidth} height={this.state.imgHeight} alt="Game cover"/>
                    </OverlayTrigger>
            </span>

        );
    }
}
