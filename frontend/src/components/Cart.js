import React, { Component } from 'react';
import { Button, Dialog, AppBar, Toolbar, Typography, Container } from '@material-ui/core';
import Checkout from './Checkout';
import CheckoutStepper from './CheckoutStepper';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = { openCheckout:false }
    }

    handleOpenCheckout(){
        this.setState({openCheckout:!this.state.openCheckout})
    }
    render() { 
        return ( <div>
            {this.props.cart.order_items.map(oi=>{
                return <div>order_item</div>
            })}

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