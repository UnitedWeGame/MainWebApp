import React from "react";

export default class FriendPlaying extends React.Component {
    render() {
        const {gamerTag} = this.props;
        const {game} = this.props;
        const {ID}    = this.props;
        const {platform} = this.props;

        return (
            <div class="col-md-12" id="friend">
                <h4>{gamerTag} is playing</h4>
                <p>{game} <br/> on {platform}</p>
                <hr/>
            </div>
        );
    }
}