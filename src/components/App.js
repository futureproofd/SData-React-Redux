import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../components/Nav';

class App extends Component {

    render(){
        const { dispatch, session } = this.props;
        return (
            <div>
                <Nav
                    isAuthenticated={session.isAuthenticated}
                    dispatch={dispatch}
                />
            </div>
        )
    }
}

//default state slice from reducer is always unauthenticated
function mapStateToProps(state) {
    const { session, token, entity } = state;
    return {
        session,
        token,
        entity
    }
  }

export default connect(mapStateToProps)(App);