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
        let singleEntity = this.props.entity[entityType].$resources.find(x => x.$key === id);
        this.props.dispatch(handleSingleEntity(singleEntity, entityType));
    }

    getEntityType=() => {
        for(let i = 0; i < entityTypes.length; i++){
            if(this.props.entity[entityTypes[i]] 
                && this.props.location.pathname.indexOf(entityTypes[i].substr(0,entityTypes[i].length-1)) > 0)
            {
                return entityTypes[i];
            }
        }
    }

    render(){
        const { session, entity, isFetching } = this.props;
        return (
            <div style={{ flex: 1, padding: "2px" }}>

            {isFetching ? (
                <Loading isFetching />
            ) : (
                session.isAuthenticated && !isFetching ? (
                    <div>
                        <DetailView entity={entity}/>
                    </div> 
                ):(
                    <div>Please Login</div>
                )
            )}
                
            </div>

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