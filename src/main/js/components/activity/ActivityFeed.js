import React from "react";
import ActivityStore from "../../stores/ActivityStore";

export default class ActivityFeed extends React.Component {
    constructor(){
        super();
        this.getActivity = this.getActivity.bind(this);
        const activityList = ActivityStore.getAll();

        this.state = {
          activityList : activityList
        };
    }

    componentWillMount() {
        ActivityStore.on("change", this.getActivity);
    }

    componentWillUnmount() {
        ActivityStore.removeListener("change", this.getActivity);
    }

    getActivity(){
        this.setState({
            activityList: ActivityStore.getAll()
        });
    }

    render() {
        const activities = this.state.activityList.map((a) => <Item key={a.ID} {...a}/> );
        const textareaStyle = {
            height: 50,
            resize: "none",
            borderRadius: 4,
            width: "100%"
        };

        return (
            <div>
                {activities}
            </div>
        );
    }
}

class Item extends React.Component {
    render(){
        const {login} = this.props;
        const {verb} = this.props;
        const {object} = this.props;
        const {imageUrl} = this.props;

        return (
            <div>
                <p> <img src={imageUrl} alt="Mountain View"/> {login} {verb} {object} </p>
            <hr/>
            </div>
        );
    }
}