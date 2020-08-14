import React, { Component } from 'react';
import ShippingAddressForm from './ShippingAddressForm';
import { Stepper,Step, StepLabel, StepContent, Button, Divider } from "@material-ui/core";
import ConfirmOrder from './ConfirmOrder';
import Order from './Order';
import MPESAPayment from './MPESAPayment';
import { getCookie } from './helpers';
const axios =require("axios")


class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = { activeStep:0,payment:null,addr:{},cart:this.props.cart }
    }

    nextStep(){
        this.setState({activeStep:this.state.activeStep+1})
    }

    async finishOrder(){
        const response=await axios({
            url:'http://127.0.0.1:8000/api/shop/checkout',
            method:"POST",
            data:{
                shipping_address_id:this.state.addr.id,
                mpesa_payment_id:this.state.payment.id
            },
            headers:{
                Authorization:'Token '+getCookie("auth_token")
            }

        })
        if (response.status=201) {
            this.setState({pendingDelivery:true})
        } else {
            
        }
    }

    updateCart(params){
        this.props.updateCart(params)
    }
    setAddress(addr){
        console.log(addr)
        this.setState({addr:addr})
    }
    setPayment(payment){
        this.setState({payment:payment})
    }


    render() { 
        let total=parseFloat(0)

        this.props.cart.order_items.map(oi=>{
            console.log(total,parseFloat(oi.product.price),oi.quantity)
            return total=parseFloat(total+parseFloat(oi.product.price)*parseFloat(oi.quantity))
        })
        return ( <div>
            <Stepper activeStep={this.state.activeStep} orientation="vertical">
                <Step key={0}>
                    <StepLabel>Cart</StepLabel>
                    <StepContent>
                        <h2>KES. {parseFloat(total)} </h2>
                        <Order cart={this.props.cart} updateCart={this.updateCart.bind(this)}/>
                        <Button onClick={this.nextStep.bind(this)}>Next</Button>
                    </StepContent>
                </Step>
                <Step key={0}>
                    <StepLabel>Delivery Address</StepLabel>
                    <StepContent>
                        <div className="alert alert-success" role="alert">

                        {this.state.addr.city}

                        </div>
                        <ShippingAddressForm nextStep={this.nextStep.bind(this)} address={this.state.addr} setAddress={this.setAddress.bind(this)}/>
                    </StepContent>
                </Step>
                <Step key={1}>
                    <StepLabel>Payment</StepLabel>
                    <StepContent>
                        <MPESAPayment nextStep={this.nextStep.bind(this)} setPayment={this.setPayment.bind(this)}/>
                    </StepContent>
                </Step>
                <Step key={2}>
                    <StepLabel>Confirm</StepLabel>
                    <StepContent>
                        <ConfirmOrder />
                        <Button onClick={this.finishOrder.bind(this)}>Finish</Button>
                    </StepContent>
                </Step>
            </Stepper>
        </div> );
    }
}
 
export default Checkout;