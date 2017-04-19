import React from "react";

export default class UserName extends React.Component {

    constructor(){
        super();

        /*this.state = {
          name : name
        };*/
    }

    componentWillMount() {
    	$.get( "/api/users/me", function( data ) {
    		  console.log(data);
    		});
        /*fetch('/api/users/me', {credentials: 'include'})
        .then(function(res) {
            return res.text();
        }).then(function(body) {
            console.log(body);
            console.log("is this running inside fetch");
        });
        console.log("is this running");*/
    }

    

    render() {


        return (
            <div>
                
            </div>
        );
    }
}