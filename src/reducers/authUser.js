import { USER_SESSION } from '../actions/authUser';

export default function session ( state = null, action){
    switch(action.type){
        case USER_SESSION : 
            return(
                action.session
            )
        default :
            return state;
    }
}