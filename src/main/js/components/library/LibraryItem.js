import React from "react";
import {Button, ButtonToolbar, ButtonGroup, Overlay, OverlayTrigger, Popover} from 'react-bootstrap';

export default class LibraryItem extends React.Component {

    render() {
        const {url} = this.props;
        const {title} = this.props;
        const titleTextStyle = {};

        const popoverClickRootClose = (
            <Popover id="popover-trigger-click-root-close" title="">
                <ButtonGroup vertical>
                    <Button bsStyle="success" block>Invite friends via text</Button>
                    <Button>Game information</Button>
                    <Button>Write a review</Button>
                    <Button>Read friends' reviews</Button>
                    <Button bsStyle="danger">Remove game</Button>
                </ButtonGroup>
            </Popover>
        );

        return (

            <div>

                <img src={url} alt="Game cover"/>
                <div>
                    <OverlayTrigger trigger="click" rootClose placement="right" overlay={popoverClickRootClose}>
                        <Button bsStyle="link" id="titleTextStyle">{title}</Button>
                    </OverlayTrigger>
                </div>
                <hr/>
            </div>

        );
    }
}