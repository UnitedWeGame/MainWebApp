import React from "react";
import NowPlaying from "../components/NowPlaying";

export default class Activity extends React.Component {



    render() {

        const textareaStyle = {
            height: 50,
            resize: "none",
            borderRadius: 4,
            width: "100%"
        }

        const formStyle = {
            position: "relative"
        }



        return (
            <div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <NowPlaying/>
                        </div>
                        <div class="col-md-8 well">

                                <form>
                                    <div class="autosize-container">
                                    <textarea rows="1" name="post"
                                              placeholder="What's on your mind?" style={textareaStyle}>
                                    </textarea>
                                    </div>
                                </form>
                                <br/>
                                <button type="submit" class="btn btn-success">Post</button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}