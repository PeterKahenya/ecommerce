import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Product from './Product';
const axios = require('axios');

class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            products:[],
            products_is_fetched:false
         }
    }

    async componentDidMount(){
        await this.props.updateProducts("http://127.0.0.1:8000/api/shop/products")
        this.setState({products_is_fetched:true})    
    }


    addToCart(data){
        this.props.updateCart(data)
    }

    render() {


        let products_list=this.props.products.map(product=>{
            return <Product addToCart={this.addToCart.bind(this)} key={product.id} product={product} />
        })

        return ( <div>
            <Container className="d-flex flex-column ">
                <h3 className="p-4 text-secondary">Products List</h3>
                <div>
                <hr/>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap',marginBottom:100}}>
                    {this.state.products_is_fetched?products_list:"Fetching..."}
                </div>
            </Container>
            </div> );
    }
}
 
export default ProductsList;