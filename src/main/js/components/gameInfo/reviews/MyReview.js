import React from "react";
import {Button, ButtonToolbar, ControlLabel, FormControl, Modal} from "react-bootstrap";
import ReactStars from "react-stars";
import * as GameInfoActions from "../../../actions/GameInfoActions"

export default class MyReview extends React.Component {
  constructor(props){
      super(props);
      this.openNewReviewModal = this.openNewReviewModal.bind(this);
      this.closeNewReviewModal = this.closeNewReviewModal.bind(this);
      this.handleReviewSubmission = this.handleReviewSubmission.bind(this);
      this.handleReviewTextChange = this.handleReviewTextChange.bind(this);
      this.handleReviewTitleChange = this.handleReviewTitleChange.bind(this);
      this.ratingChanged = this.ratingChanged.bind(this);
      var tempReviewTitle = "";
      var tempReviewText = "";
      var tempReviewRating = 0;

      // if user has already left a review for this game,
      // initialize some variables for editing the review
      if(this.props.gameInfo.myReview.title){
        tempReviewTitle = this.props.gameInfo.myReview.title;
        tempReviewText = this.props.gameInfo.myReview.review;
        tempReviewRating = this.props.gameInfo.myRating;
      }


      this.state = {
          reviewRating: this.props.gameInfo.myRating,
          reviewTitle: this.props.gameInfo.myReview.title,
          reviewText: this.props.gameInfo.myReview.review,
          tempReviewRating: tempReviewRating,
          tempReviewTitle: tempReviewTitle,
          tempReviewText: tempReviewText,
          showNewReviewModal: false,

      };
  }

  openNewReviewModal(){
    this.setState({
      showNewReviewModal: true
    })
  }

  closeNewReviewModal(){
    this.setState({
      showNewReviewModal: false
    })
  }

  handleReviewSubmission(){
    this.setState({
      reviewRating: this.state.tempReviewRating,
      reviewTitle: this.state.tempReviewTitle,
      reviewText: this.state.tempReviewText
    });

    // send info to server and update client
    GameInfoActions.postGameReview(
      this.props.gameInfo.id, this.state.tempReviewTitle, 
      this.state.tempReviewText, this.state.tempReviewRating
      );

    this.closeNewReviewModal();
  }

  handleReviewTextChange(e){
    this.setState({ tempReviewText: e.target.value });
  }

  handleReviewTitleChange(e){
    this.setState({ tempReviewTitle: e.target.value });
  }

  // Called when the user makes a new star rating in a review
   ratingChanged = (newRating) => {
     this.setState({
       tempReviewRating: newRating
     });
  };


  render(){

    const gameTitle = this.props.gameInfo.title;

    {/*The star rating component shown in the new review modal*/}
    const starSettings = {
      count: 5,
      value: this.state.tempReviewRating,
      size: 24,
      color2: "#ffd700",
    };

    const noEditStarSettings = {
      count: 5,
      value: this.state.reviewRating,
      size: 24,
      color2: "#ffd700",
      edit: false
    };

    if(this.state.reviewText != ""){
      return(
        <div>
        <h2>My Review</h2>
        <hr/>
        <h4><i>&quot;{this.state.reviewTitle}&quot;</i></h4>
        <ReactStars {...noEditStarSettings}/>
        &nbsp;&nbsp;
        <br/>
        <medium>{this.state.reviewText}</medium>
        <Button bsSize="small" bsStyle="link" onClick={this.openNewReviewModal}>edit</Button>

        <Modal show={this.state.showNewReviewModal} onHide={this.closeNewReviewModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit your review for {gameTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h3>Rating</h3>
            <ReactStars {...starSettings} onChange={this.ratingChanged}/>
            <br/>
            <form>
              <ControlLabel>Review Title</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.tempReviewTitle}
                  placeholder="E.g., Awesome game!"
                  onChange={this.handleReviewTitleChange}
                />
              <br/>
              <ControlLabel>Review</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.tempReviewText}
                  placeholder="Write review here"
                  onChange={this.handleReviewTextChange}
                />
            </form>
            </Modal.Body>

            <Modal.Footer>
              <ButtonToolbar>
                <Button bsStyle="success" onClick={this.handleReviewSubmission}>Submit</Button>
                <Button onClick={this.closeNewReviewModal}>Cancel</Button>
              </ButtonToolbar>
            </Modal.Footer>
          </Modal>

        </div>
      );
    }

    else{
      return(
        <div>
        <h2>My Review</h2>
        <medium>{"You haven't left a review"}</medium>
        &nbsp;&nbsp;
        <Button  bsSize="small" bsStyle="link" onClick={this.openNewReviewModal}>Write a review</Button>

        <Modal show={this.state.showNewReviewModal} onHide={this.closeNewReviewModal}>
            <Modal.Header closeButton>
              <Modal.Title>Write a review for {gameTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h3>Rating</h3>
            <ReactStars {...starSettings} onChange={this.ratingChanged}/>
            <br/>
            <form>
              <ControlLabel>Review Title</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="E.g., Awesome game!"
                  onChange={this.handleReviewTitleChange}
                />
              <br/>
              <ControlLabel>Review</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  placeholder="Write review here"
                  onChange={this.handleReviewTextChange}
                />
            </form>
            </Modal.Body>

            <Modal.Footer>
              <ButtonToolbar>
                <Button bsStyle="success" onClick={this.handleReviewSubmission}>Submit</Button>
                <Button onClick={this.closeNewReviewModal}>Cancel</Button>
              </ButtonToolbar>
            </Modal.Footer>
          </Modal>
          </div>
      );
    }
  }
}
