import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class GeneralUserStore extends EventEmitter{
    constructor(){
        super();
        this.users = [];
        this.user = [];
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

    getCoverPhoto(){
        return this.user.profile.coverPhoto;
    }

    getAllUsers(){
        return this.users;
    }

    getUsers(ids){
        var users = [];
        for (var i = 0; i < this.users.length; i++) {
            if(ids.includes(this.users[i].id)){
                users.push(this.users[i]);
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

    getImageUrl(){
        return this.user.imageUrl;
    }

    setUser(user){
        this.user = user;
        this.emit("change");
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
        }
    }
}
const generalUserStore = new GeneralUserStore();
dispatcher.register(generalUserStore.handleActions.bind(generalUserStore));
export default generalUserStore;
