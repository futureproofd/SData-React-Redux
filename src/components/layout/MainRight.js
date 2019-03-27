import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';

import GridContainer from '../grid/GridContainer';
/*
    Define layout elements/styles here
    By default, nest a GridContainer component
*/
class MainRight extends PureComponent {
  render() {
    const { isAuthenticated } = this.props;
    const routes = [
      {
        path: '/accounts',
        component: GridContainer,
        isAuthenticated,
      },
      {
        path: '/contacts',
        component: GridContainer,
        isAuthenticated,
      },
      {
        path: '/leads',
        component: GridContainer,
        isAuthenticated,
      },
    ];

    return (
      <React.Fragment>
        <aside>
          {routes.map(({ path, component: C, isAuthenticated: auth }) => (
            <Route
              key={path}
              path={path}
              render={props => <C {...props} isAuthenticated={auth} />}
            />
          ))}
        </aside>
      </React.Fragment>
    );
  }
}

export default withRouter(MainRight);
