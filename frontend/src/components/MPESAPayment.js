import React, { Component } from 'react';
import { TextField, Button,Paper } from '@material-ui/core';
import lipanampesa from"./lipanampesa.png"
import * as config from '../config'
// import { getCookie } from './helpers';
const helpers = require("./helpers")

const axios = require('axios')

class MPESAPayment extends Component {
    constructor(props) {
        super(props);
        this.state = { mpesa_code:"",payment:null,message:"",enableNext:false }
    }

    async confirmMpesaPayment(){
        let response=await axios({
            url:"http://127.0.0.1:8000/api/shop/payment/payment-method-one/check",
            method:"POST",
            headers:{
                Authorization: 'Token ' + helpers.getCookie("auth_token")
            },
            data:{
                code:this.state.mpesa_code
            },
        })
        if (response.status===200 && !response.data.NF) {
            this.props.setPayment(response.data)
            this.setState({payment:response.data,message:"",enableNext:true})
        }else{
            this.setState({message:response.data.message,enableNext:false})
        }
    }

    finishPayment(){
        this.props.nextStep()
    }

    render() { 
        return ( <div style={{maxWidth:400}}>
                {this.state.payment?
                    <Paper className="bg-success text-white p-4" style={{maxWidth:400}}>
                        Confirmed Payment of KES. {this.state.payment.amount} transaction code {this.state.payment.code}
                         for account number {this.state.payment.account_no} by {this.state.payment.payment_by}
                    </Paper>

                    :null}
                    {this.state.message?
                    <Paper className="bg-warning p-4" style={{maxWidth:400}}>
                        {this.state.message}
                    </Paper>

                    :null}
                <Paper style={{maxWidth:400}}>
                    <img style={{maxWidth:300}} src={lipanampesa}/>
                </Paper>
                <Paper className="p-3 mt-1">
                    <h4 className="text-muted">Payment Details</h4>
                    <h5>Pay Bill:<strong className="text-success">{config.paybill_no}</strong>  </h5>
                    <h5>Account Number:<strong className="text-success"><i>Phone Number </i></strong></h5>
                </Paper>
                <Paper className="p-4 mt-1 d-flex flex-column">
                    <TextField id="outlined-basic" label="MPESA Transaction Code" variant="outlined" value={this.state.mpesa_code} onChange={(e)=>this.setState({mpesa_code:e.target.value})} />
                    <button className="btn btn-primary mt-1" onClick={this.confirmMpesaPayment.bind(this)}>Confirm Payment</button>
                </Paper>
            {this.state.enableNext?<button className="btn btn-lg btn-primary" onClick={this.finishPayment.bind(this)}>Next</button>:null}
        </div> );
    }
}
 
export default MPESAPayment;