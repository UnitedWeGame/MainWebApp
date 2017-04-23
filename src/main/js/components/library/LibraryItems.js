import React from "react";
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import LibraryItem from "./LibraryItem";
import LibraryStore from "../../stores/LibraryStore";
import * as LibraryActions from "../../actions/LibraryActions";


export default class LibraryItems extends React.Component {
    constructor(){
        super();
        this.getLibraryItems = this.getLibraryItems.bind(this);
        const gameList = LibraryStore.getAll();

        console.log("Inside library items. Game list: " + gameList);
        this.state = {
            gameList: gameList,
            xBoxActive: "active",
            steamActive: "",
            psActive: ""
        };
    }

    componentWillMount() {
        LibraryStore.on("change", this.getLibraryItems);
    }

    componentWillUnmount() {
        LibraryStore.removeListener("change", this.getLibraryItems);
    }

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

        console.log("Platform toggled is: " + platform);

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


        return (
            <div>

                <div>
                    <ButtonToolbar>
                        <ButtonGroup bsSize="large">
                            <Button bsStyle="default" onClick={this.togglePlatform.bind(this, "XBox")} active={this.state.xBoxActive}>XBox</Button>
                            <Button bsStyle="default" onClick={this.togglePlatform.bind(this, "Steam")} active={this.state.steamActive}>Steam</Button>
                            <Button bsStyle="default" onClick={this.togglePlatform.bind(this, "PS")} active={this.state.psActive}>Playstation</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
                
                <br/>
                
                <div class="row well">
                    {games}
                </div>

            </div>
        );
    }
}