import React from "react";
import {Button, ButtonToolbar, ButtonGroup, Glyphicon, Overlay, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap';
import { Link } from "react-router";
import {Image} from "react-bootstrap";

export default class MiniUser extends React.Component {
    constructor(props){
        super(props);
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

        const tooltipProfile = (
  			<Tooltip id="tooltip"><strong>See their profile.</strong></Tooltip>
  		  );

        return (
            <div class="autosize-container">
                <span>
                <Image width="50" src={imageUrl} alt="Profile Picture" responsive thumbnail/>
                 &nbsp;&nbsp;
                 <OverlayTrigger placement="right" overlay={tooltipProfile}>
      					      <Link to={`profile/${id}`}><strong>{username}</strong></Link>
                 </OverlayTrigger>
                </span>
                <hr style={hrStyle}/>
            </div>
        );
    }
}
