import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import { makeStyles } from '@material-ui/core/styles';
import "./Navigation.css"
// import SearchIcon from '@material-ui/icons/Search';
// import InputBase from '@material-ui/core/InputBase';
// import Badge from '@material-ui/core/Badge';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import MoreIcon from '@material-ui/icons/MoreVert';
import brand from"./brand.png"
// import { getCookie } from '../helpers';
import Cart from './Cart';
import { Menu } from '@material-ui/core';
import UserProfile from './UserProfile';
import CategoriesListView from './CategoriesListView'


class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            leftDrawerOpen:false,
            rightDrawerOpen:false,
            searchTerm:"",
            showUserProfile:false
        }
    }

    showProfile(){
        if(this.props.authenticate()){

        }
    }
    toggleLeft(){
        this.setState({leftDrawerOpen:!this.state.leftDrawerOpen,rightDrawerOpen:false})
    }

    toggleRight(){
        this.setState({rightDrawerOpen:!this.state.rightDrawerOpen,leftDrawerOpen:false})
    }

    componentDidMount(){
        
    }

    async updateProducts(url){
        await this.props.updateProducts(url)
    }

    async search(){
        await this.props.updateProducts("http://127.0.0.1:8000/api/shop/products/search?search="+this.state.searchTerm)
    }

    async updateCart(params){
        await this.props.updateCart(params)
    }

    render() { 
        console.log(this.props)
        let cart_items_count=this.props.cart.order_items.length
        return (<div>
                    <AppBar className="appbar" elevation={1} position="fixed">
                        <Toolbar className="toolbar">
                            <div className="toolbarTop">
                                <div  style={{fontSize:50,color:'#00b050'}} onClick={this.toggleLeft.bind(this)} className="material-icons menuButton">
                                    menu
                                </div>
                                <div className="brand">
                                    <img className="brandImage" src={brand} />
                                </div>
                                <div className="rightButtons d-flex align-items-center justify-content-between">
                                    <span style={{fontSize:70,color:'#00b050'}} className="material-icons m-3" onClick={this.showProfile.bind(this)}>
                                        how_to_reg
                                    </span>
                                    <Menu open={this.state.showUserProfile}>
                                        <UserProfile/>
                                    </Menu>
                                    <Button className="p-2 bg-success" onClick={this.toggleRight.bind(this)}>
                                    <span style={{fontSize:70,color:'#fcca0a'}}  className="material-icons">
                                        shopping_cart
                                    </span>
                                    <span className="text-white rounded" >{cart_items_count}</span>

                                    </Button>

                                </div>
                            </div>
                            <div className="searchbar">
                                <input value={this.state.searchTerm} onChange={e => this.setState({ searchTerm: e.target.value })} className="m-1 form-control" placeholder="Search Product..."/>
                                <button className="btn m-1 btn-primary" onClick={this.search.bind(this)} >search</button>
                            </div>
                        </Toolbar>
                    </AppBar>
            
                    <div>
                        <Drawer className="leftDrawer" onClose={this.toggleLeft.bind(this)} anchor="left" open={this.state.leftDrawerOpen}>
                            <UserProfile/>
                            <hr/>
                            <CategoriesListView updateProducts={this.updateProducts.bind(this)}/>
                            <div>Help</div>
                            <div>Terms</div>
                        </Drawer>
                        <Drawer className="rightDrawer" onClose={this.toggleRight.bind(this)} anchor="right" open={this.state.rightDrawerOpen}>
                            <div className="rightDrawerContent">
                                <Cart authenticate={this.props.authenticate} updateCart={this.updateCart.bind(this)} cart={this.props.cart}/>
                            </div>
                        </Drawer>
                    </div>
                </div>);
    }
}

export default Navigation;