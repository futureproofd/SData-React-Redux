import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavTop from '../components/NavTop';

class App extends Component {

    render(){
        const { dispatch, session } = this.props;
        return (
            <div>
                <NavTop
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