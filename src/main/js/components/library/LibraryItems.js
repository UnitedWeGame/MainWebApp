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
            gameList: gameList
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
        if(platform == "XBox")
            LibraryActions.showXBoxGames();
        else if(platform == "Steam")
            LibraryActions.showSteamGames();
        else if(platform == "PS")
            LibraryActions.showPlaystationGames();

        console.log("Platform toggled is: " + platform);

    }


    render() {
        const games = this.state.gameList.map((g) => <LibraryItem key={g.id} {...g}/> );
        console.log("Rendering " + games.length + " games");
        
        return (
            <div>

                <div class="row">
                    <ButtonToolbar>
                        <ButtonGroup bsSize="large">
                            <Button bsStyle="primary" onClick={this.togglePlatform.bind(this, "XBox")}>XBox</Button>
                            <Button bsStyle="primary" onClick={this.togglePlatform.bind(this, "Steam")}>Steam</Button>
                            <Button bsStyle="primary" onClick={this.togglePlatform.bind(this, "PS")}>Playstation</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
                
                <div class="row">
                {games}
                </div>

            </div>
        );
    }
}