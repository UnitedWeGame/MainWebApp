import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class UserStore extends EventEmitter{
    constructor(){
        super();
        this.user = [];

        this.notifications = [
          {id: 1, user: "MarioMaster", verb: "wants to be friends!", type: "friendRequest", imageUrl: "http://images.igdb.com/igdb/image/upload/t_micro/l3n0zuklmgkloi1udslt.png"},
          {id: 2, user: "Game4Life", verb: "wants to be friends!", type: "friendRequest", imageUrl: "https://images.igdb.com/igdb/image/upload/t_micro/scutr4p9gytl4txb2soy.jpg"}
        ];
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

    getNotifications(){
        return this.notifications;
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
