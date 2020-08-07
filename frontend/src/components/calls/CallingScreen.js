import React, { Component } from 'react';

class CallingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount(){
        const script=document.createElement('script');
        script.src = "./call.js"
        script.async=true
        document.body.appendChild(script)
    }

    render() { 
        return ( <div>
            <input type="hidden" value={this.props.utype} id="utype"/>
            <input type="hidden" value={this.props.room} id="room"/>

            <video autoPlay playsInline id="remoteVideo"></video>
            <video autoPlay playsInline id="localVideo"></video>
        </div> );
    }
}
 
export default CallingScreen;