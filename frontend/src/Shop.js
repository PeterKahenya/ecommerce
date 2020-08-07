import React,{Component} from "react"
import Navigation from './components/Navigation'
import Call from './components/Call'

class Shop extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return (<div>

			<Navigation/>
			Products List
			<Call/>


			</div>)
	}
}

export default Shop
