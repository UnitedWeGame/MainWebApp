import React from "react";
import LibraryItems from "../components/library/LibraryItems";
import NowPlaying from "../components/status/NowPlaying";

export default class Library extends React.Component {
    render() {
        return (
            <div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">

                            <NowPlaying/>

                        </div>
                        <div class="col-md-8 well">

                            <LibraryItems/>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}