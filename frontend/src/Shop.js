import React,{Component} from "react"
import Navigation from './components/Navigation'
import Call from './components/Call'
import ProductsList from './components/ProductsList'
import {getCookie} from "./helpers"
import AuthenticateDialog from "./components/auth/Auth"

class Shop extends Component{
	constructor(props){
		super(props)
		this.state={
			showAuthDialog:false,
			upateFlag:1
		}
		this.authenticate=this.authenticate.bind(this)
		this.update=this.update.bind(this)

	}

	authenticate(){
		if(!getCookie("auth_token")){
			this.setState({showAuthDialog:true})
		}else{
			console.log("already loggedIn")
			this.setState({showAuthDialog:false})
		}
	}

	update(){
		this.setState({upateFlag:1})
	}


	render(){
		var url = new URL(window.location.href);
		var answering = url.searchParams.get("answering");
		var room_id = url.searchParams.get("room_id");
		if (answering==="yes" && room_id) {
			return (<div><Navigation/><ProductsList/><Call room_id={room_id}/></div>)	
		}

		return (<div><Navigation authenticate={this.authenticate}/><ProductsList/><Call /><AuthenticateDialog authSuccess={this.authenticate} show={this.state.showAuthDialog}/></div>)
	}
}

export default Shop
