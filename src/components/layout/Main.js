import React, { Component } from 'react';

import MainLeft from './MainLeft';
import MainRight from './MainRight'

export default class Main extends Component {
    render(){
        return (
            <div className={"inner-row"}>
                <div className={"inner-col"}>
                    <MainLeft />
                </div>
                    <MainRight />
            </div>
        )
    }
}
