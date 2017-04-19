import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class ActivityStore extends EventEmitter{
    constructor(){
        super();
        var component = this;
        //this.activityItem = [];
        this.activityItem = [
            {
                "login": "weetermachine",
                "ID": "123",
                "verb": "left a review on",
                "object": "Super Mario Bros.",
                "imageUrl": "http://images.igdb.com/igdb/image/upload/t_micro/l3n0zuklmgkloi1udslt.png"
            },
            {
                "login": "logangsta",
                "ID": "124",
                "verb": "invited you to join the group",
                "object": "the friendship team!",
                "imageUrl": "https://images.igdb.com/igdb/image/upload/t_micro/mjustxpafje74fzjbeuy.jpg"
            },
            {
                "login": "jacksonHenriettaMurphy",
                "ID": "125",
                "verb": "unfriended",
                "object": "racist12YearOld",
                "imageUrl": "https://images.igdb.com/igdb/image/upload/t_micro/scutr4p9gytl4txb2soy.jpg"
            },
            {
                "login": "SexyRicardo",
                "ID": "126",
                "verb": "hit on",
                "object": "yourMom",
                "imageUrl": "https://images.igdb.com/igdb/image/upload/t_micro/scutr4p9gytl4txb2soy.jpg"
            },
            {
                "login": "yourMom",
                "ID": "127",
                "verb": "created the new group,",
                "object": "Family Game Time",
                "imageUrl": "https://images.igdb.com/igdb/image/upload/t_micro/scutr4p9gytl4txb2soy.jpg"
            }
        ];
    }

    getAll(){
        return this.activityItem;
    }

    addPost(post){
        this.activityItem.unshift(post);
        this.emit("change");
    }

    handleActions(action){
        switch (action.type) {
            case "CREATE_POST": {
                this.addPost(action.post);
                break;
            }
        }
    }
}
const activityStore = new ActivityStore();
dispatcher.register(activityStore.handleActions.bind(activityStore));
export default activityStore;
