import React from "react";
import {Button, Checkbox, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import * as GroupActions from "../actions/GroupActions";
import GroupStore from "../stores/GroupStore";

export default class GroupSettings extends React.Component {
	constructor(props){
		super(props);

    this.setGroup = this.setGroup.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    var group = {};
		var groupName = '';
		var description = '';
    var coverPhoto = '';
		var isNewGroup = true;

		if(props.params.groupID){
			isNewGroup = false;
			GroupActions.getGroup(props.params.groupID);
      group = GroupStore.getGroup();
      groupName = group.groupName;
      description = group.description;
      coverPhoto = group.coverPhoto;

			/*groupName = GroupStore.getName();
			description = GroupStore.getDesc();
      coverPhoto = GroupStore.getCoverPhoto();*/
		}
		this.state = {
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
      group: group,
    	groupName: group.groupName,
			description: group.description,
      coverPhoto: group.coverPhoto
    });
  }

  handleSubmit(event){
    GroupActions.updateSettings(this.state);
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
          <FormControl
            type="text"
            value={this.state.groupName}
            placeholder="Enter name of group"
            onChange={this.handleInputChange}
            name="groupName"
          />
          <FormControl.Feedback />
          <HelpBlock>Group Name</HelpBlock>
        </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <FormControl
            type="text"
            value={this.state.description}
            placeholder="Enter a description of group"
            onChange={this.handleInputChange}
            name="description"
            componentClass="textarea"
          />
          <FormControl.Feedback />
          <HelpBlock>Description</HelpBlock>
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

        <Button bsStyle="success" type="submit">
          {buttonText}
        </Button>
      </form>
      </div>
    );
  }
}
