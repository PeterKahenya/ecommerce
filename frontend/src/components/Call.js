import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import "./Call.css"
import { Container, AppBar, Toolbar, Tabs, Tab, List, ListItem, ListItemAvatar, Avatar, Typography, ListItemText, Divider, Paper } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import ContactsRounded from "@material-ui/icons/ContactsRounded";
import CallingScreen from './calls/CallingScreen';
import ExpertsList from './calls/ExpertsList';
import CallsList from './calls/CallsList';


import * as firebase from 'firebase'
// import { getCookie } from './helpers';
const helpers = require("./helpers")

const axios = require('axios').default

var firebaseConfig = {
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



class Call extends Component {

  constructor(props) {
    super(props);
    this.state = {
      callingPageOpen: this.props.room?true:false,
      tab: 0,
      callDialogOpen: this.props.room?true:false,
      utype:this.props.utype,
      roomId:this.props.room
    }
  }

  async handleStartCall(params) {
    console.log("usertype",params.utype)
    console.log("handleStartCall")
		
    var roomRef = await db.collection('rooms').add({});
    console.log("room created ",roomRef.id)

    var response = await axios({
      method:'POST',
      url:'http://127.0.0.1:8000/api/calls/start_call',
      headers:{
        'Authorization':'Token '+helpers.getCookie("auth_token")
      },
      data:{
        receiver:params.receiver,
        room:roomRef.id,
        utype:params.utype
      }
    })

    if (response.status===200 && response.data.status==="success") {
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
    if (this.props.room) {
      this.setState({roomId:this.props.room,callDialogOpen:true,utype:'callee'})
    }
  }
  render() {
    return (<div>

      <Dialog fullScreen open={this.state.callingPageOpen} >

        {this.state.callDialogOpen ? <CallingScreen room={this.state.roomId} utype={this.state.utype} /> :
          <div>
            <AppBar style={{ backgroundColor: '#00b050' }} position="static">
              <Toolbar>
                <button className="btn text-white material-icons" onClick={this.handleClickOpen.bind(this)}>arrow_back</button>
              </Toolbar>
              <Tabs centered  style={{ display: 'flex', width: '100vw !important', justifyContent: "center" }} value={this.state.tab} onChange={this.handleChange.bind(this)}>
                <Tab icon={<PhoneIcon />} style={{ flexGrow: 1 }} label="Calls" id="simple-tab-1" aria-controls="simple-tabpane-1" />
                <Tab icon={<ContactsRounded />} style={{ flexGrow: 1 }} label="Experts" id="simple-tab-2" aria-controls="simple-tabpane-3" />
              </Tabs>
            </AppBar>
            <div>
              {this.state.tab === 0 ? <CallsList handleStartCall={this.handleStartCall.bind(this)} /> : <ExpertsList handleStartCall={this.handleStartCall.bind(this)} />}
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