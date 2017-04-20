import React from "react";
import {Button, ButtonToolbar, ButtonGroup, Overlay, OverlayTrigger, Popover} from 'react-bootstrap';

export default class LibraryItem extends React.Component {

    render() {
        const {imageUrl} = this.props;
        const {title} = this.props;
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
                    <Button bsStyle="success" block>Invite friends via text</Button>
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
                        {/*<Button bsStyle="link" id="titleTextStyle">{title}</Button>*/}
                    </OverlayTrigger>
            </span>

        );
    }
}