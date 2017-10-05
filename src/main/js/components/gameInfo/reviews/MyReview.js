import React from "react";
import {Button, ButtonToolbar, ControlLabel, FormControl, Modal} from "react-bootstrap";
import ReactStars from "react-stars";

export default class MyReview extends React.Component {
  constructor(props){
      super(props);
      this.openNewReviewModal = this.openNewReviewModal.bind(this);
      this.closeNewReviewModal = this.closeNewReviewModal.bind(this);
      this.handleReviewSubmission = this.handleReviewSubmission.bind(this);
      this.handleReviewTextChange = this.handleReviewTextChange.bind(this);
      this.handleReviewTitleChange = this.handleReviewTitleChange.bind(this);
      this.ratingChanged = this.ratingChanged.bind(this);

      this.state = {
          reviewRating: this.props.gameInfo.myRating,
          reviewTitle: this.props.gameInfo.myReview.title,
          reviewText: this.props.gameInfo.myReview.review,
          newReviewRating: 0,
          newReviewTitle: "",
          newReviewText: "",
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
    console.log("new review:\nrating:  " + this.state.newReviewRating + "\nheadline: " + this.state.newReviewTitle + "\nreview: " + this.state.newReviewText)
    this.setState({
      reviewRating: this.state.newReviewRating,
      reviewTitle: this.state.newReviewTitle,
      reviewText: this.state.reviewText
    });
    // send info to server and update client
    this.closeNewReviewModal();
  }

  handleReviewTextChange(e){
    this.setState({ newReviewText: e.target.value });
    console.log("newReviewText: " + e.target.value)
  }

  handleReviewTitleChange(e){
    this.setState({ newReviewTitle: e.target.value });
    console.log("newReviewTitle: " + e.target.value)
  }

  // Called when the user makes a new star rating in a review
   ratingChanged = (newRating) => {
     this.setState({
       reviewRating: newRating,
       newReviewRating: newRating
     });
     console.log("star rating changed: " + newRating)
  };


  render(){

    const myRating = this.props.gameInfo.myRating;
    const headline = this.props.gameInfo.myReview.title;
    const myReview = this.props.gameInfo.myReview.review;
    const gameTitle = this.props.gameInfo.title;

    {/*The star rating component shown in the new review modal*/}
    const starSettings = {
      count: 5,
      value: this.state.reviewRating,
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

    if(myReview != ""){
      return(
        <div>
        <h2>My Review</h2>
        <hr/>
        <h3>{headline}</h3>
        <ReactStars {...noEditStarSettings}/>
        &nbsp;&nbsp;
        <br/>
        <medium>{myReview}</medium>
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
                  value={this.state.reviewTitle}
                  placeholder="E.g., Awesome game!"
                  onChange={this.handleReviewTitleChange}
                />
              <br/>
              <ControlLabel>Review</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.reviewText}
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
