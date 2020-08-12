import React, { Component } from 'react';
import { List,ListItem } from '@material-ui/core';
const axios = require('axios')

class CategoriesListView extends Component {
    constructor(props) {
        super(props);
        this.state = { categories_list:[] }

        this.updateProducts = this.updateProducts.bind(this)
    }

    async componentDidMount(){
        let response=await axios({
            url:"http://127.0.0.1:8000/api/shop/categories",
            method:"POST"
        })
        this.setState({categories_list:response.data})
    }

    updateProducts(id){
        this.props.updateProducts("http://127.0.0.1:8000/api/shop/categories/"+id+"/products")
    }

    render() { 
        return ( <List>
            {this.state.categories_list.map(category=>{
                return <ListItem onClick={()=>this.updateProducts(category.id)}>{category.name}</ListItem>
            })}
        </List> );
    }
}
 
export default CategoriesListView;