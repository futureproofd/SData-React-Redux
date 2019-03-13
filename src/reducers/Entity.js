import { ENTITY_LIST, 
    ENTITY_DETAIL, 
    ENTITY_LIST_REQUEST, 
    ENTITY_DETAIL_REQUEST 
} from '../actions/getEntity';

export default function entity (state, action){
    switch(action.type){
        case ENTITY_LIST :
            return (
                {
                    ...state,
                    [action.entityType] : action.entity,
                    'entityType': action.entityType[0],
                    'isListFetching' : false
                }
            )
        case ENTITY_DETAIL :
            return (
                {
                    ...state,
                    [action.entityType +' Detail'] : action.entity,
                    'entityType': action.entityType[0],
                    'isDetailFetching' : false
                }
            )
        case ENTITY_LIST_REQUEST : 
            return (
                {
                    ...state,
                    'isListFetching' : true
                }
            )
        case ENTITY_DETAIL_REQUEST : 
            return (
                {
                    ...state,
                    'isDetailFetching' : true
                }
            )
        default : 
            return null;
    }
}

