import React, { Component } from 'react';
import { Card, CardActionArea,CardContent, CardMedia, CardActions, Button } from '@material-ui/core';
import ProductDetails from './ProductDetails';
// import { updateCart } from "../helpers";
const helpers = require("../helpers")


class Product extends Component {
    constructor(props) {
        super(props);
        this.state = { product:this.props.product,showDetails:false }
    }


    showProductDetails(){
        this.setState({showDetails:!this.state.showDetails})
    }

    addToCart(){
        console.log("addToCart in Product Component")
        this.props.addToCart({
            product:{
                id:this.props.product.id,
                name:this.props.product.name,
                image:this.props.product.image,
                price:this.props.product.price
            },
            quantity:1
        })
    }

    render() { 
        // console.log("product props",this.props.cart)

        let order_item_index=this.props.cart.order_items.findIndex(order_item=>{return order_item.product.id===this.state.product.id})

        // console.log("product index in cart",order_item_index)


        return ( <div>
            <Card style={{minWidth: 300,margin:5,padding:5,boxShadow:'none'}}>
                <CardActionArea onClick={this.showProductDetails.bind(this)}>
                    <CardMedia
                    style={{height:140}}
                    image={"http://127.0.0.1:8000"+this.state.product.image}
                    >

                    </CardMedia>
                <CardContent>
                    {this.state.product.name}
                </CardContent>
                <CardContent>
                    {this.state.product.price}
                </CardContent>
                </CardActionArea>
                <CardActions>
                    {order_item_index===-1?<Button onClick={this.addToCart.bind(this)} style={{backgroundColor:'#fcca0a'}}>
                        Add To Cart
                        <span className="material-icons">shopping_cart</span>
                    </Button>:<Button style={{backgroundColor:'#00b050',color:'white'}}>
                        In Cart
                        <span className="material-icons">check_circle</span>
                    </Button>}
                </CardActions>
            </Card>
            <ProductDetails cart={this.props.cart} showProductDetails={this.showProductDetails.bind(this)} addToCart={this.addToCart.bind(this)} product={this.state.product} open={this.state.showDetails}/>
            
            </div> );
    }
}
 
export default Product;