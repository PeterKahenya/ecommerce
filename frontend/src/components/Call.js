import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import "./Call.css"
import CallingPage from './CallingPage';
import { Container, AppBar, Toolbar, Tabs, Tab, List, ListItem, ListItemAvatar, Avatar, Typography, ListItemText, Divider, Paper } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import ContactsRounded from "@material-ui/icons/ContactsRounded";
import CallingScreen from './calls/CallingScreen';
import * as firebase from 'firebase'
const axios = require('axios').default

const firebaseConfig = {
	apiKey: "AIzaSyCtPibHbIC2K-fBznDF7-j9X1U1PMjREA0",
	authDomain: "test-rtc-223ba.firebaseapp.com",
	databaseURL: "https://test-rtc-223ba.firebaseio.com",
	projectId: "test-rtc-223ba",
	storageBucket: "test-rtc-223ba.appspot.com",
	messagingSenderId: "985365152795",
	appId: "1:985365152795:web:106c52c8574f6bc43264be",
	measurementId: "G-V0LWLTZ2FD"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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
      url: '127.0.0.1:8000/api/calls/history',
      headers:{
        'Authorization': 'Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b'
      }
    });
    this.setState({history:history.data})
    
  }

  render() {
    return (<Container maxWidth="sm">
      <List color="default">
        {this.state.history.map(hist=>{
          return(
            <div>
               <ListItem button onClick={this.startCall(hist.receiver)}>
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

class ExpertsList extends Component {
  constructor(props) {
    super(props);
    this.state = {utype:"callee",experts:[]}
    this.startCall=this.startCall.bind(this)
  }

  startCall(receiver) {
    this.props.handleStartCall({utype:this.state.utype,receiver:receiver})
  }

  async componentDidMount(){
    var response = await axios({
      method: 'get',
      url: '127.0.0.1:8000/api/experts/',
      headers:{
        'Authorization': 'Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b'
      }
    });
    this.setState({experts:response.data})
    
  }


  render() {
    return (<div><Container maxWidth="sm">
      <Paper elevation={3}>
        <List component="nav">
        {this.state.experts.map(expert=>{
          return(
            <div>
               <ListItem button onClick={this.startCall(expert)}>
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




class Call extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callingPageOpen: true,
      tab: 0,
      callDialogOpen: true,
      utype:"caller",
      roomId:""
    }
    this.handleStartCall=this.handleStartCall.bind(this)
  }
  async handleStartCall(params) {
    console.log("usertype",params.utype)
    console.log("handleStartCall")
		
    var roomRef = await db.collection('rooms').doc();

    var response = await axios({
      method:'GET',
      url:'127.0.0.1:8000/api/calls/start_call',
      headers:{
        'Authorization':'Token sdskajdksajdaskjdhaskjhdkasjhdkash'
      },
      data:{
        receiver:params.receiver
      }
    })

    if (response.status=200 && response.data.status==="send_success") {
    this.setState({ receiver:params.receiver,callDialogOpen: true,utype:params.utype,roomId:roomRef.id})
      
    } else {
      console.log("something went wrong")
    }
    
  }
  handleChange(event, newValue) {
    this.setState({ tab: newValue })
  }
  handleClickOpen() {
    console.log("handleClickOpen")
    this.setState({ callingPageOpen: !this.state.callingPageOpen })
  }

  componentDidMount(){
    if (this.props.room_id) {
      this.setState({roomId:this.props.room_id,callDialogOpen:true,utype:'callee'})
    }
  }
  render() {
    return (<div>

      <Dialog fullScreen open={this.state.callingPageOpen} >

        {this.state.callDialogOpen ? <CallingScreen room={this.state.roomId} utype={this.state.utype} /> :
          <div>
            <AppBar style={{ backgroundColor: '#00b050' }} position="static">
              <Toolbar>
                <Button onClick={this.handleClickOpen.bind(this)}>Back</Button>
              </Toolbar>
              <Tabs centered style={{ display: 'flex', width: '100vw !important', justifyContent: "center" }} value={this.state.tab} onChange={this.handleChange.bind(this)}>
                <Tab icon={<PhoneIcon />} style={{ flexGrow: 1 }} label="Calls" id="simple-tab-1" aria-controls="simple-tabpane-1" />
                <Tab icon={<ContactsRounded />} style={{ flexGrow: 1 }} label="Experts" id="simple-tab-2" aria-controls="simple-tabpane-3" />
              </Tabs>
            </AppBar>
            <div>
              {this.state.tab === 0 ? <CallsList handleStartCall={this.handleStartCall} /> : <ExpertsList handleStartCall={this.handleStartCall} />}
            </div>
          </div>
        }

      </Dialog>
      <BottomNavigation className="bottomNav" >
        <Button variant="outlined" className="m-2 btn mdc-fab app-fab--absolute mdc-fab--extended text-white bg-success" color="primary" onClick={this.handleClickOpen.bind(this)}>
          <span className="mdc-fab__icon material-icons">call</span>
            Call Expert
          </Button>
      </BottomNavigation>
    </div>);
  }
}

export default Call;