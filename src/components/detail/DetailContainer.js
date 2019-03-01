import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleInput from './SingleInput'
import Loading from '../Loading';
import { handleEntityUpdate } from '../../actions/putEntity';

class DetailContainer extends Component {
    constructor(props){
        super(props);

        const { entity } = this.props;
        const entityDetail = entity.entityType+" Detail";

        this.state = {
            email : entity[entityDetail].Email
        };
    }

    //On props change, get newly selected entity values in state
    componentWillReceiveProps(nextProps){
        let entityDetail = this.props.entity.entityType+" Detail";
        if (nextProps.entity[entityDetail] !== this.props.entity[entityDetail]){
            this.setState({
                email: nextProps.entity[entityDetail].Email
            })
        }
    }

    handleChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onSubmit = (entity) => {
        const entityDetail = this.props.entity.entityType + " Detail";
        this.props.dispatch(handleEntityUpdate(this.props.session, entity.entityType, entity[entityDetail]));
    }

    render(){
        const { session, isFetching } = this.props;
        return (
            <React.Fragment>
                {isFetching ? (
                    <Loading isFetching />
                ):(
                    session.isAuthenticated && !isFetching ? (
                        <SingleInput
                            inputType={'text'}
                            title={'Email'}
                            name={'Email'}
                            controlFunc={this.handleChange}
                            content={this.state.email}
                            placeholder={'Enter Email here'} 
                        />
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