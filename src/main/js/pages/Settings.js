import React from "react";
import {Button, Checkbox, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import * as UserActions from "../actions/UserActions";
import UserStore from "../stores/UserStore";

export default class Settings extends React.Component {
	constructor(props, context) {
    super(props, context);
    UserActions.getCurrentUserData();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.setUser = this.setUser.bind(this);

    var email = (UserStore.getEmail()) ? UserStore.getEmail() : '';
    var imageURL = (UserStore.getImageUrl()) ? UserStore.getImageUrl() : 'http://www.pgconnects.com/sanfrancisco/wp-content/uploads/sites/5/2015/04/generic-profile-grey-380x380.jpg';
    var coverPhoto = (UserStore.getCoverPhoto()) ? UserStore.getCoverPhoto() : 'http://cdn.wccftech.com/wp-content/uploads/2016/07/the-legend-of-zelda-breath-of-the-wild-horizon.jpg'
    var steamId = UserStore.getSteamId();
    var xboxGamertag = UserStore.getXboxGamertag();
    var smsEnabled = UserStore.getSmsEnabled();

  	this.state = { imageURL: imageURL, coverPhoto: coverPhoto,
  	 steamId: steamId, xboxGamertag: xboxGamertag, email: email, smsEnabled: smsEnabled};

  }

  componentWillMount() {
    UserStore.on("change", this.setUser);

  }

  componentWillUnmount() {
    UserStore.removeListener("change", this.setUser);

  }

  setUser(){
    this.setState({
      imageURL: UserStore.getImageUrl(),
      coverPhoto: UserStore.getCoverPhoto(),
      steamId: UserStore.getSteamId(),
      xboxGamertag: UserStore.getXboxGamertag(),
      email: UserStore.getEmail(),
      smsEnabled: UserStore.getSmsEnabled()
    });
  }

	handleSubmit(event){
		//event.preventDefault();
    UserActions.updateSettings(this.state);
	}

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
    	<div class="well">
      <form onSubmit={this.handleSubmit}>
			<h3> General Settings: </h3>
			<br/>

        <FormGroup controlId="formBasicText">
				<FormControl.Feedback />
				<HelpBlock>Profile Image URL</HelpBlock>
          <FormControl
            type="text"
            value={this.state.imageURL}
            placeholder="Enter url for image"
            onChange={this.handleInputChange}
            name="imageURL"
          />
        </FormGroup>
				<br/>

        <FormGroup controlId="formBasicText">
				<FormControl.Feedback />
				<HelpBlock>Banner Image URL</HelpBlock>
          <FormControl
            type="text"
            value={this.state.coverPhoto}
            placeholder="Enter url for image"
            onChange={this.handleInputChange}
            name="coverPhoto"
          />
        </FormGroup>
				<br/>

        <FormGroup controlId="formBasicText">
				<FormControl.Feedback />
				<HelpBlock>Steam ID</HelpBlock>
          <FormControl
            type="text"
            value={this.state.steamId}
            placeholder="Enter your Steam ID"
            onChange={this.handleInputChange}
            name="steamId"
          />
        </FormGroup>
				<br/>

        <FormGroup controlId="formBasicText">
				<FormControl.Feedback />
				<HelpBlock>Xbox Gamertag</HelpBlock>
          <FormControl
            type="text"
            value={this.state.xboxGamertag}
            placeholder="Enter your Xbox Gamertag"
            onChange={this.handleInputChange}
            name="xboxGamertag"
          />
        </FormGroup>
				<br/>

        <FormGroup controlId="formBasicText">
				<FormControl.Feedback />
				<HelpBlock>Email</HelpBlock>
          <FormControl
            type="text"
            value={this.state.email}
            placeholder="Enter your Email"
            onChange={this.handleInputChange}
            name="email"
          />
        </FormGroup>
				<br/>

		    	<h3> Privacy Settings: </h3>

		    	<Checkbox
			    	onChange={this.handleInputChange}
			    	checked={this.state.smsEnabled}
			    	name="smsEnabled">
			    	Turn on SMS invites.
					</Checkbox>
					<br/>

		    <Button bsStyle="success" type="submit">
		      Update
		    </Button>
      </form>
      </div>
    );
  }



}
//Delete me!!!!!!!
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
