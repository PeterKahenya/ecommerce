import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import "./Navigation.css"
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';



class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            leftDrawerOpen:false,
            rightDrawerOpen:false
        }
    }


    toggleLeft(){
        this.setState({leftDrawerOpen:!this.state.leftDrawerOpen,rightDrawerOpen:false})
    }

    toggleRight(){
        this.setState({rightDrawerOpen:!this.state.rightDrawerOpen,leftDrawerOpen:false})
    }

    render() { 

        return ( <div >
            <AppBar className="appbar" position="static">
            <Toolbar className="toolbar">
                <div className="toolbarTop">
                    <div style={{float:"right"}} onClick={this.toggleLeft.bind(this)} className="material-icons">
                        menu
                    </div>
                    <div>
                        Tengenetsar
                    </div>
                    <div>
                    <span className="material-icons">
                        how_to_reg
                    </span>
                    <span onClick={this.toggleRight.bind(this)} className="material-icons">
                        shopping_cart
                    </span>
                    </div>

                </div>

                <div className="searchbar">

                    <input className="m-1 form-control" placeholder="Search Product..."/>
                        <button className="btn m-1 btn-primary">search</button>
                </div>
            </Toolbar>
            </AppBar>
            
            <div>
            <Drawer className="leftDrawer" onClose={this.toggleLeft.bind(this)} anchor="left" open={this.state.leftDrawerOpen}>
                <div className="leftDrawerContent">Left Menu</div>
            </Drawer>
            <Drawer className="rightDrawer" onClose={this.toggleRight.bind(this)} anchor="right" open={this.state.rightDrawerOpen}>
                <div className="rightDrawerContent">This is Your Cart</div>
                
            </Drawer>
            </div>
            </div> );
    }
}

export default Navigation;