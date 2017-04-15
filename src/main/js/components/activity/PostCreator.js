import React from "react";
import * as PostActions from "../../actions/PostActions"

export default class PostCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        const newPost = {
            login: "kelpaso",
            text: this.state.value,
            ID: Date.now().toString()
        };
        PostActions.createPost(newPost);
        event.preventDefault();
        this.setState({value: ''});
    }

    render() {

        const textareaStyle = {
            height: 50,
            resize: "none",
            borderRadius: 4,
            width: "100%"
        };

        return (
            <form onSubmit={this.handleSubmit} class={textareaStyle}>
                    <textarea rows="1" value={this.state.value} onChange={this.handleChange}
                              placeholder="What's on your mind?" style={textareaStyle}>
                    </textarea>
                <br/>
                <button type="submit" class="btn btn-success">Post</button>
            </form>
        );
    }
}