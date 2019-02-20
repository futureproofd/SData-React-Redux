import { ENTITY_LIST, ENTITY_DETAIL, ENTITY_REQUEST } from '../actions/getEntity';

export default function entity (state, action){
    switch(action.type){
        case ENTITY_LIST :
            return (
                {
                    ...state,
                    [action.entityType] : action.entity,
                    'entityType': action.entityType[0],
                    'isFetching' : false
                }
            )
        case ENTITY_DETAIL :
            return (
                {
                    ...state,
                    [action.entityType +' Detail'] : action.entity,
                    'entityType': action.entityType[0],
                    'isFetching' : false
                }
            )
        case ENTITY_REQUEST : 
            return (
                {
                    ...state,
                    'isFetching' : true
                }
            )
        default : 
            return null;
    }
}

