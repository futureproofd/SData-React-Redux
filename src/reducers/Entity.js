import { ENTITY_LIST, ENTITY_DETAIL } from '../actions/getEntity';

export default function entity (state, action){
    switch(action.type){
        case ENTITY_LIST :
            return (
                {
                    [action.entityType] : action.entity
                }
            )
        case ENTITY_DETAIL :
            return (
                {
                    ...state,
                    [action.entityType +' Detail'] : action.entity
                }
            )
        default : 
            return null;
    }
}

