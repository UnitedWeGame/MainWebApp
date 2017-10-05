import React from "react";
import {Button, ButtonToolbar, ControlLabel, FormControl, Modal} from "react-bootstrap";
import ReactStars from "react-stars";

export default class MyReview extends React.Component {
  constructor(props){
      super(props);
      this.openWriteReviewModal = this.openWriteReviewModal.bind(this);
      this.closeWriteReviewModal = this.closeWriteReviewModal.bind(this);

      this.state = {
          showWriteReviewModal: false,
      };
  }

  openWriteReviewModal(){
    this.setState({
      showWriteReviewModal: true
    })
  }

  closeWriteReviewModal(){
    this.setState({
      showWriteReviewModal: false
    })
  }


  render(){

    const myRating = this.props.gameInfo.myRating;
    const headline = this.props.gameInfo.myReview.title;
    const myReview = this.props.gameInfo.myReview.review;
    const gameTitle = this.props.gameInfo.title;

    const starSettings = {
      count: 5,
      value: myRating,
      size: 24,
      color2: "#ffd700",
    };

    const noEditStarSettings = {
      count: 5,
      value: myRating,
      size: 24,
      color2: "#ffd700",
      edit: false
    };

    if(!myReview){
      return(
        <div>
        <h2>My Review</h2>
        <hr/>
        <h3>{headline}</h3>
        <ReactStars {...noEditStarSettings}/>
        &nbsp;&nbsp;
        <br/>
        <medium>{myReview}</medium>
        <Button bsSize="small" bsStyle="link">edit</Button>

        </div>
      );
    }

    else{
      return(
        <div>
        <h2>My Review</h2>
        <medium>{"You haven't left a review"}</medium>
        &nbsp;&nbsp;
        <Button  bsSize="small" bsStyle="link" onClick={this.openWriteReviewModal}>Write a review</Button>

        <Modal show={this.state.showWriteReviewModal} onHide={this.closeWriteReviewModal}>
            <Modal.Header closeButton>
              <Modal.Title>Write a review for {gameTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h3>Rating</h3>
            <ReactStars {...starSettings}/>
            <br/>
            <form>
              <ControlLabel>Review Title</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="E.g., Awesome game!"
                />
              <br/>
              <ControlLabel>Review</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Write review here"/>
            </form>
            </Modal.Body>

            <Modal.Footer>
              <ButtonToolbar>
                <Button bsStyle="success" onClick={this.closeWriteReviewModal}>Submit</Button>
                <Button onClick={this.closeWriteReviewModal}>Cancel</Button>
              </ButtonToolbar>
            </Modal.Footer>
          </Modal>
          </div>
      );
    }
  }
}
