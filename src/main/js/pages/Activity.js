import React from "react";
import NowPlaying from "../components/status/NowPlaying";
import OnlineNow from "../components/status/OnlineNow";
import PostCreator from "../components/activity/PostCreator";
import ActivityFeed from "../components/activity/ActivityFeed";

/*
* Activity page. Parent of Post and Activity Feed.
*/
export default class Activity extends React.Component {
    render() {

        const activitySectionStyle = {
            width: "90%"
        };


        return (
            
            <div class="container" style={activitySectionStyle}>
                <div class="row">
                    <div class="well">
                        <PostCreator/>
                    </div>

                    <div class="well pre-scrollable">
                        <ActivityFeed/>
                    </div>
                </div>
            </div>
        );
    }
}