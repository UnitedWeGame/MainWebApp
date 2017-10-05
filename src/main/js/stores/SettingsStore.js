import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class SettingsStore extends EventEmitter{
  constructor(){
    super();
    var component = this;
    this.userSettings = [];
  }

  getUserSettings(){
    return this.userSettings;
  }

  updateUserSettings(settings){
    console.log("settings: ");
    console.log(settings);
    this.userSettings = settings;
    this.emit("change");
  }

  handleActions(action){
    switch (action.type) {
      case "UPDATE_SETTINGS": {
        this.updateUserSettings(action.settings);
        break;
    }
    }
  }
}
const settingsStore = new SettingsStore();
dispatcher.register(settingsStore.handleActions.bind(settingsStore));
export default settingsStore;
