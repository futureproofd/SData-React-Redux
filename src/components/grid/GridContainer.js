import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleEntitiesQuery } from '../../actions/getEntity';
import {formatDateLast30 }from '../../utils/date';

import GridView from './GridView';
import Loading from '../Loading';

class GridContainer extends Component {

    componentDidMount(){
        this.fetchGridData();
    }

    fetchGridData(){
        const entity = this.props.match.path.substr(1);
        const where = 'CreateDate ge \@'+formatDateLast30()+'\@';
        this.props.dispatch(handleEntitiesQuery(this.props.session, entity, where));
    }

    render(){
        const { session, entity, isFetching} = this.props;
        return (
            <div style={{ flex: 1, padding: "2px" }}>

            {isFetching ? (
                <Loading isFetching />
            ) : (
                session.isAuthenticated && !isFetching ? (
                    <div>
                        <GridView entity={entity}/>
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