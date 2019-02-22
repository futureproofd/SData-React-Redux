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

/*action creators */

//Handles initial login
export function handleLogin(username, pw){
    //return a function, use middleware thunk
    return (dispatch) => {
        let token = btoa(username+ ':' + pw);
        const sData = SDataService(endPoint);

        sData.setAuthenticationParameters(username,pw)
            .then((res)=>{
                if(res){
                    //stores our 'token' for refreshing session
                    localStorage.setItem('token',token);
                    dispatch(_userSession(sData,token))
                }else{
                    console.log('error'); //todo: dispatch login error
                } 
            })
    }
}

//Handles browser refresh (checks localStorage for fake token)
export function reAuthenticate(token){
    return (dispatch) => {
        let creds = atob(token);
        let username = creds.substring(0,creds.indexOf(':'));
        let password = creds.substring(creds.indexOf(':')+1,creds.length);
        const sData = SDataService(endPoint,username,password);
        dispatch(_userSession(sData,token));
    }
}

export function handleLogout(){
    return (dispatch) => {
        localStorage.removeItem('token');
        dispatch(_logoutSession())
    }
}