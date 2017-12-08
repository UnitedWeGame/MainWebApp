import React from "react";
import * as GroupActions from "../actions/GroupActions";
import * as GeneralUserActions from "../actions/GeneralUserActions";
import GroupStore from "../stores/GroupStore";
import UserStore from "../stores/UserStore";
import GeneralUserStore from "../stores/GeneralUserStore";
import { Button, Image, Jumbotron, Modal, FormGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router";
import Activity from "./Activity";
import MiniUser from "../components/friend/MiniUser";

/*
* Page component that displays group data. 
*/
export default class Groups extends React.Component {
  constructor(props){
    super(props);

    GroupActions.getGroup(props.params.groupID);
    GeneralUserActions.getAllUsers();

    this.getGroup = this.getGroup.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.openJoinGroupModal = this.openJoinGroupModal.bind(this);
    this.closeJoinGroupModal = this.closeJoinGroupModal.bind(this);
    this.isMember = this.isMember.bind(this);
    this.updateMemberStatus = this.updateMemberStatus.bind(this);
    this.onJoinGroupClick = this.onJoinGroupClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);


    var group = GroupStore.getGroup();
    var groupName = group.groupName;
    var description = group.description;
    var coverPhoto = group.coverPhoto;
    var groupPost = group.groupPost;
    var adminUser = group.adminUser;
    const loggedInUserID = UserStore.getUserID();
    const username = UserStore.getUsername();

    var members = GeneralUserStore.getUsers(group.members);

    var isNotMember = false;
    if(group.members){
      isNotMember = !group.members.includes(loggedInUserID);
    }



    this.state = {
      group: group,
      groupName: groupName,
      description: description,
      coverPhoto: coverPhoto,
      members: members,
      groupPost: groupPost,
      btnDisabled: false,
      btnText: "Join Group",
      showModal: false,
      loggedInUserID: loggedInUserID,
      isNotMember: isNotMember,
      post: "",
      username: username,
      adminUser: adminUser
    };
  }

  componentWillMount() {
    GroupStore.on("change", this.getGroup);
    GroupStore.on("postChange", this.getPosts);
    GroupStore.on("change", this.updateMemberStatus);
    GeneralUserStore.on("change", this.getGroup);
  }

  componentWillUnmount() {
    GroupStore.removeListener("change", this.getGroup);
    GroupStore.removeListener("postChange", this.getPosts);
    GroupStore.removeListener("change", this.updateMemberStatus);
    GeneralUserStore.on("change", this.getGroup);
  }

  getPosts(){
    this.setState({
      groupPost: GroupStore.getPosts()
    });
  }

  getGroup(){
    const group = GroupStore.getGroup();
    const loggedInUserID = UserStore.getUserID();
    var isNotMember = false;
    if(group.members)
      isNotMember = !group.members.includes(loggedInUserID);
    this.setState({
      group: group,
      groupName: group.groupName,
      description: group.description,
      coverPhoto: group.coverPhoto,
      members : GeneralUserStore.getUsers(group.members),
      groupPost : group.groupPost,
      isNotMember: isNotMember,
      loggedInUserID: loggedInUserID,
      adminUser: group.adminUser
    });
  }

  openJoinGroupModal(){
    this.setState({ showModal: true});
  }

  closeJoinGroupModal(){
    window.location.reload();
    this.setState({ showModal: false});
  }

  isMember(){
    return this.state.members.includes(this.state.loggedInUserID);
  }

  updateMemberStatus(){
    if(!this.isMember())
      this.setState({ isNotMember: true});
  }

  onJoinGroupClick(event){
    event.preventDefault();
    GroupActions.joinGroup(this.state.group.id, this.state.loggedInUserID);
    this.openJoinGroupModal();
    this.setState({
      btnText: "Group Joined!",
      btnDisabled: true
    });
  }

  handleSubmit(event){
    event.preventDefault();
    this.setState({
      post: ""
    });
    const groupPost = {
        userId: this.state.loggedInUserID,
        username: this.state.username,
        content: this.state.post,
        imageUrl: UserStore.getImageUrl(),
        timestamp: Date.now()
      };
    GroupActions.updateActivityFeed(this.state.group, groupPost);
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
    //const friends = this.state.friendList.map((person) => <Friend key={person.id} {...person}/> );
    var members = this.state.members.map((a) => <MiniUser key={a.ID} {...a}/> );
    var activities = [];
    if(this.state.groupPost)
    {
      activities = this.state.groupPost.map((a) => <Item key={a.ID} {...a}/> );
    }

    {/* Button for sending friend request to user featured on profile, if not yet a friend*/}
    var coverBtnStyle = {display: "none"};
    if(this.state.isNotMember)
        coverBtnStyle = { display: "initial" };

    var styleLink = {display: "none"};
    if(this.state.adminUser == this.state.loggedInUserID)
        styleLink = { display: "initial" };

    const coverPhotoUrl = "url('"+this.state.coverPhoto+"')";

    const headerStyle = {
      background: coverPhotoUrl,
      backgroundSize: "cover",
      backgroundPosition: "center"
    };

    const hrStyle = {
          border: "none",
          background: "#D3D3D3",
          color: "#D3D3D3"
    };

    const textareaStyle = {
        height: 50,
        resize: "none",
        borderRadius: 4,
        width: "100%"
    };

    return (
      <div>
      <Modal show={this.state.showModal} onHide={this.closeJoinGroupModal}>
          <Modal.Header closeButton>
            <Modal.Title>You have joined this group!</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
              <Button bsStyle="success" onClick={this.closeJoinGroupModal}>OK</Button>
          </Modal.Footer>
        </Modal>
        <Jumbotron style={headerStyle}>
        <h1> {this.state.groupName} </h1>
        <p> {this.state.description}</p>
          <Button bsStyle="success" style={coverBtnStyle} onClick={this.onJoinGroupClick} disabled={this.state.btnDisabled}>{this.state.btnText}</Button>
          <Link to={`groupSettings/${this.state.group.id}`} style={styleLink}><strong>Edit Group</strong></Link>
        </Jumbotron>
        <h2> Group Members: </h2>
        {members}
        <hr style={hrStyle}/>
        <hr/>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="formControlsTextarea">
            <FormControl
              type="text"
              value={this.state.post}
              placeholder="What's on your mind?"
              onChange={this.handleInputChange}
              name="post"
              componentClass="textarea"
            />
          </FormGroup>
          <Button bsStyle="success" type="submit"  disabled={this.state.isNotMember}>
            Post
          </Button>
        </form>
        <br/>
        <br/>
        {activities}
        {/*<Activity/>*/}
      </div>
    );
  }
}

class NewActivity extends React.Component {
  render(){
      <FormGroup controlId="formControlsTextarea">
        <FormControl
          type="text"
          value={this.state.description}
          placeholder="Enter a description of group"
          onChange={this.handleInputChange}
          name="description"
          componentClass="textarea"
        />
        <HelpBlock>Description</HelpBlock>
      </FormGroup>
  }
}

//individual activity item to be displayed in the group's activity feed
class Item extends React.Component {
  render(){
    const {username} = this.props;
    const {content} = this.props;
    const {imageUrl} = this.props;

    return (
      <div>
        <p> <Image width="50" src={imageUrl} alt="Profile Picture" thumbnail responsive/> {username}: {content} </p>
      <hr/>
      </div>
    );
  }
}
