import React, { Component } from 'react';
import "./CallingScreen.css"
const axios = require('axios');


class CallingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        const script = document.createElement('script');
        script.src = "./call.js"
        script.async = true
        document.body.appendChild(script)
        if (this.props.utype==="caller") {
            
        }
    }

    render() {
        return (<div className="mainCallContainer">
            <input type="hidden" value={this.props.utype} id="utype" />
            <input type="hidden" value={this.props.room} id="room" />
            {/* <div className="awaitingCallContainer">
                HELLO THERE
            </div> */}
            <div className="callContainer">
                <div className="videoPanel">
                    <div class="videoControls">

                        <div className="topControls">
                            <button target="_blank" style={{ float: 'left' }} className="material-icons btn btn-outline-light control-buttons">
                                shopping_cart
                            </button>
                            <button id="flip_camera_btn" style={{ float: 'right' }} className="material-icons btn btn-outline-light control-buttons">
                                flip_camera_android
					        </button>
                        </div>

                        <div className="bottomControls">
                            <button id="mic_off_btn" class="material-icons btn btn-outline-light control-buttons">
                                mic
					        </button>
                            <button id="videocam_off_btn" class="material-icons btn btn-outline-light control-buttons">
                                videocam
					        </button>
                            <button id="hangup_btn" class="material-icons bg-danger btn btn-outline-danger text-white control-buttons">
                                call
					        </button>
                            <video style={{ display: 'block' }} autoPlay playsInline id="localVideo"></video>
                        </div>

                    </div>

                    <div class="mainVideo">
                        <video style={{ display: 'block' }} autoPlay playsInline id="remoteVideo"></video>
                    </div>
                </div>
                <div className="chatPanel">
                    <div className="chatProfile">

                    </div>
                    <div className="chatLogs" id="chat_logs">

                    </div>
                    <div className="chatBox">
                        {/* <button class="material-icons bg-warning" data-toggle="modal" data-target="#exampleModal" id="send_chat_btn">
                                add
				            </button> */}
                        <input id="chat_text_area" class="form-controls shadow-sm" placeholder="Enter message..." />
                        <button class="material-icons" id="send_chat_btn">
                            send
				            </button>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default CallingScreen;