import React,{Component} from "react"
import Navigation from './components/Navigation'
import Call from './components/Call'
import ProductsList from './components/ProductsList'


class Shop extends Component{
	constructor(props){
		super(props)
	}



	render(){
		var url = new URL(window.location.href);
		var answering = url.searchParams.get("answering");
		var room_id = url.searchParams.get("room_id");
		
		if (answering==="yes" && room_id) {
			return (<div>

				<Navigation/>
				<ProductsList/>
				<Call room_id={room_id}/>
	
	
	
				</div>)	
		} else {
			
		}
		return (<div>

			<Navigation/>
			<ProductsList/>
			<Call/>



			</div>)
	}
}

export default Shop
