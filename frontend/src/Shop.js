import React,{Component} from "react"
import Navigation from './components/Navigation'
import Call from './components/Call'
import ProductsList from './components/ProductsList'
// import {getCookie,getOrCreateCookieCart,updateCart as uc} from "./helpers"
import AuthenticateDialog from "./components/auth/Auth"
import CategoriesListView from "./components/CategoriesListView"
import "./Shop.css";
import {Container} from "@material-ui/core"

const axios = require("axios")
const helpers = require("./helpers")


class Shop extends Component{
	constructor(props){
		super(props)
		this.state={
			showAuthDialog:false,
			upateFlag:1,
			products:[],
			cart:{order_items:[]}
		}
		this.authenticate=this.authenticate.bind(this)
		this.updateCart=this.updateCart.bind(this)
	}

	authenticate(){
		if(!helpers.getCookie("auth_token")){
			this.setState({showAuthDialog:true})
		}else{
			console.log("already loggedIn")
			this.setState({showAuthDialog:false})
		}
	}

	async updateCart(data){
        console.log("addToCart in Shop Component")

		let cart=await helpers.updateCart(data);
		this.setState({cart:cart})
	}

	toggleAuthDialog(){
		this.setState({showAuthDialog:!this.state.showAuthDialog})
	}

	async updateProducts(url){
		console.log(url)
		let response=await axios({url:url, method:"GET" })
		if (response.status=200) {
			console.log(Array.isArray(response.data))
			this.setState({
				products:response.data.results
			})
		}
	}

	componentDidMount(){
		if (helpers.getCookie("cart")) {
            console.log()
            this.setState({cart:JSON.parse(helpers.getCookie("cart"))})
        } else {
            this.setState({cart:{order_items:[]}})
        }
	}


	render(){
		var url = new URL(window.location.href);
		var answering = url.searchParams.get("answering");
		var room_id = url.searchParams.get("r");

		if (room_id) {
			console.log(room_id)
			return (<div className="d-flex flex-column">
					<Navigation  cart={this.state.cart} updateProducts={this.updateProducts.bind(this)} updateCart={this.updateCart.bind(this)}  authenticate={this.authenticate} />
					<div style={{marginTop:150}}>
						<Container className="d-flex flex-row align-items-start ">
							<CategoriesListView updateProducts={this.updateProducts.bind(this)} />
							<ProductsList cart={this.state.cart} updateCart={this.updateCart.bind(this)} updateProducts={this.updateProducts.bind(this)} products={this.state.products} />
						</Container>
					</div> 
					<Call room={room_id} authenticate={this.authenticate} utype="callee"/>
					<AuthenticateDialog 
						authSuccess={this.authenticate} 
						toggleAuthDialog={this.toggleAuthDialog.bind(this)} 
						show={this.state.showAuthDialog}
					/>
				</div>)
		}

		return (<div className="d-flex flex-column">
					<Navigation  cart={this.state.cart} updateProducts={this.updateProducts.bind(this)} updateCart={this.updateCart.bind(this)}  authenticate={this.authenticate} />
					<div style={{marginTop:150}}>
						<Container className="d-flex flex-row align-items-start ">
							<CategoriesListView updateProducts={this.updateProducts.bind(this)} />
							<ProductsList cart={this.state.cart} updateCart={this.updateCart.bind(this)} updateProducts={this.updateProducts.bind(this)} products={this.state.products} />
						</Container>
					</div> 
					<Call  authenticate={this.authenticate} utype="callee"/>
					<AuthenticateDialog 
						authSuccess={this.authenticate} 
						toggleAuthDialog={this.toggleAuthDialog.bind(this)} 
						show={this.state.showAuthDialog}
					/>
				</div>)
	}

}

export default Shop
