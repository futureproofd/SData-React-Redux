import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import DetailContainer from './DetailContainer';


class NavSidebar extends Component{
/*TODO: get that routes array based on user permissions*/
    render(){
        const { dispatch, isAuthenticated } = this.props;

        const routes = [
            {
                path: '/leads',
                component: DetailContainer
            }
        ]

        return( 
            <Router>
                <div style={{ display: "flex" }}>
                    <div className="row">
                        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                            <div className="sidebar-sticky">
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <Link to="/leads" className="nav-link active">Leads</Link>
                                    </li>
                                </ul>

                            </div>
                        </nav>
                    </div>
                    {routes.map(({path, component: C})=> (
                        <Route 
                            path={path} 
                            render={
                                (props) => <C {...props} isAuthenticated dispatch />
                            }
                        />
                    ))}
                </div>
            </Router>
        );
    }
}

export default NavSidebar;
