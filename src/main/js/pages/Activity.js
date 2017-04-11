import React from "react";
import NowPlaying from "../components/status/NowPlaying";
import PostCreator from "../components/activity/PostCreator";


export default class Activity extends React.Component {



    render() {

        const textareaStyle = {
            height: 50,
            resize: "none",
            borderRadius: 4,
            width: "100%"
        };


        return (
            <div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">

                            <NowPlaying/>

                        </div>
                        <div class="col-md-6 well">

                            <PostCreator/>

                        </div>
                        <div class="col-md-2">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}