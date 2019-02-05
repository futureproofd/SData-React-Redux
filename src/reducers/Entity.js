import { ENTITY_LIST } from '../actions/getEntity';

export default function entity (state, action){
    switch(action.type){
        case ENTITY_LIST :
        debugger;
            return (
                {
                    [action.entityType] : action.entity
                }
            )
        default : 
            return null;
    }
}

