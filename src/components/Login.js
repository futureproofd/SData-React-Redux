import React, { Component } from 'react';

class Login extends Component{

    handleClick = (e) => {
        e.preventDefault();
        const username = this.userInput.value;
        const password = this.pwInput.value;
        this.props.loginClick(username,password);
    }

    render(){
        return(
            <div>
                <input className="form-control w-100" style={{ marginRight: '5px' }}
                    type='text'
                    placeholder='username'
                    ref={(userInput) => this.userInput = userInput}
                />
                <input className="form-control w-100" style={{ marginRight: '5px' }}
                    type='password'
                    placeholder='password'
                    ref={(pwInput) => this.pwInput = pwInput}
                />
                <button onClick={this.handleClick} className={"btn btn-primary"}>Login</button>
            </div>
        )
    }
}

export default Login;