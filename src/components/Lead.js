import React, { Component } from 'react';

class Lead extends Component {
    render(){
                /*testing. move this
        sData.get('accounts','A6UJ9A000I26')
            .then((res) =>{
                console.log(res)
            }).catch(() => {
                alert('an error occurred. Try again.');
            })
          */  
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
                <div className="form-group col-md-2">
                    <label for="inputCompany">Company</label>
                    <input type="text" className="form-control" id="inputCompany" placeholder="Company"/>
                </div>
                <div className="form-group col-md-2">
                    <label for="inputAddress">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="123 Sprawl Ave."/>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label for="inputCity">City</label>
                        <input type="text" className="form-control" id="inputCity"/>
                    </div>
                    <div className="form-group col-md-2">
                        <label for="inputState">State</label>
                        <select id="inputState" className="form-control">
                            <option selected>Choose...</option>
                            <option>...</option>
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <label for="inputZip">Zip</label>
                        <input type="text" className="form-control" id="inputZip"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck"/>
                        <label className="form-check-label" for="gridCheck">
                            No Auto-Assign
                        </label>
                    </div>
                </div>
            </fieldset>
            </form>
        )
    }
}

export default Lead;