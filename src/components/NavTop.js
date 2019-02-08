import React, { Component } from 'react';

import Login from './Login';
import Logout from './Logout';
import { handleLogin, handleLogout } from '../actions/authSession';
import NavSidebar from './NavSidebar';

class NavTop extends Component{

    render(){
        const { dispatch, isAuthenticated } = this.props;
        return(
            <div>
            <nav className="navbar navbar-default">
                <a className="navbar-brand" href="#">SLX CRM</a>
                <div className='navbar-form'>
                    {isAuthenticated ? (
                        <Logout logoutClick={()=>dispatch(handleLogout())}/> 
                    ):(
                        <Login loginClick={(user,pw)=>dispatch(handleLogin(user,pw))}/>
                    )}
                </div>
             </nav>
                {isAuthenticated && <NavSidebar isAuthenticated/>}
            </div>
        )
    }
}

export default NavTop;