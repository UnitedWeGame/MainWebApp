import React from "react";
import {Button, ButtonToolbar, ControlLabel, FormControl, Modal} from "react-bootstrap";
import * as GameInfoActions from "../../actions/GameInfoActions"

export default class Invitations extends React.Component {
  constructor(props){
      super(props);
      // this.handleReviewTitleChange = this.handleReviewTitleChange.bind(this);
      // this.ratingChanged = this.ratingChanged.bind(this);
      // var tempReviewTitle = "";
      // var tempReviewText = "";

      this.state = {
          // reviewRating: this.props.gameInfo.myRating,
          // reviewTitle: this.props.gameInfo.myReview.title,
          // reviewText: this.props.gameInfo.myReview.review,
          // tempReviewRating: tempReviewRating,
          // tempReviewTitle: tempReviewTitle,
          // tempReviewText: tempReviewText,
          // showNewReviewModal: false,

      };
  }

  render(){
      return(
        <div>
          <h3>Invitations go here</h3>
        </div>
      );

  }
}
