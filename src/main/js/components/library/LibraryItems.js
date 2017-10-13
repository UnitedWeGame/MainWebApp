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
        this.addGame = this.addGame.bind(this);
        this.getLibraryItems = this.getLibraryItems.bind(this);
        this.getDbGames = this.getDbGames.bind(this);

        const ownedGameList = LibraryStore.getAll();

        this.state = {
            ownedGameList: ownedGameList,
            dbGameList: "empty",
            XboxActive: "active",
            steamActive: "",
            psActive: "",
            showModal: false,
            addedGameId: "",
            addedGamePlatform: "",
            formGameTitles: [{title: "...", id: 1}],
            allgamesHaveBeenRetrieved: false,
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

    addGame(){
      if(this.state.addedGameId == "" ||
        this.state.addedGameId == "select" ||
        this.state.addedGamePlatform == "" ||
        this.state.addedGamePlatform == "select"){

          alert("Please select both a game and a platform!")
          return;

        }

      LibraryActions.addGame(this.state.addedGameId, this.state.addedGamePlatform);
      this.close();
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
      var gameList = this.state.dbGameList;

      if(event.target.value == "Steam"){
        this.setState({ formGameTitles: gameList.Steam});
        this.setState({ addedGamePlatform: "Steam"});

      }
      else if(event.target.value == "PS3"){
        this.setState({ formGameTitles: gameList.PS3});
        this.setState({ addedGamePlatform: "PS3"});

      }
      else if(event.target.value == "PS4"){
        this.setState({ formGameTitles: gameList.PS4});
        this.setState({ addedGamePlatform: "PS4"});

      }
      else if(event.target.value == "Xbox 360"){
        this.setState({ formGameTitles: gameList.Xbox360});
        this.setState({ addedGamePlatform: "Xbox360"});

      }
      else if(event.target.value == "Xbox One"){
        this.setState({ formGameTitles: gameList.XboxOne});
        this.setState({ addedGamePlatform: "XboxOne"});

      }

    }

    handleTitleChange(event){
      this.setState({addedGameId: event.target.value});
    }

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
        if(platform == "Xbox"){
            LibraryActions.showXboxGames();
            this.setState({
                XboxActive: "active",
                steamActive: "",
                psActive: ""
            });
        }
        else if(platform == "Steam"){
            LibraryActions.showSteamGames();
            this.setState({
                XboxActive: "",
                steamActive: "active",
                psActive: ""
            });
        }
        else if(platform == "PS"){
            LibraryActions.showPlaystationGames();
            this.setState({
                XboxActive: "",
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
        
        const libraryGameStyle = {
            width:'70%',
            display:'flex',
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems:'flex-start',
            flexWrap:'wrap'
        }


        return (
            <div>

                <div>
                    <ButtonToolbar>
                        <ButtonGroup bsSize="large">
                            <Button bsStyle="default" onClick={this.togglePlatform.bind(this, "Xbox")} active={this.state.XboxActive}>Xbox</Button>
                            <Button bsStyle="default" onClick={this.togglePlatform.bind(this, "Steam")} active={this.state.steamActive}>Steam</Button>
                            <Button bsStyle="default" onClick={this.togglePlatform.bind(this, "PS")} active={this.state.psActive}>Playstation</Button>
                        </ButtonGroup>
                        <ButtonGroup bsSize="large">
                            <Button bsStyle="success" onClick={this.openAddGameModal} style={spacingStyle}><Glyphicon glyph="plus" /></Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>

                <br/>

                <div class="row well" style={libraryGameStyle}>
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
                        <option value="Xbox 360">Xbox 360</option>
                        <option value="Xbox One">Xbox One</option>

                      </FormControl>
                      <br/>
                      <ControlLabel>Game Title</ControlLabel>
                      <FormControl componentClass="select" placeholder="select" onChange={this.handleTitleChange.bind(this)}>
                        <option value="select">Select...</option>
                        {gameTitles}
                      </FormControl>
                    </FormGroup>

    		          </Modal.Body>

    		          <Modal.Footer>
                    <ButtonToolbar>
                      <Button bsStyle="success" onClick={this.addGame}>Add</Button>
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
    const {id} = this.props;
    const {title} = this.props;

    return (

       <option value={id}>{title}</option>

    )
  }
}
