import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

/*
* General purpose flux store to handle data of any user, not just 
* currently logged-in user.
* this.user is whichever user was specified in the call to GeneralUserActions
*/
class GeneralUserStore extends EventEmitter{
    constructor(){
        super();
        this.users = []; //current list of users of interest
        this.user = []; //current user of interest
        this.groups = []; //current groups of interest
        this.friends = []; //friends of current user of interest
    }

    //returns all users
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

    //get list of users' data in json for all users in ids
    //parameter: ids list of user ids
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
        // extract the games owned by a user
        var library = $.map(this.user['games'], function(value,index){
          return [value];
        });
        return library;
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
        this.emit("userChange");
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
