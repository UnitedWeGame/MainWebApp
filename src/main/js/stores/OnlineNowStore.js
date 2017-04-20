import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class OnlineNowStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        this.friends = [];
    }

    getAll(){
        return this.friends;
    }

    update(friends){
        this.friends = friends;
        this.emit("change");
    }

    handleActions(action){
        switch(action.type){
            case "UPDATE_ONLINE_NOW":{
                this.update(action.friends);
                break;
            }
        }
    }

}
const onlineNowStore = new OnlineNowStore();
dispatcher.register(onlineNowStore.handleActions.bind(onlineNowStore));
export default onlineNowStore;
