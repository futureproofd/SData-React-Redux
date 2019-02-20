export const ENTITY_LIST = "ENTITY_LIST";
export const ENTITY_DETAIL = "ENTITY_DETAIL";
export const ENTITY_REQUEST = "ENTITY_REQUEST";

import { entityTypes } from '../config/config';

function _entityList(data, entityType){
    return {
        'type' : ENTITY_LIST,
        'entityType' : [entityType],
        'entity' : data,
        'isFetching' : false
    }
}

function _entityDetail(data, entityType){
    return {
        'type' : ENTITY_DETAIL,
        'entityType' : [entityType],
        'entity' : data,
        'isFetching': false
    }
}

function _entityRequest(){
    return {
        'type' : ENTITY_REQUEST,
        'isFetching' : true
    }
}

export function handleEntitiesQuery(session, entity, where){
    return (dispatch) => {
        dispatch(_entityRequest());
        session.sData.read(entity, where)
        .then((res) =>{
            if(res){
                entityTypes.forEach(e => {
                    res.$descriptor.indexOf(e) > 0 ? dispatch(_entityList(res, e)) : '';
                })
            } else {
                console.log('error');
            } 
        }).catch(() => {
            alert('an error occurred. Try again.');
        })
    }
};

export function handleSingleEntity(entity, entityType){
    return (dispatch) => {
        dispatch(_entityRequest());
        dispatch(_entityDetail(entity, entityType));
    }
}