import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SDataService } from '../utils/API';
import { handleLogin } from '../actions/authUser';

class Login extends Component{
    authenticateUser = (e) => {
        e.preventDefault();

        var sData = SDataService('https://yoursite:3333/sdata/slx/dynamic/-/');

        sData.setAuthenticationParameters(this.userInput.value,this.pwInput.value)
            .then((res)=>{
                res ? this.props.dispatch(handleLogin(sData)) : console.log('error');
            })
    }

    render(){
        return(
            <div>
                <h1>Login</h1>
                <input
                    type='text'
                    placeholder='username'
                    ref={(userInput) => this.userInput = userInput}
                />
                <input
                    type='password'
                    placeholder='password'
                    ref={(pwInput) => this.pwInput = pwInput}
                />
                <button onClick={this.authenticateUser}>Login</button>
            </div>
        )
    }
}

export default connect()(Login);