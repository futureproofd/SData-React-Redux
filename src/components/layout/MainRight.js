import React, { Component } from 'react';
import {
    Route,
    withRouter
} from 'react-router-dom';

import GridContainer from '../grid/GridContainer';

class MainRight extends Component {
    render(){
        const { isAuthenticated } = this.props;
        const routes = [
            {
                path: '/accounts',
                component: GridContainer,
                isAuthenticated: isAuthenticated
            },
            {
                path: '/contacts',
                component: GridContainer,
                isAuthenticated: isAuthenticated
            },
            {
                path: '/leads',
                component: GridContainer,
                isAuthenticated: isAuthenticated
            }
        ]

        return (
            <React.Fragment>
                <aside>
                    {routes.map(({path, component: C, isAuthenticated: auth})=> (
                        <Route key={path}
                            path={path} 
                            render={
                                (props) => <C {...props} isAuthenticated={auth} />
                            }
                        />
                    ))}
                </aside> 
            </React.Fragment>
        )
    }
}

export default withRouter(MainRight);
