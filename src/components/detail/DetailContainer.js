import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleInput from './SingleInput'
import Loading from '../Loading';
import { handleEntityUpdate } from '../../actions/putEntity';

class DetailContainer extends Component {
    constructor(props){
        super(props);

        const entity  = this.props.entity;
        const entityDetail = entity[entity.entityType+" Detail"];

        //store any changes to individual entity records here
        this.state = {
            Key : entityDetail.$key,
            detailRecord : entity.entityType + " Detail",
            Email : entityDetail.Email,
            Notes : entityDetail.Notes,
            field : null,
            draft : false
        };
    }

    //if entity prop changes, update form fields
    static getDerivedStateFromProps(props, state){
        if(props.entity[state.detailRecord].$key !== state.$key){
            if(state.draft){
                return { 
                    [state.field] : state[state.field],
                    draft : false 
                }
            } else {
                return { 
                    Key : props.entity[state.detailRecord].$key,
                    Email : props.entity[state.detailRecord].Email,
                    Notes : props.entity[state.detailRecord].Notes
                }
            }
        }
        return null;
    }

    handleChange = (event, fieldName) => {
        this.setState({ 
            [fieldName] : event.target.value,
            field : fieldName,
            draft : true
        });
    }

    onSubmit = (entity) => {
        this.props.dispatch(handleEntityUpdate(this.props.session, entity.entityType, entity[this.state.detailRecord]));
    }

    render(){
        const { session, isFetching } = this.props;
        return (
            <React.Fragment>
                {isFetching ? (
                    <Loading isFetching />
                ):(
                    session.isAuthenticated && !isFetching ? (
                        <form className="container" onSubmit={this.onSubmit}>
                            <SingleInput
                                inputType={'text'}
                                title={'Email'}
                                name={'Email'}
                                controlFunc={this.handleChange}
                                content={this.state.Email}
                                placeholder={'Enter Email here'} 
                            />
                            <SingleInput
                                inputType={'text'}
                                title={'Notes'}
                                name={'Notes'}
                                controlFunc={this.handleChange}
                                content={this.state.Notes}
                                placeholder={'Enter Notes here'} 
                            />
                        </form>
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