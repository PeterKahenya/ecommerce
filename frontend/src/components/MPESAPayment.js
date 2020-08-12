import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import lipa from"../lipanampesa.png"
import * as config from '../config'
import { getCookie } from '../helpers';
const axios = require('axios')

class MPESAPayment extends Component {
    constructor(props) {
        super(props);
        this.state = { mpesa_code:"" }
    }

    async confirmMpesaPayment(){
        let response=await axios({
            url:"http://127.0.0.1:8000/payment/payment-method-one/check",
            method:"POST",
            headers:{
                'Authentication':'Token '+getCookie("auth_token")
            },
            data:{
                code:this.state.mpesa_code
            },
        })
        if (response.status===200) {
            this.props.setPayment(response.data)
        }
    }

    render() { 
        return ( <div>
            <img src={lipanampesa}/>
            <p>
                <strong>Pay Bill:</strong> {config.paybill_no} <br/>
                <strong>Account Number:</strong> Your Phone Number <br/>
            </p>
            <TextField value={this.state.mpesa_code} onChange={(e)=>this.setState({mpesa_code:e.target.value})} placeholder="MPESA Code"/>
            <Button onClick={this.confirmMpesaPayment.bind()}>Confirm Payment</Button>
        </div> );
    }
}
 
export default MPESAPayment;