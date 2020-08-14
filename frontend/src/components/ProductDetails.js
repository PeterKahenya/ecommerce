import React, { Component } from 'react';
import { Dialog,Button } from "@material-ui/core";

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    closeDialog(){
        this.props.showProductDetails()
    }
    addToCart(){
        this.props.addToCart()
    }
    render() { 
        let order_item_index=this.props.cart.order_items.findIndex(order_item=>{return order_item.product.id===this.props.product.id})

        return ( <Dialog fullScreen onClose={this.closeDialog.bind(this)} open={this.props.open}>
            <div className="row">
                <div className="d-flex">
                    <img src={"http://127.0.0.1:8000"+this.props.product.image}/>
                    <h1>{this.props.product.name}</h1>
                </div>
                <p>
                    {this.props.product.description}
                </p>
                {order_item_index===-1?<Button onClick={this.addToCart.bind(this)} style={{backgroundColor:'#fcca0a'}}>
                            Add To Cart
                            <span className="material-icons">shopping_cart</span>
                        </Button>:<Button style={{backgroundColor:'#00b050',color:'white'}}>
                            In Cart
                            <span className="material-icons">check</span>
                        </Button>}
            </div>
        </Dialog> );
    }
}
 
export default ProductDetails;