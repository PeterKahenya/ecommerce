import React, { Component } from 'react';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = { products:[{
            product_id:""
        }] }
    }
    render() { 
        return ( 
            <div>Order</div>
         );
    }
}
 
export default Order;