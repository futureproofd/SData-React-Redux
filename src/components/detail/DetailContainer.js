import React, { Component } from 'react';
import { connect } from 'react-redux';

import DetailView from './DetailView';
import Loading from '../Loading';

class DetailContainer extends Component {

    render(){
        const { session, entity, isFetching } = this.props;
        return (
            <React.Fragment>
                {isFetching ? (
                    <Loading isFetching />
                ):(
                    session.isAuthenticated && !isFetching ? (
                        <DetailView entity={entity}/>
                    ):(
                        <div>Please Login</div>
                    )
                )}
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { session, entity } = state;
    const { isFetching } = entity.entityType ||  { isFetching : true }; 
    return {
        session,
        entity,
        isFetching
    }
  }

export default connect(mapStateToProps)(DetailContainer);