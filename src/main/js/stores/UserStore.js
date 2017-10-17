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

    getCoverPhoto(){
        if(this.user.profile)
            return this.user.profile.coverPhoto;
        else
            return null;
    }

    getEmail(){
        return this.user.email;
    }

    getSteamId(){
        const gamerIds = this.user.gamerIdentifiers;
        for (var key in gamerIds){
            if (gamerIds.hasOwnProperty(key) && gamerIds[key].platform == 'Steam'){
                return gamerIds[key].identifier;
            }
        }
        return '';
    }

    getXboxGamertag(){
        const gamerIds = this.user.gamerIdentifiers;
        for (var key in gamerIds){
            if (gamerIds.hasOwnProperty(key) && gamerIds[key].platform == 'Xbox Live'){
                return gamerIds[key].identifier;
            }
        }
        return '';
    }

    getPsnGamertag(){
        const gamerIds = this.user.gamerIdentifiers;
        for (var key in gamerIds){
            if (gamerIds.hasOwnProperty(key) && gamerIds[key].platform == 'Whatever string we use for psn'){
                return gamerIds[key].identifier;
            }
        }
        return '';
    }

    getSmsEnabled(){
        if(this.user.profile)
            return this.user.profile.smsEnabled;
        else
            return null;
    }

    getAboutMe(){
        return this.user.profile.aboutMe;
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
