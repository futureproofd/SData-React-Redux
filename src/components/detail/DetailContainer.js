import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleInput from './SingleInput';
import Textbox from './Textbox';
import Loading from '../Loading';
import PickList from './PickList';
import { handleEntityUpdate } from '../../actions/putEntity';
import { handleSingleEntity } from '../../actions/getEntity';
import { validateEmail } from '../../utils/validate';
import { resourceQueryTypes }  from '../../config/config';
import PropTypes from 'prop-types';

class DetailContainer extends Component {
    constructor(props) {
        super(props);

        const { entity }  = this.props;

        if(entity) {
            const entityDetail = entity[entity.entityType+" Detail"];
            //store in local state, any changes to entity record here
            this.state = {
                Key : entityDetail.$key,
                detailRecord : entity.entityType + " Detail",
                Email : { value : entityDetail.Email, isDirty : false },
                Notes : { value : entityDetail.Notes, isDirty : false },
                Status : { value : entityDetail.Status, isDirty : false},
                draftField : null,
                editing : false
            };
        } else {
            this.state = {
                    Key : '',
                    detailRecord : '',
                    Email : {},
                    Notes : {},
                    Status : {},
                    draftField : '',
                    editing : false
            };
        }
    }

    /*
      From direct URL navigation (POP) to a detail entity
    */
    componentDidMount(){
        const { entity, history, dispatch, session, match } = this.props;
        
        this.getLocalResources(this.props.session);

        if(entity === null && history.action === "POP"){
            let { entityType, id } = match.params;
            dispatch(handleSingleEntity(session, id, entityType));
        }
    }

    //if entity prop changes, update form fields
    static getDerivedStateFromProps(props, state){
        if(props.isDetailFetching){
            return null;
        }

        if(props.entity[props.entity.entityType + " Detail"]){
            let detailRecord = props.entity.entityType + " Detail";
            if(props.entity[detailRecord].$key !== state.$key){
                if(state.editing){
                    //Field is editing
                    return { 
                        [state.draftField] : {
                            value : state[state.draftField].value,
                            isDirty : true
                        },
                        editing : false 
                    }
                } else {
                    return { 
                        Key : props.entity[detailRecord].$key,
                        Email : { value : props.entity[detailRecord].Email },
                        Notes : { value : props.entity[detailRecord].Notes },
                        Status : { value : props.entity[detailRecord].Status }
                    }
                }
            }
        }
        return null;
    }

    getLocalResources = (session) => {
        this.handleSingleResource(
            session,
            resourceQueryTypes.picklist,
            'Lead Status Web'
        );
    }

    handleSingleResource = (session, resource, identifier) => {
        session.sData.get(resource, identifier)
            .then((res) => {
                if(res){
                    let vals = {[identifier] : []};
                    [res.$resources].forEach((arr) =>{
                        arr.forEach((obj)=>{
                            vals[identifier].push(obj.text);
                        })
                    })

                    this.setState({
                        [resource] : vals
                    });
                }else{
                    console.log('error');
                }
            }).catch((e) => {
                alert('an error occurred fetching '+resource, e);
            })
    }

    /*
        Basic validity check and setState
    */
    handleChange = (event, fieldName) => {
        let valid = false;

        if(fieldName === 'Email'){
            valid = validateEmail(event.target.value);
        } else {
            valid = true;
        }

        if(valid){
            this.setState({ 
                [fieldName] : { 
                    value : event.target.value
                },
                draftField : fieldName,
                editing : true
            });
        }
    }

    onSubmit = (entity) => {
        this.props.dispatch(handleEntityUpdate(this.props.session, entity.entityType, entity[this.state.detailRecord]));
    }

    render(){
        const { session, isDetailFetching, entity } = this.props;
        let { Email, Notes, Status, picklists } = this.state;

        return (
            <React.Fragment>
                {isDetailFetching ? (
                    <Loading isDetailFetching />
                ):(
                    session.isAuthenticated && entity ? (
                        <form className="container" onSubmit={this.onSubmit}>
                            <SingleInput
                                inputType={'text'}
                                title={'Email'}
                                name={'Email'}
                                controlFunc={this.handleChange}
                                content={ Email.value }
                                isDirty={ Email.isDirty }
                                placeholder={'Enter Email here'} 
                            />
                            <Textbox
                                title={'Notes'}
                                rows={2}
                                name={'Notes'}
                                content={ Notes.value }
                                isDirty={ Notes.isDirty }
                                resize={true}
                                placeholder={'Enter Notes here'} 
                                controlFunc={this.handleChange}
                            />
                            <PickList
                                title={ 'Status' }
                                name={ 'Status' }
                                value={ Status.value }
                                controlFunc={ this.handleChange }
                                isDirty={ Status.isDirty }
                                placeholder={ 'Lead Status' }
                                options={ picklists ? picklists['Lead Status Web'] : [] }
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

DetailContainer.propTypes = {
    session : PropTypes.object.isRequired
}

function mapStateToProps(state) {
    const { session, entity } = state;
    const { isDetailFetching } = entity || { isDetailFetching : true }; 

    const stateProps = {
        session,
        entity,
        isDetailFetching
    }

    return { ...stateProps }
  }

export default connect(mapStateToProps)(DetailContainer);