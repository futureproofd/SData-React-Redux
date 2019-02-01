import React, { Component } from 'react';


export default class Logout extends Component{

    handleClick = (e) => {
        e.preventDefault();
        this.props.logoutClick();
    };

    render(){
        return(
            <button onClick={this.handleClick} className="btn btn-primary">Sign out</button>
        )
    }
}

