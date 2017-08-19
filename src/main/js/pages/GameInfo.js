import React from "react";
import Slider from "react-slick";


export default class GameInfo extends React.Component {
    render() {

      {/* For the screenshot slider */}
      var settings = {
        dots: true,
        infinite: true,
        autoplaySpeed: 5000,
        fade: true,
        speed: 30,
        centerMode: true,
        slidesToScroll: 1,
        autoplay: true
      }

      const titleStyle = {
        textAlign: "center"
      };

      {/* For the navs that toggle between General, Reviews, etc.*/}


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
        <div style={titleStyle}>
          <h1>The Legend Of Zelda: The Skyward Sword</h1>
    	     <div class={containerStyle}>
            	<Slider {...settings} class={imageStyle} >

               <div><img src='https://images.igdb.com/igdb/image/upload/t_screenshot_big/me0xfxmsvrqihgrfxh9r.jpg'  /></div>
                <div><img src='https://images.igdb.com/igdb/image/upload/t_screenshot_big/cjg7nanyb1vxzzq1ki9q.jpg' /></div>
                <div><img src='https://images.igdb.com/igdb/image/upload/t_screenshot_big/ka2i4aehuuibfecyaphh.jpg' /></div>

              </Slider>
          </div>
      </div>
    );
  }
}

{/*

      const mainTextStyle = {
        position: "absolute",
        top: "50px",
        width: "96.66666666666666%",
        color: "#FFF",
      }

        return (
          <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner">
                            <div class="item active">
                                <img src="https://images.igdb.com/igdb/image/upload/t_screenshot_huge/me0xfxmsvrqihgrfxh9r.jpg" alt="First slide" />
                            </div>
                            <div class="item">
                                <img src="https://images.igdb.com/igdb/image/upload/t_screenshot_huge/cjg7nanyb1vxzzq1ki9q.jpg" alt="Second slide" />

                            </div>
                            <div class="item">
                                <img src="https://images.igdb.com/igdb/image/upload/t_screenshot_huge/ka2i4aehuuibfecyaphh.jpg" alt="Third slide" />

                            </div>
                        </div>
                        <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left"></span></a><a class="right carousel-control"
                                href="#carousel-example-generic" data-slide="next"><span class="glyphicon glyphicon-chevron-right">
                                </span></a>
                    </div>
                    <div class="hidden-xs" style={mainTextStyle}>
                        <div class="col-md-12 text-center">
                            <h1>The Legend Of Zelda: The Skyward Sword</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
    }
}

*/}
