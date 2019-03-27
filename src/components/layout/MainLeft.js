import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import DetailContainer from '../detail/DetailContainer';
import WithAuthentication from '../WithAuthentication';
import Home from '../Home';

/*
    Define layout elements/styles here
    By default, nest a DetailContainer component
*/
const MainLeft = () => (
  <React.Fragment>
    <article>
      <Route path="/:entityType/:id" component={WithAuthentication(DetailContainer)} />
      <Route exact path="/" component={Home} />
    </article>
  </React.Fragment>
);

export default withRouter(MainLeft);
