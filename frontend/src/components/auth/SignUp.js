import React, { Component } from 'react';
import { signup } from "../../helpers";
import * as firebase from 'firebase'
import { Button, TextField, Tab, Tabs } from '@material-ui/core';
import { ContactsRounded, ContactSupport } from "@material-ui/icons";
import './SignUp.css'


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            cpassword: "",
            tab: 0,
            specialty: ""
        }
    }

    async getToken() {
        const messaging = firebase.messaging()
        messaging.requestPermission()
            .then(async () => { return await messaging.getToken() })
            .then(async token => {
                var status=await signup({ 'gcm_token': token, ...this.state })
                if (status) {
                    this.props.authSuccess()
                } else {
                   console.log("Something Went wrong!") 
                }
            }).catch(function (err) {
                console.log("Error Occurred", err)
            })
    }

    handleChange(event, newValue) {
        this.setState({ tab: newValue })
    }

    render() {
        return (<div className="signUpContainer">
            <label>SignUp</label>
            <Tabs centered style={{ display: 'flex', width: '100vw !important', justifyContent: "center" }} value={this.state.tab} onChange={this.handleChange.bind(this)}>
                <Tab icon={<ContactSupport />} style={{ flexGrow: 1 }} label="Customers" id="simple-tab-1" aria-controls="simple-tabpane-1" />
                <Tab icon={<ContactsRounded />} style={{ flexGrow: 1 }} label="Experts" id="simple-tab-2" aria-controls="simple-tabpane-3" />
            </Tabs>
            {this.state.tab === 0 ? <form className="signUpForm" noValidate autoComplete="off">
                <TextField onChange={e => this.setState({ first_name: e.target.value })} value={this.state.first_name} id="" label="First Name" placeholder="First Name" variant="outlined" />
                <TextField onChange={e => this.setState({ last_name: e.target.value })} value={this.state.last_name} label="Last Name" placeholder="Last Name" variant="outlined" />
                <TextField onChange={e => this.setState({ email: e.target.value })} value={this.state.email} label="Email Address" placeholder="Email Address" variant="outlined" />
                <TextField onChange={e => this.setState({ password: e.target.value })} value={this.state.password} type="password" label="Password" placeholder="Password" variant="outlined" />
                <TextField onChange={e => this.setState({ cpassword: e.target.value })} value={this.state.cpassword} id="outlined-basic" type="password" label="Confirm Password" placeholder="Confirm Password" variant="outlined" />
                <Button className="bg-success text-white" onClick={this.getToken.bind(this)}>Sign Up</Button>
            </form> : <form className="signUpForm" noValidate autoComplete="off">
                    <TextField onChange={e => this.setState({ first_name: e.target.value })} value={this.state.first_name} id="" label="First Name" placeholder="First Name" variant="outlined" />
                    <TextField onChange={e => this.setState({ last_name: e.target.value })} value={this.state.last_name} label="Last Name" placeholder="Last Name" variant="outlined" />
                    <TextField onChange={e => this.setState({ email: e.target.value })} value={this.state.email} label="Email Address" placeholder="Email Address" variant="outlined" />
                    <TextField onChange={e => this.setState({ specialty: e.target.value })} value={this.state.specialty} label="Specialty" placeholder="Specialty" variant="outlined" />
                    <TextField onChange={e => this.setState({ password: e.target.value })} value={this.state.password} type="password" label="Password" placeholder="Password" variant="outlined" />
                    <TextField onChange={e => this.setState({ cpassword: e.target.value })} value={this.state.cpassword} id="outlined-basic" type="password" label="Confirm Password" placeholder="Confirm Password" variant="outlined" />
                    <Button className="bg-success text-white" onClick={this.getToken.bind(this)}>Sign Up</Button>

                </form>

            }
                <Button className="bg-warning text-white" onClick={this.props.switchForms.bind(this)}>Login</Button>
            

        </div>);
    }
}

export default SignUp;