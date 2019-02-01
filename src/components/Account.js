import React, { Component } from 'react';

class Account extends Component {
    render(){

        return (
            <form>
            <fieldset disabled>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label for="inputEmail">Email</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder="Email"/>
                    </div>
                </div>
                <div className="form-group col-md-2">
                    <div>
                        <label for="inputName">Name</label>
                        <input type="text" className="form-control" id="inputName" placeholder="FirstName LastName"/>
                    </div>
                </div>
            </fieldset>
            </form>
        )
    }
}

export default Account;