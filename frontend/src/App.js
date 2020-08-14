import React, { Component } from 'react';
import {BrowserRouter as Router,Switch,Route,Link,useRouteMatch,useParams} from "react-router-dom";
import Shop from './Shop'
import Checkout from './components/Checkout';
import ShippingAddressForm from './components/ShippingAddressForm';
import MPESAPayment from './components/MPESAPayment';

import { getOrCreateCookieCart } from "./helpers";

// import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersFetched:false,
      users:[]
     }
  }
  componentDidMount(){
    getOrCreateCookieCart()
  }

  render() {
    return <Shop/>
  }
  
}

export default App;
