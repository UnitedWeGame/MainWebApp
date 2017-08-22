import React from "react";
import Slider from "react-slick";
import CustomTabs from "../uiPieces/CustomTabs";
import {Tab} from "react-toolbox";
import ReactStars from "react-stars";
import GameStore from "../../stores/GameStore";



export default class GameInfoItem extends React.Component {

  constructor(){
      super();
      this.getGameInfo = this.getGameInfo.bind(this);
      const gameInfo = GameStore.getGame();

      this.state = {
        gameInfo: gameInfo,
        index: 0
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
          gameInfo: GameStore.getGame()
      });
      console.log(gameInfo);
  }


  handleTabChange = (index) => {
    this.setState({index});
  };

  // Called when the user makes a new star rating
   ratingChanged = (newRating) => {
     console.log(newRating);
  };


    render() {

      {/* For the screenshot slider */}
      var sliderSettings = {
        dots: true,
        infinite: true,
        autoplaySpeed: 5000,
        fade: true,
        speed: 30,
        centerMode: true,
        slidesToScroll: 1,
        autoplay: true
      }

      var starSettings = {
        count: 5,
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
            <h1>The Legend Of Zelda: The Skyward Sword</h1>
          </div>
            <br/>
            <section>
              <CustomTabs index={this.state.index} onChange={this.handleTabChange} fixed>
                <Tab label='Info'>
                  <div class={containerStyle}>
                    <br/>
                     <Slider {...sliderSettings} class={imageStyle} >

                      <div><img src='https://images.igdb.com/igdb/image/upload/t_screenshot_big/me0xfxmsvrqihgrfxh9r.jpg'  /></div>
                       <div><img src='https://images.igdb.com/igdb/image/upload/t_screenshot_big/cjg7nanyb1vxzzq1ki9q.jpg' /></div>
                       <div><img src='https://images.igdb.com/igdb/image/upload/t_screenshot_big/ka2i4aehuuibfecyaphh.jpg' /></div>

                     </Slider>
                     <br/>
                    <h3>Release Date:  </h3> <medium>September 10, 2012</medium>
                     <br/>
                     <h3>Your Rating:  </h3>
                     <ReactStars {...starSettings} onChange={this.ratingChanged}/>
                     <br/>
                     <h3>Community Rating:  </h3>
                     <medium>4.5 (out of 5)</medium>
                     <br/>
                     <h3>Summary:  </h3>
                     <medium>Long ago, on a dark day, the earth cracked and evil forces rushed out of the fissure. These forces attacked the people of the earth, slaughtering them and destroying their land. They did this in search of the ultimate power, a power capable of granting any wishes of its holder. This power, passed down from the gods of old, was guarded by Her Grace, the goddess of the land. The goddess gathered the surviving humans on a piece of earth and sent it skyward, beyond the clouds. With the humans safe, the goddess joined the land dwellers and fought the evil forces in a war of unmatched scale and ferocity. They eventually sealed the evil forces away, restoring peace to the surface. However, the humans remained in Skyloft, as Hylia knew that the seal on the evil would not hold forever.</medium>


                  </div>


                </Tab>
                <Tab label='Reviews'><large>There are no reviews</large></Tab>
                <Tab label='Friends Who Own'><large>To do...</large></Tab>
                <Tab label='Invite'><large>Not yet implemented</large></Tab>
              </CustomTabs>
            </section>

      </div>
    );
  }
}
