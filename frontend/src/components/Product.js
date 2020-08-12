import React, { Component } from 'react';
import { Card, CardActionArea,CardContent, CardMedia, CardActions, Button } from '@material-ui/core';
import ProductDetails from './ProductDetails';
import { updateCart } from "../helpers";


class Product extends Component {
    constructor(props) {
        super(props);
        this.state = { product:this.props.product,showDetails:false }
    }


    showProductDetails(){
        this.setState({showDetails:true})
    }

    addToCart(){
        this.props.addToCart({
            product:this.props.product,
            quantity:1
        })
    }

    render() { 

        return ( <div>
            <Card style={{minWidth: 380,margin:10,padding:5,boxShadow:'none'}}>
                <CardActionArea onClick={this.showProductDetails.bind(this)}>
                    <CardMedia
                    style={{height:140}}
                    image={"http://127.0.0.1:8000"+this.state.product.image}
                    >

                    </CardMedia>
                <CardContent>
                    {this.state.product.name}
                </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={this.addToCart.bind(this)} style={{backgroundColor:'#fcca0a'}}>
                        Add To Cart
                        <span className="material-icons">shopping_cart</span>
                    </Button>
                </CardActions>
            </Card>
            <ProductDetails addToCart={this.addToCart.bind(this)} product={this.state.product} open={this.state.showDetails}/>
            
            </div> );
    }
}
 
export default Product;