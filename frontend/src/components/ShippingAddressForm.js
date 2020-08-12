import React, { Component } from 'react';
import { TextField, Button } from "@material-ui/core"
import { getCookie } from '../helpers';
const axios = require('axios');

class ShippingAddressForm extends Component {
    constructor(props) {
        super(props);
        this.state = { previos_addresses: [], custom: [], county: "", city: "", longitude: "", latitude: "", fullnames: "" }
    }

    async componentWillMount() {
        let response = await axios({
            url: "http://127.0.0.1:8000/api/shop/addresses",
            method: "GET",
            headers: {
                Authorization: 'Token ' + getCookie("auth_token")
            }
        })

        if (response.status = 200) {
            this.setState({ previos_addresses: response.data })
        }
    }

    changeAddress(e) {
        this.props.setAddress(e.target.value)
    }

    async addLocation() {
        let response = await axios({
            url: "http://127.0.0.1:8000/api/shop/addresses",
            method: "POST",
            headers: {
                Authorization: 'Token ' + getCookie("auth_token")
            },
            data:this.state
        })

        if (response.status = 201) {
            this.props.setAddress(response.data)
        }
    }



    render() {
        return (<div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Choose Previous Addresses</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.props.addr}
                    onChange={this.changeAddress.bind(this)}
                >
                    {this.state.previos_addresses.map(addr => {
                        return (<MenuItem value={addr}>
                            {addr.full_name + addr.city + addr.county}
                        </MenuItem>)
                    })}
                </Select>
            </FormControl>
            <div>
                <label>New Address</label>
                <TextField placeholder="City" label="City" />
                <TextField placeholder="County" label="County" />
                <TextField placeholder="Your Full Names" label="Your Full Names" />
                <TextField placeholder="Phone Number" label="Enter Your Phone Number" />

                <TextField placeholder="Search Location" label="Search Location" />
                <label>Your Location</label>
                <Button onClick={this.addLocation.bind(this)}> Add Location</Button>
            </div>


        </div>);
    }
}

export default ShippingAddressForm;
