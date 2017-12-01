import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class GeneralUserStore extends EventEmitter{
    constructor(){
        super();
        this.users = [];
        this.user = [];
        this.groups = [];
        this.friends = [];
    }

    getAllUsers(){
        return this.users;
    }

    getCoverPhoto(){
        return this.user.profile.coverPhoto;
    }

    getFriends(){
        return this.friends;
    }

    getUsername(){
        return this.user.username;
    }

    getUserID(){
        return this.user.id;
    }

    getUser(){
        return this.user;
    }


    getUsers(ids){
        var users = [];
        if(ids){
            for (var i = 0; i < this.users.length; i++) {
                if(ids.includes(this.users[i].id)){
                    users.push(this.users[i]);
                }
            }
        }
        return users;
    }

    getGames(){
        var lib = $.map(this.user['games'], function(value,index){
          return [value];
        });
        return lib;
    }

    getGroups(){
        return this.groups;
    }

    setFriends(friends){
        this.friends = friends;
        this.emit("friendChange");
    }

    setGroups(groups){
        this.groups = groups;
        this.emit("groupsChange");
    }

    getImageUrl(){
        return this.user.imageUrl;
    }

    setUser(user){
        this.user = user;
        this.emit("userChange");
    }

    setUsers(users){
        this.users = users;
        this.emit("change");
    }


    handleActions(action){
        switch (action.type) {
            case "GET_ALL_USERS": {
                this.setUsers(action.users);
                break;
            }
            case "GET_USER_DATA": {
                this.setUser(action.user);
                break;
            }
            case "GET_GROUPS": {
                this.setGroups(action.groups);
                break;
            }
            case "GET_FRIENDS": {
                this.setFriends(action.friends);
                break;
            }
        }
    }
}
const generalUserStore = new GeneralUserStore();
dispatcher.register(generalUserStore.handleActions.bind(generalUserStore));
export default generalUserStore;
