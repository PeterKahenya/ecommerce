import React, { Component } from 'react';
import {TextField} from "@material-ui/core"
const axios = require('axios');

class ShippingAddressForm extends Component {
    constructor(props) {
        super(props);
        this.state = { previos_addresses:[],custom:[] }
    }

    async componentWillMount(){

    }

    render() {
        return ( <div>
            List of Previous Addresses
            List of Custom Locations
            Google Map Search Bar
            Locations Form



          </div> );
    }
}

export default ShippingAddressForm;
