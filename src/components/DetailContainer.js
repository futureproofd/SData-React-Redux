import React, { Component } from 'react';

class DetailContainer extends Component {
    render(){
        const { dispatch, isAuthenticated } = this.props;
        return (

            <div style={{ flex: 1, padding: "10px" }}>
                {isAuthenticated ? (
                    <div>Details Container
                    </div> 
                ):(
                    <div>Please Login</div>
                )}
            </div>

        )
    }
}

export default DetailContainer;