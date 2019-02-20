import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleEntitiesQuery, handleSingleEntity } from '../../actions/getEntity';
import {formatDateLast30 }from '../../utils/date';

import GridView from './GridView';
import Loading from '../Loading';
import getEntityType from '../../utils/entity';


class GridContainer extends Component {

    componentDidMount(){
        this.fetchGridData();
    }

    fetchGridData(){
        const entity = this.props.match.path.substr(1);
        const where = 'CreateDate ge \@'+formatDateLast30()+'\@';
        this.props.dispatch(handleEntitiesQuery(this.props.session, entity, where));
    }

    onRowClick = (entityType, singleEntity) => {
        this.props.dispatch(handleSingleEntity(singleEntity, entityType));
    }

    render(){
        const { session, entity, isFetching} = this.props;
        let entityType = getEntityType(this.props);
        return (
            <React.Fragment>
                {isFetching ? (
                    <Loading isFetching />
                ) : (
                    session.isAuthenticated && !isFetching ? (
                        <GridView entity={entity} entityType={entityType} onRowClick={this.onRowClick} />
                    ):(
                        <div>Please Login</div>
                    )
                )}
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { session, token, entity } = state;
    const { isFetching } = entity ||  { isFetching : true }; 
    return {
        session,
        token,
        entity,
        isFetching
    }
  }

export default connect(mapStateToProps)(GridContainer);