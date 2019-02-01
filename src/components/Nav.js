import React, { Component } from 'react';

import Login from '../components/Login';
import Logout from '../components/Logout';
import { handleLogin, handleLogout } from '../actions/authSession';
import NavSidebar from './NavSidebar';

class Nav extends Component{
    constructor(props, context){
        super(props,context);
        console.log('nav props', props);
        console.log('nav context', context);
    }
    
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
                {isAuthenticated && <NavSidebar/>}
            </div>
        )
    }
}

export default Nav;