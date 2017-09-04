import React from "react";
import { Button, ButtonToolbar, ButtonGroup, Glyphicon, Modal } from 'react-bootstrap';
import CustomAutocomplete from '../uiPieces/CustomAutocomplete';
import LibraryItem from "./LibraryItem";
import LibraryStore from "../../stores/LibraryStore";
import * as LibraryActions from "../../actions/LibraryActions";


export default class LibraryItems extends React.Component {
    constructor(){
        super();
        this.open = this.open.bind(this); // for add-game modal
    		this.close = this.close.bind(this); // for add-game modal
        this.getLibraryItems = this.getLibraryItems.bind(this);
        const gameList = LibraryStore.getAll();

        this.state = {
            gameList: gameList,
            xBoxActive: "active",
            steamActive: "",
            psActive: "",
            showModal: false,
            addedGame: ""
        };
    }

    componentWillMount() {
        LibraryStore.on("change", this.getLibraryItems);
    }

    componentWillUnmount() {
        LibraryStore.removeListener("change", this.getLibraryItems);
    }

    open() {
    	this.setState({ showModal: true });
  	}

    close() {
    	this.setState({ showModal: false });
  	}

    handleChange = (value) => {
    this.setState({addedGame: value});
  };



    getLibraryItems(){
        this.setState({
            gameList: LibraryStore.getAll()
        });
    }


    togglePlatform(platform, event){
        if(platform == "XBox"){
            LibraryActions.showXBoxGames();
            this.setState({
                xBoxActive: "active",
                steamActive: "",
                psActive: ""
            });
        }
        else if(platform == "Steam"){
            LibraryActions.showSteamGames();
            this.setState({
                xBoxActive: "",
                steamActive: "active",
                psActive: ""
            });
        }
        else if(platform == "PS"){
            LibraryActions.showPlaystationGames();
            this.setState({
                xBoxActive: "",
                steamActive: "",
                psActive: "active"
            });
        }

    }


    render() {
        const games = this.state.gameList.map((g) => <LibraryItem key={g.id} {...g}/> );
        console.log("Rendering " + games.length + " games");

        const toggleButtons = {
            width: "100%",
            margin: "auto",
            display: "block",
            textAlign: "center"
        };

        const spacingStyle = {
        	marginLeft: "10px"
        };

        const gamesArray = ['Brawlhalla','FIFA 16','Titanfall','Subnautica']


        return (
            <div>

                <div>
                    <ButtonToolbar>
                        <ButtonGroup bsSize="large">
                            <Button bsStyle="default" onClick={this.togglePlatform.bind(this, "XBox")} active={this.state.xBoxActive}>XBox</Button>
                            <Button bsStyle="default" onClick={this.togglePlatform.bind(this, "Steam")} active={this.state.steamActive}>Steam</Button>
                            <Button bsStyle="default" onClick={this.togglePlatform.bind(this, "PS")} active={this.state.psActive}>Playstation</Button>
                        </ButtonGroup>
                        <ButtonGroup bsSize="large">
                            <Button bsStyle="success" onClick={this.open} style={spacingStyle}><Glyphicon glyph="plus" /></Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>

                <br/>

                <div class="row well">
                    {games}
                </div>

                <Modal show={this.state.showModal} onHide={this.close}>
    		          	<Modal.Header closeButton>
    		            	<Modal.Title><h3>Add a Game</h3></Modal.Title>
    		          	</Modal.Header>
    		          	<Modal.Body>

                    <CustomAutocomplete
                      direction="down"
                      label="Type game here..."
                      multiple={false}
                      onChange={this.handleChange}
                      source={gamesArray}
                      value={this.state.simple}
                    />

    		          </Modal.Body>
    		          <Modal.Footer>
                    <ButtonToolbar>
                      <Button bsStyle="success" onClick={this.close}>Add</Button>
      		            <Button onClick={this.close}>Close</Button>
                    </ButtonToolbar>
    		          </Modal.Footer>
    		        </Modal>

            </div>
        );
    }
}
