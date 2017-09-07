import React from "react";
import FriendStore from "../stores/FriendStore";
import { Grid, Row, Col, Image, Jumbotron } from "react-bootstrap";
import Friend from "../components/friend/Friend"

export default class Profile extends React.Component {
constructor(){
    super();
    this.getFriends = this.getFriends.bind(this);
    const friendList = FriendStore.getAll();

    this.state = {
        friendList: friendList,
    };
  }

  componentWillMount() {
    FriendStore.on("change", this.getFriends);
  }

  componentWillUnmount() {
    FriendStore.removeListener("change", this.getFriends);
  }

  getFriends(){
    this.setState({
        friendList: FriendStore.getAll()
    });
  }	

  render() {

  	const friends = this.state.friendList.map((person) => <Friend key={person.id} {...person}/> );

  	const headerStyle = {
      background: "url('http://cdn.wccftech.com/wp-content/uploads/2016/07/the-legend-of-zelda-breath-of-the-wild-horizon.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center"
  };

  	const dummySentences = ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Donec hendrerit tempor tellus.', 'Donec pretium posuere tellus.', 'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'Nulla posuere.', 'Donec vitae dolor.', 'Nullam tristique diam non turpis.', 'Cras placerat accumsan nulla.', 'Nullam rutrum.', 'Nam vestibulum accumsan nisl.'];

	const gridInstance = (
	  <Grid>
	    <Row className="show-grid">
	    	<Col md={12}> <h2> Game Library: </h2>  </Col>
	    </Row>
	    <hr/>
	    <Row className="show-grid">
	      <Col sm={6} md={6}> <h2>Friends: </h2> <br/> {friends}  <br/></Col>
	      <Col sm={6} md={6}> <h2>Groups: </h2> <br/><br/></Col>
	    </Row>
	  </Grid>
	);

      return (
          <div>
          	<Jumbotron style={headerStyle}>
          		<Image src="https://images.igdb.com/igdb/image/upload/t_cover_big/kln2xrk7av3dzrt60auq.png" circle responsive/> 
          	</Jumbotron>
          	{gridInstance}
              {/*<h1 class="text-center">Profile Page Coming Soon...</h1>*/}
          	
          </div>
      );
    }
}