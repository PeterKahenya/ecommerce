import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './Login.css'
import { Button } from '@material-ui/core';
import { login } from "../../helpers";
import * as firebase from 'firebase'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "" }
    }

    getToken() {
        const messaging = firebase.messaging()
        messaging.requestPermission()
            .then(async () =>{ return messaging.getToken() })
            .then(async token=> {
                var status= await login({'gcm_token':token, 'email': this.state.email, password: this.state.password })
                if (status) {
                    this.props.authSuccess()
                } else {
                   console.log("Something Went wrong!") 
                }
            }).catch(function (err) {
                console.log("Error Occurred", err)
            })
    }

    render() {
        return (<div className="loginContainer">
            <label>Login</label>
            <form className="loginForm" noValidate autoComplete="off">
                <TextField onChange={e => this.setState({ email: e.target.value })} value={this.state.email} id="outlined-basic" label="Email Address" placeholder="Email Address" variant="outlined" />
                <TextField onChange={e => this.setState({ password: e.target.value })} value={this.state.password} id="outlined-basic" type="password" label="Password" placeholder="Password" variant="outlined" />
                <Button className="bg-success text-white" onClick={this.getToken.bind(this)}>Login</Button>
            </form>
        </div>);
    }
}

export default Login;