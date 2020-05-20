import React from 'react';
import '../App.css';
import { Base64 } from 'js-base64';
import api from "../actions/api.js";

import './login.css';

const initialState = {
    email: "",
    password: "",
    emailError: "",
    passwordError: ""
}

class Login extends React.Component {

    state =initialState;

    handleChange = e => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const isValid = this.validate();
        if(isValid){
            const userMail = this.state.email;
            const userPassword = this.state.password;
            api.createUser().fetchAll().then(res => {
                const user = res.data.filter( user => user.email===userMail)
                if(user.length===1){
                    if(user[0]['password']===Base64.encode(userPassword)){
                        alert("Wellcome Back!")
                        localStorage.setItem('email',user[0]['email'])
                        localStorage.setItem('type',user[0]['type'])
                        window.location.href = '/order'
                    }else{
                        alert("Wrong Password!")
                    }
                }else{
                    alert("This Email No Register!")
                }
            });
        }
    }

    validate = () => {
        let emailError = "";
        let passwordError = "";

        if(!this.state.password){
            passwordError="Password Required!"
        }

        if(!this.state.email){
            emailError="Email Required!"
        }else if(!this.state.email.includes('@')){
            emailError = "Invalid Email!";
        }

        if(emailError || passwordError){
            this.setState({ emailError , passwordError});
            return false;
        }else{
            this.setState(initialState);
        }

        return true;
    }

    render (){
        return (
            <div class="container-fluid login-bg" align="center">

                <br></br><br/>

                <div className="card shadow login-w">
                    <div className="card-header login-header text-light">
                        <h1>Login</h1>
                    </div>
                    <div className="card-body">

                        <form autoComplete="off" onSubmit={this.handleSubmit}>

                            <div className="form-group row">
                                <label for="email_address" class="col-3 text-right col-form-label">Email</label>
                                <div className="col">
                                    <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.handleChange} />
                                    <small><div className="float-left p-2" style={{color : "red"}}>{this.state.emailError}</div></small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label for="password" class="col-3 text-right col-form-label">Password</label>
                                <div className="col">
                                    <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
                                    <small><div className="float-left p-2"  style={{color : "red"}}>{this.state.passwordError}</div></small>
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary login-btn float-right"> Login </button>

                        </form>

                        <br/><br/>

                    </div>
                </div>

            </div>
        );
    }
}

export default Login;
