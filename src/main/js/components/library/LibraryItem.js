import React from "react";

export default class LibraryItem extends React.Component {
    render() {
        const {url} = this.props;
        const {title} = this.props;
        const imageStyle = {
            width:304,
            height:228
        };

        return (
            <div>
                <img src={url} alt="Mountain View"/>
                <div> {title} </div>
                <hr/>
            </div>
        );
    }
}