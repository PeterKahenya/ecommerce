import React, { Component } from 'react';
import { Button, Dialog, AppBar, Toolbar, Typography, Container } from '@material-ui/core';
import Checkout from './Checkout';
import CheckoutStepper from './CheckoutStepper';
import Order from './Order';
// import {getCookie,getOrCreateCookieCart,updateCart as uc} from "./helpers"
const helpers = require("./helpers")



class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = { openCheckout:false }
    }

    handleOpenCheckout(){
        if (helpers.getCookie("auth_token")) {
        this.setState({openCheckout:!this.state.openCheckout})
        } else {
            this.props.authenticate()
        }
    }

    updateCart(params){
        console.log("updateCart in Cart Component")

        this.props.updateCart(params)
    }

    render() { 
        let total=parseFloat(0)

        this.props.cart.order_items.map(oi=>{
            console.log(total,parseFloat(oi.product.price),oi.quantity)
            return total=parseFloat(total+parseFloat(oi.product.price)*parseFloat(oi.quantity))
        })

        return ( <div className="m-4 p-4">
            <h2 className="text-warning p-2">KES. {parseFloat(total)} </h2>
            <Order updateCart={this.updateCart.bind(this)} cart={this.props.cart} />

            <Dialog open={this.state.openCheckout} fullScreen>
                <AppBar className="bg-warning text-dark" position="static">
                    <Toolbar>
                        <Button onClick={this.handleOpenCheckout.bind(this)}>
                            BACK
                        </Button>
                        <Typography>
                            Checkout
                        </Typography>


                    </Toolbar>
                </AppBar>
                <Container>
                    <Checkout updateCart={this.updateCart.bind(this)} cart={this.props.cart} />
                </Container>
            </Dialog>

            <button className="btn btn-lg btn-primary" onClick={this.handleOpenCheckout.bind(this)}>Proceed to Checkout</button>
        </div> );
    }
}
 
export default Cart;