import React from "react";
import LibraryItems from "../components/library/LibraryItems";
import NowPlaying from "../components/status/NowPlaying";


export default class Library extends React.Component {
    render() {
        return (
            <div class="container">

                <div class="row">
                    <LibraryItems/>
                </div>
            </div>
        );
    }
}