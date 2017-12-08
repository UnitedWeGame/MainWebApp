import React from "react";
import { hashHistory, Link } from "react-router";
import {Button, ButtonToolbar, ButtonGroup, Modal, Overlay, OverlayTrigger, Popover} from 'react-bootstrap';
import * as LibraryActions from "../../actions/LibraryActions";
import * as GameInfoActions from "../../actions/GameInfoActions";

export default class LibraryItem extends React.Component {
    constructor(props){
        super(props);
        this.openRemoveGameModal = this.openRemoveGameModal.bind(this);
    		this.closeRemoveGameModal = this.closeRemoveGameModal.bind(this);
        this.handleClick = this.handleClick.bind(this);
        var imgWidth = 264*.9;
        var imgHeight = 305*.9;
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

    }

    // called when any of the buttons (e.g. send a text invite, see game info, etc.)
    // is clicked. Section refers to the different tabs of the game information page.
    handleClick(id, section, event) {
      GameInfoActions.getGameInfo(id, section);
      hashHistory.push({
        pathname: "/game"
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

    openLFGChat(id, event) {
    	window.open("/lfg-chat/" + id);
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
            margin: '10px 10px 10px 10px',
        };


        const popoverClickRootClose = (
            <Popover id="popover-trigger-click-root-close" title={title}>
                <ButtonGroup vertical>
                    <Button bsStyle="success" onClick={this.handleClick.bind(this, id, 3)}>Invite Friends via Text</Button>
                    <Button onClick={this.handleClick.bind(this, id, 0)}>Game Information</Button>
                    <Button onClick={this.handleClick.bind(this, id, 1)}>Reviews For This Game</Button>
                    <Button onClick={this.handleClick.bind(this, id, 2)}>See Friends Who Own</Button>
                    <Button onClick={this.openLFGChat.bind(this, id)}>LFG Chat</Button>
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

                    <OverlayTrigger trigger="click" rootClose placement="left" overlay={popoverClickRootClose}>
                        <img src={imageUrl} style={coverStyle} width={this.state.imgWidth} height={this.state.imgHeight} alt="Game cover"/>
                    </OverlayTrigger>
            </span>

        );
    }
}
