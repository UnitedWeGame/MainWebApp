import React from "react";
import LibraryItem from "./LibraryItem";
import LibraryStore from "../../stores/LibraryStore";

export default class LibraryItems extends React.Component {
    constructor(){
        super();
        this.getLibraryItems = this.getLibraryItems.bind(this);
        const gameList = LibraryStore.getAll();

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

    render() {
        const games = this.state.gameList.map((g) => <LibraryItem key={g.id} {...g}/> );
        return (
            <div class="row">
                <div>{games}</div>
            </div>
        );
    }
}