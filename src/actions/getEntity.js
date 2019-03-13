export const ENTITY_LIST = "ENTITY_LIST";
export const ENTITY_DETAIL = "ENTITY_DETAIL";
export const ENTITY_LIST_REQUEST = "ENTITY_LIST_REQUEST";
export const ENTITY_DETAIL_REQUEST = "ENTITY_DETAIL_REQUEST";

import { entityTypes } from '../config/config';

function _entityList(data, entityType){
    return {
        'type' : ENTITY_LIST,
        'entityType' : [entityType],
        'entity' : data,
        'isListFetching' : false
    }
}

function _entityDetail(data, entityType){
    return {
        'type' : ENTITY_DETAIL,
        'entityType' : [entityType],
        'entity' : data,
        'isDetailFetching': false
    }
}

function _entityListRequest(){
    return {
        'type' : ENTITY_LIST_REQUEST,
        'isListFetching' : true
    }
}

function _entityDetailRequest(){
    return {
        'type' : ENTITY_DETAIL_REQUEST,
        'isDetailFetching' : true
    }
}

export function handleEntitiesQuery(session, entity, where){
    return (dispatch) => {
        dispatch(_entityListRequest());
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

export function handleSingleEntity(session, entity, entityType){
    return (dispatch) => {
        //request is in the form of an ID, i.e. direct url link- not an entity object
        if(typeof entity === 'string'){
            dispatch(_entityDetailRequest());
            session.sData.get(entityType, entity)
            .then((res) => {
                if(res){
                    dispatch(_entityDetail(res, entityType));
                }else{
                    console.log('error');
                }
            }).catch((e) => {
                alert('an error occurred fetching entity: '+ e);
            })
        } else {
            dispatch(_entityDetailRequest());
            dispatch(_entityDetail(entity, entityType));
        }
    }
}