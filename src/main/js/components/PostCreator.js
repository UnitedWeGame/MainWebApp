import React from "react";

export default class PostCreator extends React.Component {
    render() {

        const textareaStyle = {
            height: 50,
            resize: "none",
            borderRadius: 4,
            width: "100%"
        };

        return (
            <div>
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
        );
    }
}