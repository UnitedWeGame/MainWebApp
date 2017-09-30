import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class UserStore extends EventEmitter{
    constructor(){
        super();
        this.user = [];
    }

    getUsername(){
        return this.user.username;
    }

    getUserID(){
        return this.user.id;
    }

    getGames(){
        return this.user.games;
    }

    getImageUrl(){
        return this.user.imageUrl;
    }

    setUser(user){
        this.user = user;
        this.emit("change");
    }


    handleActions(action){
        switch (action.type) {
            case "GET_CURRENT_USER_DATA": {
                this.setUser(action.user);
                break;
            }
        }
    }
}
const userStore = new UserStore();
dispatcher.register(userStore.handleActions.bind(userStore));
export default userStore;
