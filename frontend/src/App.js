import React, { Component } from 'react';
const axios = require('axios');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      usersFetched:false,
      users:[]
     }
  }
  componentDidMount(){
    // Make a request for a user with a given ID
      axios.get('http://127.0.0.1:8000/users')
      .then(response=> {
        // handle success
        console.log(response);
        if (response.status===200) {
          this.setState({users:response,usersFetched:true})

          return response.data
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  }

  render() { 
    
    return ( <div>

      {this.state.usersFetched?<div>users ready</div>:
      <div>Fetching...</div>
      
      }
      
      </div> );
  }
}
 
export default App;