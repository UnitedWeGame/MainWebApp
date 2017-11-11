import React from "react";
import CustomTabs from "../uiPieces/CustomTabs";
import FriendReviews from "./reviews/FriendReviews";
import GameStore from "../../stores/GameStore";
import * as GameInfoActions from "../../actions/GameInfoActions";
import MyReview from "./reviews/MyReview";
import ReactStars from "react-stars";
import Slider from "react-slick";
import {Tab} from "react-toolbox";


export default class GameInfoItem extends React.Component {

  constructor(props){
      super(props);

      this.getGameInfo = this.getGameInfo.bind(this);
      const gameInfo = GameStore.getGame();
      var tabIndex = GameStore.getTabIndex();

      this.state = {
        gameInfo: gameInfo,
        tabIndex: tabIndex
      }

  }

  componentWillMount() {
      GameStore.on("change", this.getGameInfo);
  }

  componentWillUnmount() {
      GameStore.removeListener("change", this.getGameInfo);
  }

  getGameInfo(){
      this.setState({
          gameInfo: GameStore.getGame(),
          tabIndex: GameStore.getTabIndex()
      });
  }


  handleTabChange = (tabIndex) => {
    this.setState({tabIndex});
  };

  // Called when the user makes a new star rating
   ratingChanged = (newRating) => {
     this.state.gameInfo.myRating = newRating;
     GameInfoActions.postRating(this.state.gameInfo.id, newRating);
     console.log(newRating);
  };


    render() {

      const screenshots = this.state.gameInfo.screenshots.map((g) => <div><Screenshot key={g.id} {...g}/></div> );


      {/* For the screenshot slider */}
      var sliderSettings = {
        dots: true,
        infinite: true,
        autoplaySpeed: 3000,
        fade: true,
        speed: 30,
        centerMode: true,
        slidesToScroll: 1,
        autoplay: true
      }

      var starSettings = {
        count: 5,
        value: this.state.gameInfo.myRating,
        size: 24,
        color2: "#ffd700"
      }

      const titleStyle = {
        textAlign: "center"
      };



      const containerStyle = {
        height: 300,
        overflow: "hidden",
        color: "#333",
        position: "relative"
      };

      const imageStyle = {
        filter: "brightness(50%)",
        margin: "auto"
      };


      return (
        <div>
          <div style={titleStyle}>
            <h1>{this.state.gameInfo.title}</h1>
          </div>
            <br/>
            <section>
              <CustomTabs index={this.state.tabIndex} onChange={this.handleTabChange} fixed>
                <Tab label='Info'>
                  <div class={containerStyle}>
                    <br/>
                     <Slider {...sliderSettings} class={imageStyle} >

                      {screenshots}

                     </Slider>
                     <br/>
                    <h3>Release Date:  </h3> <medium>{this.state.gameInfo.firstReleaseDate}</medium>
                     <br/>
                     <h3>Your Rating:  </h3>
                     <ReactStars {...starSettings} onChange={this.ratingChanged}/>
                     <br/>
                     <h3>Community Rating:  </h3>
                     <medium>{this.state.gameInfo.communityRating}</medium>
                     <br/>
                     <h3>Summary:  </h3>
                      <medium>{this.state.gameInfo.summary}</medium>

                  </div>
                </Tab>

                <Tab label='Reviews'>
                  <MyReview gameInfo={this.state.gameInfo}/>
                  <br/>
                  <hr/>
                  <br/>
                  <FriendReviews friendReviews={this.state.gameInfo.friendReviews}/>
                </Tab>


                <Tab label='Friends Who Own'><large>To do...</large></Tab>
                <Tab label='Invite'><large>Not yet implemented</large></Tab>
              </CustomTabs>
            </section>

      </div>
    );
  }
}

class Screenshot extends React.Component {
  render() {
    const {id} = this.props;
    const {url} = this.props;
    return (

      <div><img src={url}  /></div>

    )
  }
}
