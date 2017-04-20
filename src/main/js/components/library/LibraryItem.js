import React from "react";
import {Button, ButtonToolbar, ButtonGroup, Overlay, OverlayTrigger, Popover} from 'react-bootstrap';
import * as LibraryActions from "../../actions/LibraryActions";

export default class LibraryItem extends React.Component {
    constructor(){
        super();
        this.state = {inviteSentCount: 0};
        this.state = {inviteButtonText: "Invite friends via text"}
        console.log("inviteSentCount: " + this.state.inviteSentCount);
        //this.handleInvite = this.handleInvite.bind(this);
    }

    handleInvite(id, event) {  
        console.log("id is: " + id);
        console.log("event is: " + event);
        LibraryActions.sendTextInvite(id);
        this.setState({
            inviteButtonText: "Sent!"
        });

    }

    render() {
        const {imageUrl} = this.props;
        const {title} = this.props;
        const {id} = this.props;

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
                    <Button>Game information</Button>
                    <Button>Write a review</Button>
                    <Button>Read friends' reviews</Button>
                    <Button bsStyle="danger">Remove game</Button>
                </ButtonGroup>
            </Popover>
        );

        return (

            <span style={itemStyle}>

                    <OverlayTrigger trigger="click" rootClose placement="right" overlay={popoverClickRootClose}>
                        <img src={imageUrl} style={coverStyle} alt="Game cover"/>
                    </OverlayTrigger>
            </span>

        );
    }
}