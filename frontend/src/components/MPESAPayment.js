import React, { Component } from 'react';
import { TextField } from '@material-ui/core';

class MPESAPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>
            <TextField placeholder="MPESA Code"/>
        </div> );
    }
}
 
export default MPESAPayment;