import React, { Component } from 'react';
import {
    Route,
    withRouter
} from 'react-router-dom';

import DetailContainer from '../detail/DetailContainer';

/*
    Define layout elements/styles here
    By default, nest a DetailContainer component
*/
class MainLeft extends Component {
    render(){
        return (
            <React.Fragment>
                <article>
                    <Route
                        path='/leads/:id'
                        component={DetailContainer}
                    />
                </article> 
            </React.Fragment>
        )
    }
}

export default withRouter(MainLeft);