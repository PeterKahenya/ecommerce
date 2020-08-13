import React,{Component} from "react"
import Shop from './Shop';
import Navigation from './components/Navigation'
import {getCookie,getOrCreateCookieCart,updateCart as uc} from "./helpers"
import {Container} from "@material-ui/core"
import CategoriesListView from "./components/CategoriesListView"
import ProductsList from './components/ProductsList'

const axios = require("axios")


class New extends Component{
	constructor(props){
		super(props)
		this.state={
			cart:{order_items:[]},
			showAuthDialog:false,
			upateFlag:1,
			products:[]
		}
	}

	authenticate(){
		if(!getCookie("auth_token")){
			this.setState({showAuthDialog:true})
		}else{
			console.log("already loggedIn")
			return true
		}
	}

	async updateCart(data){
		let cart=await uc(data);
		this.setState({cart:cart})
	}

	toggleAuthDialog(){
		this.setState({showAuthDialog:!this.state.showAuthDialog})
	}

	async updateProducts(url){
		console.log(url)
		let response=await axios({url:url, method:"GET" })
		if (response.status=200) {
			console.log(response)
			this.setState({
				products:response.data.results
			})
		}
	}


	async componentDidMount(){
		if (getCookie("cart")) {
            this.setState({cart:JSON.parse(getCookie("cart"))})
        } else {
            this.setState({cart:{order_items:[]}})
        }
	}

	render(){
		return (<div className="d-flex flex-column">
					<Navigation  cart={this.state.cart} updateProducts={this.updateProducts.bind(this)} updateCart={this.updateCart.bind(this)}  authenticate={this.authenticate} />
					<div style={{marginTop:150}}>
						<Container className="d-flex flex-row align-items-start ">
							<CategoriesListView updateProducts={this.updateProducts.bind(this)} />
							<ProductsList 
								updateCart={this.updateCart.bind(this)} 
								updateProducts={this.updateProducts.bind(this)} 
								products={this.state.products} />
						</Container>
					</div> 
				</div>)
	}
}

export default New
