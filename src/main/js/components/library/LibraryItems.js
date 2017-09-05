import React from "react";
import { Button, ButtonToolbar, ButtonGroup, ControlLabel, FormLabel, FormGroup, FormControl, Glyphicon, Modal } from 'react-bootstrap';
import LibraryItem from "./LibraryItem";
import LibraryStore from "../../stores/LibraryStore";
import DbGameStore from "../../stores/DbGameStore";
import * as LibraryActions from "../../actions/LibraryActions";


export default class LibraryItems extends React.Component {
    constructor(){
        super();
        this.openAddGameModal = this.openAddGameModal.bind(this); // for add-game modal
    		this.close = this.close.bind(this); // for add-game modal
        this.getLibraryItems = this.getLibraryItems.bind(this);
        this.getDbGames = this.getDbGames.bind(this);
        const ownedGameList = LibraryStore.getAll();

        this.state = {
            ownedGameList: ownedGameList,
            dbGameList: "empty",
            xBoxActive: "active",
            steamActive: "",
            psActive: "",
            showModal: false,
            addedGame: "",
            formPlatform: "XBox 360",
            formGameTitles: [{title: "Initialization Placeholder", id: 1}],
            allgamesHaveBeenRetrieved: false

        };
    }

    componentWillMount() {
        LibraryStore.on("change", this.getLibraryItems);
        DbGameStore.on("change", this.getDbGames);
    }

    componentWillUnmount() {
        LibraryStore.removeListener("change", this.getLibraryItems);
        DbGameStore.removeListener("change", this.getDbGames);
    }

    openAddGameModal() {
      if(!this.state.allgamesHaveBeenRetrieved){
        LibraryActions.getAllGames();
        this.setState({allgamesHaveBeenRetrieved: true});
      }
    	this.setState({ showModal: true });
  	}

    close() {
    	this.setState({ showModal: false });
  	}

    handlePlatformChange(event) {
      let fieldName = event.target.name;
      let fieldVal = event.target.value;
      console.log(fieldName + " " + fieldVal);
      var gameList = this.state.dbGameList;

      if(event.target.value == "Steam"){
        this.setState({ formGameTitles: gameList.Steam});

        for(var i = 0; i < gameList.Steam.length; i++){
          console.log(gameList.Steam[i]);
        }
      }
      else if(event.target.value == "PS3"){
        this.setState({ formGameTitles: gameList.PS3});
      }
      else if(event.target.value == "PS4"){
        this.setState({ formGameTitles: gameList.PS4});
      }
      else if(event.target.value == "XBox 360"){
        this.setState({ formGameTitles: gameList.XBox360});
      }
      else if(event.target.value == "XBox One"){
        this.setState({ formGameTitles: gameList.XBoxOne});
      }

    }

    handleChange = (value) => {
    this.setState({addedGame: value});
  };

    getDbGames(){
        this.setState({
            dbGameList: DbGameStore.getAll()
        });
    }

    getLibraryItems(){
        this.setState({
            ownedGameList: LibraryStore.getAll()
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
        const games = this.state.ownedGameList.map((g) => <LibraryItem key={g.id} {...g}/> );
        const gameTitles = this.state.formGameTitles.map((g) => <FormGameTitle key={g.id} {...g}/> );

        const spacingStyle = {
        	marginLeft: "10px"
        };

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
                            <Button bsStyle="success" onClick={this.openAddGameModal} style={spacingStyle}><Glyphicon glyph="plus" /></Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>

                <br/>

                <div class="row well">
                    {games}
                </div>

                <Modal show={this.state.showModal} onHide={this.close}>
    		          	<Modal.Header closeButton>
    		            	<Modal.Title>Add a Game</Modal.Title>
    		          	</Modal.Header>
    		          	<Modal.Body>

                    <FormGroup controlId="formControlsSelect">
                      <ControlLabel>Platform</ControlLabel>
                      <FormControl componentClass="select" placeholder="select" onChange={this.handlePlatformChange.bind(this)}>
                        <option value="select">Select...</option>
                        <option value="PS3">PS3</option>
                        <option value="PS4">PS4</option>
                        <option value="Steam">Steam</option>
                        <option value="XBox 360">XBox 360</option>
                        <option value="XBox One">XBox One</option>

                      </FormControl>
                      <br/>
                      <ControlLabel>Game Title</ControlLabel>
                      <FormControl componentClass="select" placeholder="select">
                        <option value="select">Select...</option>
                        {gameTitles}
                      </FormControl>
                    </FormGroup>

    		          </Modal.Body>
    		          <Modal.Footer>
                    <ButtonToolbar>
                      <Button bsStyle="success" onClick={this.close}>Add</Button>
      		            <Button onClick={this.close}>Cancel</Button>
                    </ButtonToolbar>
    		          </Modal.Footer>
    		        </Modal>

            </div>
        );
    }
}

class FormGameTitle extends React.Component {
  render() {
    const {title} = this.props;

    return (

       <option value="{title}">{title}</option>
      
    )
  }
}
