import React, { Component } from 'react';
import { Button, Dialog, AppBar, Toolbar, Typography, Container } from '@material-ui/core';
import Checkout from './Checkout';
import CheckoutStepper from './CheckoutStepper';
import Order from './Order';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = { openCheckout:false }
    }

    handleOpenCheckout(){
        this.setState({openCheckout:!this.state.openCheckout})
    }

    updateCart(params){
        this.props.updateCart(params)
    }

    render() { 
        return ( <div>
            
            <Order updateCart={this.updateCart.bind(this)} cart={this.props.cart} />

            <Dialog open={this.state.openCheckout} fullScreen>
                <AppBar className="bg-warning text-dark" position="static">
                    <Toolbar>
                        <Typography>
                            Checkout
                        </Typography>
                        <Button onClick={this.handleOpenCheckout.bind(this)}>
                            BACK
                        </Button>

                    </Toolbar>
                </AppBar>
                <Container>
                    <CheckoutStepper/>
                </Container>
            </Dialog>

            <Button onClick={this.handleOpenCheckout.bind(this)}>Proceed to Checkout</Button>
        </div> );
    }
}
 
export default Cart;