import React, { Component } from 'react';
import Shop from './Shop'
const helpers = require("./helpers")

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersFetched:false,
      users:[]
     }
  }
  componentDidMount(){
    helpers.getOrCreateCookieCart()
  }

  render() {
    return <Shop/>
  }
  
}

export default App;
