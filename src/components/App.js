import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../components/Nav';

class App extends Component {
    constructor(props, context){
        super(props,context);
        console.log('App props', props);
        console.log('App context', context);
    }

    render(){
        const { dispatch, isAuthenticated } = this.props;
        return (
            <div>
                <Nav
                    isAuthenticated={isAuthenticated}
                    dispatch={dispatch}
                />
            </div>
        )
    }
}

//default state slice from reducer is always unauthenticated
function mapStateToProps(state) {
    const { session, token, isAuthenticated } = state;
    return {
        session,
        token,
        isAuthenticated
    }
  }

export default connect(mapStateToProps)(App);