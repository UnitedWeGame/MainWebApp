import React from "react";
import ReactStars from "react-stars";

export default class FriendReviews extends React.Component {

  render(){
    const friendReviews = this.props.friendReviews.map((f) => <FriendReview key={f.userID} {...f}/> );

    if(friendReviews.length == 0){
      return(
        <div>
        <h2>Friend Reviews</h2>
        <medium>{"No friends have left a review for this game..."}</medium>
        </div>

      );
    }

    else {
      return(
        <div>
        <h2>Friend Reviews</h2>
        <hr/>
        {friendReviews}
        </div>
      );
    }
  }
}


class FriendReview extends React.Component {

  render(){

    const username = this.props.username;
    const rating = this.props.rating;
    const headline = this.props.reviewTitle;
    const review = this.props.review;

    {/*The star rating component shown in the new review modal*/}
    const starSettings = {
      count: 5,
      value: rating,
      size: 24,
      color2: "#ffd700",
      edit: false
    };

    return(
      <div>
      <h4>{username}: <i>&quot;{headline}&quot;</i></h4>
      <ReactStars {...starSettings}/>
      <br/>
      <medium>{review}</medium>
      <br/>
      <hr/>
      </div>
    );
  }
}
