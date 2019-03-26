import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import DetailContainer from '../detail/DetailContainer';
import withAuthentication from '../withAuthentication';
import Home from '../Home';

/*
    Define layout elements/styles here
    By default, nest a DetailContainer component
*/
class MainLeft extends Component {
  render() {
    return (
      <React.Fragment>
        <article>
          <Route path="/:entityType/:id" component={withAuthentication(DetailContainer)} />
          <Route exact path="/" component={Home} />
        </article>
      </React.Fragment>
    );
  }
}

export default withRouter(MainLeft);
