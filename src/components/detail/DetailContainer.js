import React, { Component } from 'react';
import { connect } from 'react-redux';

import DetailView from './DetailView'

class DetailContainer extends Component {

    componentDidMount(){
        this.fetchDetailData();
    }

    fetchDetailData(){
        //do something with entityID
    }

    render(){
        const { session, entity } = this.props;
        return (
            <div style={{ flex: 1, padding: "10px" }}>
                {session.isAuthenticated && entity ? (
                    <div>
                        <DetailView entity={entity}/>
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

export default connect(mapStateToProps)(DetailContainer);