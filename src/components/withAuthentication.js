import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '../../../../../../AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux';

/**
 * HOC to determine whether user is authenticated
 */
export default function (ComposedComponent) {
  class WithAuthentication extends PureComponent {
    componentDidMount() {
      this.checkAuth();
    }

    checkAuth = () => {
      const { isAuthenticated, redirect } = this.props;
      if (!isAuthenticated) {
        redirect();
      }
    };

    render() {
      const { isAuthenticated } = this.props;
      return isAuthenticated ? <ComposedComponent {...this.props} /> : null;
    }
  }

  const mapDispatchToProps = dispatch => bindActionCreators(
    {
      redirect: () => this.props.history.push('/'),
    },
    dispatch,
  );

  const mapStateToProps = (state) => {
    const { session } = state;

    return {
      isAuthenticated: session.isAuthenticated,
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(WithAuthentication);
}
