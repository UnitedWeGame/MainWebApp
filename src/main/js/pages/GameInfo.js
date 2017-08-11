import React from "react";

export default class GameInfo extends React.Component {
    render() {

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
