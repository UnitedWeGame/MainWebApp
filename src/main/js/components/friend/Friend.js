import React from "react";
import FriendStore from "../../stores/FriendStore";
import {Button, ButtonToolbar, ButtonGroup, Overlay, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap';

export default class Friend extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showModal: false
        };

		this.open = this.open.bind(this);
		this.close = this.close.bind(this);

    }

  	open() {
    	this.setState({ showModal: true });
  	}

    close() {
    	this.setState({ showModal: false });
  	}


    render() {
        const {username} = this.props;
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
        
        const tooltip = (
  			<Tooltip id="tooltip"><strong>Click to see their gamer info.</strong></Tooltip>
  		);

        return (
            <div class="autosize-container">
                <span>
                <img src={imageUrl} alt="Profile Picture"/>
                 &nbsp;&nbsp;
    				<OverlayTrigger placement="right" overlay={tooltip}>
      					<Button bsStyle="link" bsSize="large" onClick={this.open}><strong>{username}</strong></Button>
    				</OverlayTrigger>
                </span>
                 
                <hr/>

		        <Modal show={this.state.showModal} onHide={this.close}>
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
		            <Button onClick={this.close}>Close</Button>
		          </Modal.Footer>
		        </Modal>
            </div>
        );
    }
}
