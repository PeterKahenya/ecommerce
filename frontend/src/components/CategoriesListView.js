import React, { Component } from 'react';
import { List,ListItem,Paper,Divider } from '@material-ui/core';
import "./CategoriesListView.css"

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
            method:"GET"
        })
        console.log(response)
        this.setState({categories_list:response.data})
    }

    updateProducts(id){
        this.props.updateProducts("http://127.0.0.1:8000/api/shop/categories/"+id+"/products")
    }

    render() { 
        return ( <Paper className="categoriesList bg-success">
                <h3 className="text-center text-warning">Categories</h3>
            {this.state.categories_list.map(category=>{
                return <div key={category.id}><ListItem button style={{width:200,cursor:'pointer',padding:20}} key={category.id} onClick={()=>this.updateProducts(category.id)}>{category.name}</ListItem><Divider/></div>
            })}
        </Paper> );
    }
}
 
export default CategoriesListView;