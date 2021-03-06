import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

/*
* React store for all activity-feed data.
*/
class ActivityStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        this.activityItem = [];
    }

    getAll(){
        return this.activityItem;
    }

    addPost(post){
        this.activityItem.unshift(post);
        this.emit("change");
    }

    getActivity(activity){
        this.activityItem = activity;
        this.emit("change");
    }

    handleActions(action){
        switch (action.type) {
            case "CREATE_POST": {
                this.addPost(action.post);
                break;
            }
            case "GET_FRIENDS_ACTIVITY": {
                this.getActivity(action.activity);
                break;
            }
        }
    }
}
const activityStore = new ActivityStore();
dispatcher.register(activityStore.handleActions.bind(activityStore));
export default activityStore;
