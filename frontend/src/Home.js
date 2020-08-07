import React, { Component } from 'react';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        const script=document.createElement("script")
        script.src="./smoke.js"
        script.async = true
        document.body.appendChild(script)
    }
    render() { 
        return ( <div>
            <video ref={this.remoteVideo} autoPlay playsInline id="remoteVideo"></video>
            <video ref={this.localVideo} autoPlay playsInline id="localVideo"></video>
        </div> );
    }
}
 
export default Home;