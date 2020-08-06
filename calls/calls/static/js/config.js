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


var iceConfig = {
  iceServers: [{
    urls: [
      'stun:stun.kipya-africa.com:5349',
      'stun:stun1.l.google.com:19302',
      'stun:stun2.l.google.com:19302'
    ]
  },
  {
    urls: "turn:turn.kipya-africa.com:5349",
    username: "kipyadev",
    credential: "Kipya2010$"
  }
  ],
  sdpSemantics: "unified-plan",
  iceCandidatePoolSize: 10,
};
