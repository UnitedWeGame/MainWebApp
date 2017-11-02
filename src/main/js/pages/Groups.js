import React from "react";
import * as GroupActions from "../actions/GroupActions";
import GroupStore from "../stores/GroupStore";

export default class Groups extends React.Component {
  constructor(props){
    super(props);

    this.setGroup = this.setGroup.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    var GroupActions.getGroup(props.params.groupID);
    var groupName = GroupStore.getName();
    var description = GroupStore.getDesc();
    var coverPhoto = GroupStore.getCoverPhoto();

    this.state = {
      groupName: groupName,
      description: description,
      coverPhoto: coverPhoto,
      members: members,
      activityList: activityList
    };
  }

  render() {
    return (
      <div class="well">
        <h1 class="text-center">Groups Page Coming Soon...</h1>
      </div>
    );
  }
}