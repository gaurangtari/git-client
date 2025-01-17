import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import axios from "axios";
import * as process from "process";
window.global = window;
window.process = process;
window.Buffer = [];

const SocketContext = createContext();

const SERVER = "http://localhost:9090";

const socket = io(SERVER);

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [adminId, setAdminId] = useState({});

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const fetchRoomId = async () => {
    try {
      const response = await axios.get(`${SERVER}/get-admin-id`);
      setAdminId(response.data[1].data.id);
    } catch (error) {
      console.error("error fetching stream data", error);
    }
  };

  useEffect(() => {
    const dummyStream = new MediaStream();
    const videoTrack = document
      .createElement("canvas")
      .captureStream()
      .getVideoTracks()[0];
    dummyStream.addTrack(videoTrack);

    setStream(dummyStream);

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("joystick-data", (data) => {
      console.log(data);
    });

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
    fetchRoomId();
    console.log("admin id:", adminId, " me:", me);
    socket.emit("join-room", adminId, me);
  }, [adminId, me]);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      console.log("stream from answercall", currentStream);
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    setCallAccepted(false);

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
      console.log("stream from call user", currentStream);
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        adminId,
        callUser,
        leaveCall,
        answerCall,
        SERVER,
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
