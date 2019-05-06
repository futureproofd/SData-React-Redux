import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

/**
 * HOC to display errors
 */
export default function (ComposedComponent) {
  class WithErrors extends PureComponent {
    componentDidMount() {
      this.checkErrors();
    }

    checkErrors = () => {
      const { error } = this.props;
      if (error) {
        return <div>{error.message}</div>;
      }
    };

    render() {
      const { error } = this.props;
      return (
        <div>
          <ComposedComponent {...this.props} />
          <h1>{error ? <div>{error.message}</div> : null}</h1>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    const { session } = state;

    return {
      error: session,
    };
  };

  return connect(mapStateToProps)(WithErrors);
}
