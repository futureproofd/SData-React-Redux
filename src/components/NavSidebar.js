import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavSidebar extends Component{
/*TODO: get that routes array based on user permissions*/
    render(){
        return( 
            <React.Fragment>
                <nav className={"outer-col-1"}>
                    <ul>
                        <li className="nav-item">
                            <Link to="/accounts" className="nav-link active">Accounts</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contacts" className="nav-link active">Contacts</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/leads" className="nav-link active">Leads</Link>
                        </li>
                    </ul>
                </nav>
            </React.Fragment>
        );
    }
}

export default NavSidebar;
