import React from "react";
import NowPlaying from "../components/status/NowPlaying";
import OnlineNow from "../components/status/OnlineNow";
import PostCreator from "../components/activity/PostCreator";
import ActivityFeed from "../components/activity/ActivityFeed";


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

                            <OnlineNow/>
                        </div>

                        <div class="col-md-1">
                        </div>

                        <div class="col-md-7">
                            <div class="well">
                            <PostCreator/>
                            </div>

                            <div class="well pre-scrollable">
                            <ActivityFeed/>
                            </div>
                        </div>


                    </div>


                </div>
            </div>
        );
    }
}