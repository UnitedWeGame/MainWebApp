import React from "react";
import LibraryItems from "../components/library/LibraryItems";
import NowPlaying from "../components/status/NowPlaying";
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';


export default class Library extends React.Component {
    render() {
        return (
            <div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">

                            <NowPlaying/>

                        </div>
                        <div class="col-md-8">

                            <div class="row">
                                <ButtonToolbar>
                                    <ButtonGroup bsSize="large">
                                        <Button bsStyle="primary">XBox</Button>
                                        <Button bsStyle="primary">Steam</Button>
                                        <Button bsStyle="primary">Playstation</Button>
                                    </ButtonGroup>
                                </ButtonToolbar>
                            </div>

                            <div class="row well">
                                <LibraryItems/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}