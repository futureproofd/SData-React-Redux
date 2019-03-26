import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

/**
 * HOC to determine whether user is authenticated
 */
export default function (ComposedComponent) {
  class withAuthentication extends PureComponent {
    render() {
      const { isAuthenticated } = this.props;
      return isAuthenticated ? <ComposedComponent {...this.props} /> : <div>Nope</div>;
    }
  }

  const mapStateToProps = (state) => {
    const { session } = state;

    return {
      isAuthenticated: session.isAuthenticated,
    };
  };

  return connect(mapStateToProps)(withAuthentication);
}
