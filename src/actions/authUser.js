export const USER_SESSION = "USER_SESSION";

function _userSession(session){
    return{
        type: USER_SESSION,
        session
    }
}

export function handleLogin(session){
    //return a function, use middleware thunk
    return (dispatch) => {
        dispatch(_userSession(session))
    }
}