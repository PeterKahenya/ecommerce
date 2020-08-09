import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Login from './Login';
import SignUp from './SignUp';
import './Auth.css'
import { makeStyles,withStyles,withTheme } from '@material-ui/core/styles';
const axios = require("axios")



class AuthenticateDialog extends Component {
    constructor(props) {
        super(props);
        this.state = { formtype: 'signup' }
    }

    authSuccess(){
        this.props.authSuccess()
    }
    render() {
        const { classes, theme } = this.props
        console.log(this.props)

        return (
            <Dialog className="authContainer" open={this.props.show}>
                {this.state.formtype === "login" ? 
                <Login authSuccess={this.authSuccess.bind(this)}/> : 
                <SignUp authSuccess={this.authSuccess.bind(this)}/>
                }
            </Dialog>
        );
    }
}

export default AuthenticateDialog;