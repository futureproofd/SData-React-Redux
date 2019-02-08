import { SDataService } from '../utils/API';

import { endPoint } from '../config/config';

export const USER_SESSION = "USER_SESSION";
export const LOGOUT_SESSION = "LOGOUT_SESSION";


function _userSession(sData, token){
    return{
        type: USER_SESSION,
        sData, 
        token,
        isAuthenticated : true
    }
}

function _logoutSession(){
    return{
        type: LOGOUT_SESSION,
        isAuthenticated : false 
    }
}

//action creators
export function handleLogin(username, pw){
    //return a function, use middleware thunk
    return (dispatch) => {
        let token = (username+pw);
        var sData = SDataService(endPoint);

        sData.setAuthenticationParameters(username,pw)
            .then((res)=>{
                res ? dispatch(_userSession(sData,token))
                    : console.log('error'); //todo: dispatch login error
            })
    }
}

export function handleLogout(){
    return (dispatch) => {
        dispatch(_logoutSession())
    }
}