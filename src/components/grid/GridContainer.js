import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleEntitiesQuery } from '../../actions/getEntity';
import {formatDateLast30 }from '../../utils/date';

import GridView from './GridView';

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
        const { session, entity } = this.props;
        return (
            <div style={{ flex: 1, padding: "10px" }}>
                {session.isAuthenticated && entity ? (
                    <div>
                        <GridView entity={entity}/>
                    </div> 
                ):(
                    <div>Please Login</div>
                )}
            </div>

        )
    }
}

function mapStateToProps(state) {
    const { session, token, entity } = state;
    return {
        session,
        token,
        entity
    }
  }

export default connect(mapStateToProps)(GridContainer);