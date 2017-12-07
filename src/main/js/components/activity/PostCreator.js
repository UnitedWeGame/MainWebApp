import React from "react";
import * as PostActions from "../../actions/PostActions"
import UserStore from "../../stores/UserStore";

/*
* Component on main page that allows user to create a new post.
*/
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
        const login = UserStore.getUsername();
        const ID = Date.now();
        const newPost = { 
            login: login,
            ID,
            verb: "said: ",
            object: this.state.value,
            imageUrl: UserStore.getImageUrl()
        };
        
        PostActions.postStatus(this.state.value);
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