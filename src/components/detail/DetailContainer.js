import React, { Component } from 'react';
import { connect } from 'react-redux';

import DetailView from './DetailView'
import { handleSingleEntity } from '../../actions/getEntity';
import { entityTypes } from '../../config/config';

class DetailContainer extends Component {

    componentDidMount(){
        this.fetchDetailData();
    }

    fetchDetailData(){
        let id = this.props.match.params.id;
        let entityType = this.getEntityType();
        debugger;
        let singleEntity = this.props.entity[entityType].$resources.find(x => x.$key === id);
        this.props.dispatch(handleSingleEntity(singleEntity, entityType));
    }

    getEntityType=() => {
        debugger;
        for(let i = 0; i < entityTypes.length; i++){
            if(this.props.entity[entityTypes[i]]){ 
                let entity = this.props.location.pathname; //ex string: leads/id
                if(entity.indexOf(entityTypes[i].toLowerCase()) > 0){
                    return entityTypes[i];
                }
            }
        }
    }

    render(){
        const { session, entity, isFetching } = this.props;
        return (
            <React.Fragment>
                {isFetching ? (
                    <Loading isFetching />
                ) : (
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
    const { isFetching } = entity ||  { isFetching : true }; 
    return {
        session,
        entity,
        isFetching
    }
  }

export default connect(mapStateToProps)(DetailContainer);