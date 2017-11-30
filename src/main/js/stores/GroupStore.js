import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

/* Stores all the groups in the server's database, including those user is not a part of */
class GroupStore extends EventEmitter{
  constructor(){
    super();
    this.group = []; // the current group of interest

    // all groups in the server's database, including those user is not a part of
    this.allGroups = [];
  }

  setGroup(group){
    this.group = group;
    this.emit("change");
  }

  setAllGroups(groups){
    this.allGroups = groups;
    this.emit("change");
  }

  setGroupPosts(post){
    this.group.groupPost.unshift(post);
    this.emit("postChange");
  }

  getPosts(){
    return this.group.groupPost;
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
      case "GET_ALL_GROUPS": {
        this.setAllGroups(action.groups);
        break;
      }
      case "UPDATE_GROUP":{
        this.setGroup(action.group);
        break;
      }
      case "UPDATE_POST":{
        this.setGroupPosts(action.post);
        break;
      }
    }
  }
}
const groupStore = new GroupStore();
dispatcher.register(groupStore.handleActions.bind(groupStore));
export default groupStore;
