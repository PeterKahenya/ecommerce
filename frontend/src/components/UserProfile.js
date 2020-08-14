import React, { Component } from 'react';
import { Avatar, Typography, Paper } from '@material-ui/core';
import { getCookie } from './helpers';

const axios = require('axios')
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { user:{
            first_name:"Peter",
            last_name:"Kahenya",
            email:"peter@kipya-africa.com",


        } }
    }

    async componentDidMount(){
        if (getCookie("auth_token")) {

            let response = await axios({
                url:"http://127.0.0.1:8000/api/get_user_details",
                method:"GET",
                headers:{
                    Authentication:"Token "+getCookie("auth_token")
                }
            })
            
        } else {

        }
    }



    render() { 
        return ( <Paper>
            <Avatar> 
                <Typography>{this.state.user.first_name.substring(0,1)}</Typography>
            </Avatar>
            <div>{this.state.user.first_name} {this.state.user.last_name}</div>
            <div>{this.state.user.email}</div>
            
            <div>Cart</div>
            <div>Logout</div>
            <div>Update Profile</div>



        </Paper> );
    }
}
 
export default UserProfile;