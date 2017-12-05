import React from "react";
import {Button, Checkbox, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import * as GroupActions from "../actions/GroupActions";
import GroupStore from "../stores/GroupStore";
import UserStore from "../stores/UserStore";
import { hashHistory } from 'react-router';

export default class GroupSettings extends React.Component {
	constructor(props){
		super(props);

    this.setGroup = this.setGroup.bind(this);
    this.setUser = this.setUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    var id = '';
    var group = {};
		var groupName = '';
		var description = '';
    var coverPhoto = '';
		var isNewGroup = true;
    var redirectToGroup = false;
    var userID = UserStore.getUserID();
    var adminUser = null;
    var canEdit = true;

		if(props.params.groupID){
      id = this.props.params.groupID;
			isNewGroup = false;
			GroupActions.getGroup(props.params.groupID);
      group = GroupStore.getGroup();
      groupName = group.groupName;
      description = group.description;
      coverPhoto = group.coverPhoto;
      adminUser = group.adminUser;
      //canEdit = userID == adminUser;
		}
    canEdit = isNewGroup ? true : userID == adminUser;
		this.state = {
      redirectToGroup: redirectToGroup,
      id: id,
      group: group,
			groupName: groupName,
			description: description,
      coverPhoto: coverPhoto,
			isNewGroup: isNewGroup,
      userID: userID,
      adminUser: adminUser,
      canEdit: canEdit
		};

	}

  componentWillMount() {
    GroupStore.on("change", this.setGroup);
    UserStore.on("change", this.setUser);
  }

  componentWillUnmount() {
    GroupStore.removeListener("change", this.setGroup);
    UserStore.removeListener("change", this.setUser);
  }

  setUser(){
    this.setState({userID: UserStore.getUserID()});
  }

  setGroup(){
    const group = GroupStore.getGroup();
    var canEdit = this.state.isNewGroup ? true : this.state.userID == this.state.adminUser;
    //var canEdit = this.state.userID == group.adminUser;
    this.setState({
      id: group.id,
      group: group,
    	groupName: group.groupName,
			description: group.description,
      coverPhoto: group.coverPhoto,
      adminUser: group.adminUser,
      canEdit: canEdit
    });
  }

  handleSubmit(event){
    event.preventDefault();
    this.setState({
      redirectToGroup: true
    });
    if(this.state.isNewGroup){
      GroupActions.createGroup(this.state);
    }
    else{
      GroupActions.updateSettings(this.state);
    }
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
    const groupPath = "/group/"+this.state.id;
    if(this.state.redirectToGroup){
      hashHistory.push(groupPath);
    }
    var buttonText = "Update";
    var headerText = "Edit Group Settings";
    if(this.state.isNewGroup){
      buttonText = "Create Group";
      headerText = "Create New Group";
    }
    var buttonDisabled = !this.state.canEdit;
    /*if(this.state.adminUser){
      buttonDisabled = this.state.adminUser != this.state.userID;
    }*/
    return (
      <div class="well">
      <form onSubmit={this.handleSubmit}>

        <FormGroup controlId="formBasicText">
				<HelpBlock>Group Name</HelpBlock>
				<FormControl.Feedback />
          <FormControl
            type="text"
            value={this.state.groupName}
            placeholder="Enter name of group"
            onChange={this.handleInputChange}
            name="groupName"
          />
        </FormGroup>
				<br/>

        <FormGroup controlId="formControlsTextarea">
				<FormControl.Feedback />
				<HelpBlock>Description</HelpBlock>
          <FormControl
            type="text"
            value={this.state.description}
            placeholder="Enter a description of group"
            onChange={this.handleInputChange}
            name="description"
            componentClass="textarea"
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

        <Button bsStyle="success" type="submit" disabled={buttonDisabled}>
          {buttonText}
        </Button>
      </form>
      </div>
    );
  }
}
