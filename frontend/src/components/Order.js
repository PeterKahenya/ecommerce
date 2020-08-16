import React, { Component } from 'react';
import { Avatar, TextField, Button,Paper } from '@material-ui/core';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = { }
        this.updateCart=this.updateCart.bind(this)
    }

    updateCart(oi,quantity){
        console.log("updateCart in Order",oi,quantity)
        this.props.updateCart({
            product:oi.product,
            quantity:quantity
        })
    }

    render() { 
        // console.log("Order")

        return ( 
            <div>
                {this.props.cart.order_items.map(oi=>{
                    let img_path="http://127.0.0.1:8000"+oi.product.image
                    return(<Paper className="d-flex bg-light p-3 m-2 align-items-center justify-content-between" key={oi.product.id}>
                        <Avatar><img src={img_path} width={50} height={50}/></Avatar>
                        <h5>{oi.product.name}</h5>
                        <TextField style={{width:30}} value={oi.quantity} onChange={(e)=>{this.updateCart(oi,e.target.value)}} type="Number"/>
                        <button className="btn btn-danger" onClick={(e)=>{this.updateCart(oi,0)}}>Remove</button>
                        </Paper>)
                })}
            </div>
         );
    }
}
 
export default Order;