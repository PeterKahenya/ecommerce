import React, { Component } from 'react';
import { Container, AppBar, Toolbar, Tabs, Tab, List, ListItem, ListItemAvatar, Avatar, Typography, ListItemText, Divider, Paper } from '@material-ui/core';
const helpers = require("../helpers")
const axios = require('axios').default



class ExpertsList extends Component {
  constructor(props) {
    super(props);
    this.state = {utype:"caller",experts:[]}
    this.startCall=this.startCall.bind(this)
  }

  startCall(receiver) {
    this.props.handleStartCall({utype:this.state.utype,receiver:receiver})
  }

  async componentDidMount(){
    var response = await axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/experts/',
    });
    this.setState({experts:response.data})
    
  }


  render() {
    return (<div><Container maxWidth="sm">
      <Paper elevation={3}>
        <List component="nav">
        {this.state.experts.map(expert=>{
          return(
            <div key={expert.id}>
               <ListItem key={expert.id} button onClick={()=>this.startCall(expert)}>
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
      </Paper>

    </Container></div>);
  }
}

export default ExpertsList