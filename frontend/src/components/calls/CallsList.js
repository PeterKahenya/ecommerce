import React, { Component } from 'react';
// import { getCookie } from '../helpers';
import { Container, AppBar, Toolbar, Tabs, Tab, List, ListItem, ListItemAvatar, Avatar, Typography, ListItemText, Divider, Paper } from '@material-ui/core';
const axios = require('axios').default
const helpers = require("../helpers")



class CallsList extends Component {
  constructor(props) {
    super(props);
    this.state = {utype:"caller",history:[]}
    this.startCall=this.startCall.bind(this)
  }

  startCall(receiver) {
    this.props.handleStartCall({utype:this.state.utype,receiver:receiver})
  }

  async componentDidMount(){
    var history = await axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/calls/history',
      headers:{
        'Authorization': 'Token '+helpers.getCookie("auth_token")
      }
    });
    this.setState({history:history.data})
    
  }

  render() {
    return (<Container maxWidth="sm">
      <List color="default">
        {this.state.history.map(hist=>{
          return(
            <div key={hist.id} >
               <ListItem button onClick={()=>this.startCall(hist.receiver)}>
                <ListItemAvatar>
                  <Avatar>
                    <Typography>
                      P
                    </Typography>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Peter Kahenya" secondary="July 27th" />
              </ListItem>
              <Divider />
            </div>
          )
        })}
      </List>
    </Container>);
  }
}

export default CallsList