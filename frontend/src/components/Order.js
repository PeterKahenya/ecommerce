import React, { Component } from 'react';
import { Avatar, TextField, Button } from '@material-ui/core';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    updateCart(oi,quantity){
        this.props.updateCart({
            product:oi.product,
            quantity:quantity
        })
    }

    render() { 
        console.log(this.props)
        return ( 
            <div>
                {this.props.cart.order_items.map(oi=>{
                    return(<div>
                        <Avatar><img src={oi.product.image}/></Avatar>
                        <h4>{oi.product.name}</h4>
                        <TextField value={oi.quantity} onChange={(e)=>{this.updateCart(oi,e.target.value)}} type="Number"/>
                        <Button onClick={(e)=>{this.updateCart(oi,0)}}>Remove</Button>
                        </div>)
                })}
            </div>
         );
    }
}
 
export default Order;