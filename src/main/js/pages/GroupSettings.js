import React from "react";
import {Button, Checkbox, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import * as GroupActions from "../actions/GroupActions";
import GroupStore from "../stores/GroupStore";
import { hashHistory } from 'react-router';

export default class GroupSettings extends React.Component {
	constructor(props){
		super(props);

    this.setGroup = this.setGroup.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    var id = '';
    var group = {};
		var groupName = '';
		var description = '';
    var coverPhoto = '';
		var isNewGroup = true;
    var redirectToGroup = false;

		if(props.params.groupID){
      id = this.props.params.groupID;
			isNewGroup = false;
			GroupActions.getGroup(props.params.groupID);
      group = GroupStore.getGroup();
      groupName = group.groupName;
      description = group.description;
      coverPhoto = group.coverPhoto;
		}
		this.state = {
      redirectToGroup: redirectToGroup,
      id: id,
      group: group,
			groupName: groupName,
			description: description,
      coverPhoto: coverPhoto,
			isNewGroup: isNewGroup
		};

	}

  componentWillMount() {
    GroupStore.on("change", this.setGroup);
  }

  componentWillUnmount() {
    GroupStore.removeListener("change", this.setGroup);
  }

  setGroup(){
    const group = GroupStore.getGroup();
    this.setState({
      id: group.id,
      group: group,
    	groupName: group.groupName,
			description: group.description,
      coverPhoto: group.coverPhoto
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

        <Button bsStyle="success" type="submit">
          {buttonText}
        </Button>
      </form>
      </div>
    );
  }
}
