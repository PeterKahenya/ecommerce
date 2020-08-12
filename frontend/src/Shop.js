import React,{Component} from "react"
import Navigation from './components/Navigation'
import Call from './components/Call'
import ProductsList from './components/ProductsList'
import {getCookie,getOrCreateCookieCart,updateCart as uc} from "./helpers"
import AuthenticateDialog from "./components/auth/Auth"
import CategoriesListView from "./components/CategoriesListView"
import "./Shop.css";
const axios = require("axios")

class Shop extends Component{
	constructor(props){
		super(props)
		this.state={
			showAuthDialog:false,
			upateFlag:1,
			products:[],
			cart:{}
		}
		this.authenticate=this.authenticate.bind(this)
		this.updateCart=this.updateCart.bind(this)
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

	async updateProducts(url){
		let response=await axios({url:url, method:"GET" })
		if (response.status=200) {
			this.setState({
				products:response.data
			})
		}
	}

	componentDidMount(){
		if (getCookie("cart")) {
            console.log()
            this.setState({cart:JSON.parse(getCookie("cart"))})
        } else {
            this.setState({cart:{order_items:[]}})
        }
	}


	render(){
		var url = new URL(window.location.href);
		var answering = url.searchParams.get("answering");
		var room_id = url.searchParams.get("room_id");
		if (answering==="yes" && room_id) {
			return (<div><Navigation cart={this.state.cart} authenticate={this.authenticate}/><ProductsList/><Call room_id={room_id}/></div>)	
		}

		return (<div>
					<Navigation cart={this.state.cart} updateProducts={this.updateProducts.bind(this)}  authenticate={this.authenticate} />
					<div className="categoriesAndList d-flex flex-row">
						<CategoriesListView updateProducts={this.updateProducts.bind(this)}  className="categoriesList"/>
						<ProductsList products={this.state.products} />
					</div>
					<Call authenticate={this.authenticate}/>
					<AuthenticateDialog authSuccess={this.authenticate} show={this.state.showAuthDialog}/>
				</div>)
	}

}

export default Shop
