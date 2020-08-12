import React, { Component } from 'react';
import { Dialog,Button } from "@material-ui/core";

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    addToCart(){
        this.props.addToCart()
    }
    render() { 
        return ( <Dialog open={this.props.open}>
          
            <div className="d-flex">
                <img src={"http://127.0.0.1:8000/"+this.props.product.image}/>
                <h1>{this.props.product.name}</h1>
            </div>
            <p>
                {this.props.product.description}
            </p>
            <Button onClick={this.addToCart.bind(this)} style={{backgroundColor:'#fcca0a'}}>
                    Add To Cart
                <span className="material-icons">shopping_cart</span>
            </Button>
        </Dialog> );
    }
}
 
export default ProductDetails;