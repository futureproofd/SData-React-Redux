import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import NavTop from './NavTop';
import NavSidebar from './NavSidebar';
import Main from './layout/Main';
import Footer from './footer';
import WithErrors from './WithErrors';

class App extends PureComponent {
  render() {
    const { dispatch, session, error } = this.props;
    const NavLogin = WithErrors(NavTop);

    return (
      <Router>
        <React.Fragment>
          {session.isAuthenticated && <NavSidebar />}

          <div className="outer-col-2">
            <NavLogin isAuthenticated={session.isAuthenticated} dispatch={dispatch} />
            {error ? <div>{error.message}</div> : null}
            {session.isAuthenticated && <Main />}
            {session.isAuthenticated && <Footer />}
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

// default state slice from reducer is always unauthenticated
function mapStateToProps(state) {
  const {
    session, token, entity, error,
  } = state;
  return {
    session,
    token,
    entity,
    error,
  };
}

export default connect(mapStateToProps)(App);
