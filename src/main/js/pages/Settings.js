import React from "react";
//import { ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import {Button, Checkbox, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import * as SettingsActions from "../actions/SettingsActions";
import SettingsStore from "../stores/SettingsStore";

export default class Settings extends React.Component {
	constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    const settings = SettingsStore.getUserSettings();

  	this.state = { imageURL: '', coverPhoto: '',
  	 steamId: '', xboxGamertag: '', psnGamertag: '', email: '', onlyFriendsViewProf: true,
  	 onlyFriendsChat: true, onlyFriendsSMS: true, smsEnabled: true, settings: settings};
  
  }

	handleSubmit(event){
		event.preventDefault();
    SettingsActions.updateSettings(this.state);
		console.log("in handleSubmit");
		console.log(this.state);
	}

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  getSettings(){
    this.setState({
      settings: SettingsStore.userSettings()
    });
    console.log("settings:");
    console.log(this.state.settings);
  }

  render() {
    return (
    	<div class="well">
      <form onSubmit={this.handleSubmit}>

        <FormGroup controlId="formBasicText">
          <FormControl
            type="text"
            value={this.state.imageURL}
            placeholder="Enter url for image"
            onChange={this.handleInputChange}
            name="imageURL"
          />
          <FormControl.Feedback />
          <HelpBlock>Profile Image URL</HelpBlock>
        </FormGroup>

        <FormGroup controlId="formBasicText">
          <FormControl
            type="text"
            value={this.state.coverPhoto}
            placeholder="Enter url for image"
            onChange={this.handleInputChange}
            name="coverPhoto"
          />
          <FormControl.Feedback />
          <HelpBlock>Banner Image URL</HelpBlock>
        </FormGroup>

        <FormGroup controlId="formBasicText">
          <FormControl
            type="text"
            value={this.state.steamId}
            placeholder="Enter your Steam ID"
            onChange={this.handleInputChange}
            name="steamId"
          />
          <FormControl.Feedback />
          <HelpBlock>Steam ID</HelpBlock>
        </FormGroup>

        <FormGroup controlId="formBasicText">
          <FormControl
            type="text"
            value={this.state.xboxGamertag}
            placeholder="Enter your Xbox Gamertag"
            onChange={this.handleInputChange}
            name="xboxGamertag"
          />
          <FormControl.Feedback />
          <HelpBlock>Xbox Gamertag</HelpBlock>
        </FormGroup>

        <FormGroup controlId="formBasicText">
          <FormControl
            type="text"
            value={this.state.psnGamertag}
            placeholder="Enter your PSN Account ID"
            onChange={this.handleInputChange}
            name="psnGamertag"
          />
          <FormControl.Feedback />
          <HelpBlock>PSN Account ID</HelpBlock>
        </FormGroup>

        <FormGroup controlId="formBasicText">
          <FormControl
            type="text"
            value={this.state.email}
            placeholder="Enter your Email"
            onChange={this.handleInputChange}
            name="email"
          />
          <FormControl.Feedback />
          <HelpBlock>Email</HelpBlock>
        </FormGroup>

		    	<h3> Privacy Settings: </h3>
		    	
		    	<Checkbox 
		    	onChange={this.handleInputChange}
		    	checked={this.state.onlyFriendsViewProf}
		    	name="onlyFriendsViewProf">
		    	Only friends can see my profile.</Checkbox>

		    	<Checkbox 
		    	onChange={this.handleInputChange}
		    	checked={this.state.onlyFriendsChat}
		    	name="onlyFriendsChat">
		    	Only friends can chat directly with me.</Checkbox>

		    	<Checkbox 
		    	onChange={this.handleInputChange}
		    	checked={this.state.onlyFriendsSMS}
		    	name="onlyFriendsSMS">
		    	Only friends can send me SMS invites.</Checkbox>

		    	<Checkbox 
		    	onChange={this.handleInputChange}
		    	checked={this.state.smsEnabled}
		    	name="smsEnabled">
		    	Turn on SMS invites.</Checkbox>

		    <Button type="submit">
		      Submit
		    </Button>
      </form>
      </div>
    );
  }



}

class FieldGroup extends React.Component {
  render(){
    const {id} = this.props;
    const {label} = this.props;
    const {help} = this.props;
    const {props} = this.props;

    return (
	    <FormGroup controlId={id}>
	      <ControlLabel>{label}</ControlLabel>
	      <FormControl {...props} />
	      {help && <HelpBlock>{help}</HelpBlock>}
	    </FormGroup>
	  );
  }
}