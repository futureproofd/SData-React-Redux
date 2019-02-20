import React, { Component } from 'react';

import "../../styles/layout.css";

class DetailView extends Component{

        render(){
            let { entity } = this.props;
            let entityDetail = entity.entityType+" Detail";

            return( 
                <div>{entity[entityDetail].Email}</div>
            );
        }
    }
    
export default DetailView;