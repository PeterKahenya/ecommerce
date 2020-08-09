import React, { Component } from 'react';
import { Card, CardActionArea,CardContent, CardMedia, CardActions, Button } from '@material-ui/core';



class Product extends Component {
    constructor(props) {
        super(props);
        this.state = { product:this.props.product }
    }
    render() { 

        return ( <div>
            <Card style={{minWidth: 380,margin:10,padding:5,boxShadow:'none'}}>
                <CardActionArea>
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
                    <Button style={{backgroundColor:'#fcca0a'}}>
                        Add To Cart
                        <span className="material-icons">shopping_cart</span>
                    </Button>
                </CardActions>
            </Card>
            
            </div> );
    }
}
 
export default Product;