import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class GroupStore extends EventEmitter{
  constructor(){
    super();
    this.group = [];
  }

  setGroup(group){
    this.group = group;
    this.emit("change");
  }

  getGroup(){
    return this.group;
  }

  getName(){
    return this.group.groupName;
  }

  getDesc(){
    return this.group.description;
  }

  getCoverPhoto(){
    return this.group.coverPhoto;
  }


  handleActions(action){
    switch (action.type) {
      case "GET_GROUP_DATA": {
        this.setGroup(action.group);
        break;
      }
    }
  }
}
const groupStore = new GroupStore();
dispatcher.register(groupStore.handleActions.bind(groupStore));
export default groupStore;
