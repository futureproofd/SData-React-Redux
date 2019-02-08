import React from 'react';
import { css } from '@emotion/core';

import { PropagateLoader } from 'react-spinners';

const override = css`
flex: 1,
marginTop:240,
justifyContent: 'center',
alignItems:'center'
`;

class Loading extends React.Component{

    
    render(){
        return(
            <div className="loader">
                <PropagateLoader 
            
                    sizeUnit={"px"}
                    size={10}
                    color={'#3977B5'}
                    loading={this.props.loading}
                />
            </div>
        )
    }
}

export default Loading;