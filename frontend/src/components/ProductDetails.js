import React, { Component } from 'react';
import { Dialog } from "@material-ui/core";

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <Dialog open={this.props.open}>
            Product Details
        </Dialog> );
    }
}
 
export default ProductDetails;