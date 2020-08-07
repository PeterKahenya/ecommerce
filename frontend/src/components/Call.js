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

class CallsList extends Component {
  constructor(props) {
    super(props);
    this.state = {utype:"caller"}
    this.startCall=this.startCall.bind(this)
  }

  startCall(params) {
    this.props.handleStartCall(this.state.utype)
  }

  render() {
    return (<Container maxWidth="sm">
      <List color="default">
        <ListItem button onClick={this.startCall}>
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
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <Typography>
                P
              </Typography>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Peter Kahenya" secondary="July 27th" />
        </ListItem>
      </List>
    </Container>);
  }
}

class ExpertsList extends Component {
  constructor(props) {
    super(props);
    this.state = {utype:"callee"}
    this.startCall=this.startCall.bind(this)
  }

  startCall(params) {
    this.props.handleStartCall(this.state.utype)
  }



  render() {
    return (<div><Container maxWidth="sm">
      <Paper elevation={3}>
        <List component="nav">
          <ListItem button onClick={this.startCall}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: "#00b050" }}>
                <Typography>
                  P
            </Typography>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Peter Kahenya" secondary="July 27th" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: "#00b050" }}>
                <Typography>
                  P
            </Typography>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Peter Kahenya" secondary="July 27th" />
          </ListItem>
        </List>
      </Paper>

    </Container></div>);
  }
}




class Call extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callingPageOpen: false,
      tab: 0,
      callDialogOpen: false,
      utype:""
    }
    this.handleStartCall=this.handleStartCall.bind(this)
  }
  handleStartCall(utype) {
    console.log("usertype",utype)
    console.log("handleStartCall")

    this.setState({ callDialogOpen: true,utype:utype })
  }
  handleChange(event, newValue) {
    this.setState({ tab: newValue })
  }
  handleClickOpen() {
    console.log("handleClickOpen")
    this.setState({ callingPageOpen: !this.state.callingPageOpen })
  }
  render() {
    console.log(this.state)
    return (<div>

      <Dialog fullScreen open={this.state.callingPageOpen} >

        {this.state.callDialogOpen ? <CallingScreen room="mggW8krNxmM0UyYLVOLj" utype={this.state.utype} /> :
          <div>
            <AppBar style={{ backgroundColor: '#00b050' }} position="static">
              <Toolbar>

              </Toolbar>
              <Tabs centered style={{ display: 'flex', width: '100vw !important', justifyContent: "center" }} value={this.state.tab} onChange={this.handleChange.bind(this)}>
                <Tab icon={<PhoneIcon />} style={{ flexGrow: 1 }} label="Calls" id="simple-tab-1" aria-controls="simple-tabpane-1" />
                <Tab icon={<ContactsRounded />} style={{ flexGrow: 1 }} label="Experts" id="simple-tab-2" aria-controls="simple-tabpane-3" />
              </Tabs>
            </AppBar>
            <div>
              {this.state.tab === 0 ? <CallsList handleStartCall={this.handleStartCall} /> : <ExpertsList handleStartCall={this.handleStartCall} />}
            </div></div>
        }

      </Dialog>
      <BottomNavigation className="bottomNav" >
        <Button variant="outlined" className="btn mdc-fab app-fab--absolute mdc-fab--extended text-white bg-success" color="primary" onClick={this.handleClickOpen.bind(this)}>
          <span className="mdc-fab__icon material-icons">call</span>
            Call Expert
          </Button>
      </BottomNavigation>
    </div>);
  }
}

export default Call;