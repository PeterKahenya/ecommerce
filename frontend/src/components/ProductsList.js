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

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/shop/products?format=json')
        .then( (response) =>{
            // handle success
            console.log(response.data);
            this.setState({products_is_fetched:true,products:response.data})
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }

    render() { 

        let products_list=this.state.products.map(product=>{
            return <Product key={product.id} product={product} />
        })

        return ( <div style={{marginTop:150}}>
            <Container>
            <h3 className="p-4 text-secondary">Products List</h3>
            <hr/>
            <div style={{display:'flex',flexWrap:'wrap',marginBottom:100}}>
                {this.state.products_is_fetched?products_list:"Fetching..."}
            </div>
            </Container>
            </div> );
    }
}
 
export default ProductsList;