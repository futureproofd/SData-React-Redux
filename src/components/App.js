import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import NavTop from '../components/NavTop';
import NavSidebar from '../components/NavSidebar';
import Main from './layout/Main'
import Footer from './footer'

class App extends Component {

    render(){
        const { dispatch, session } = this.props;
        return (
            <Router>
                <React.Fragment>
                    {session.isAuthenticated && <NavSidebar isAuthenticated />}

                    <div className={"outer-col-2"}>
                        <NavTop
                            isAuthenticated={session.isAuthenticated}
                            dispatch={dispatch}
                        />
                        {session.isAuthenticated && <Main /> }
                        {session.isAuthenticated && <Footer /> }
                    </div>
                </React.Fragment>
            </Router>
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