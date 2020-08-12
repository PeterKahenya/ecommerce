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
        this.state = { formtype: 'login' }
    }

    authSuccess(){
        this.props.authSuccess()
    }

    toggleAuthDialog(){
        this.props.toggleAuthDialog()
    }

    switchForms(){
        this.setState({formtype:this.state.formtype==='login'?'signup':'login'})
    }


    render() {
        const { classes, theme } = this.props
        return (
            <Dialog onClose={this.toggleAuthDialog.bind(this)} className="authContainer" open={this.props.show}>
                <div className="authContainer">
                {this.state.formtype === "login" ? 
                <Login switchForms={this.switchForms.bind(this)} authSuccess={this.authSuccess.bind(this)}/>: 
                <SignUp switchForms={this.switchForms.bind(this)} authSuccess={this.authSuccess.bind(this)}/>
                }
                </div>
            </Dialog>
        );
    }
}

export default AuthenticateDialog;