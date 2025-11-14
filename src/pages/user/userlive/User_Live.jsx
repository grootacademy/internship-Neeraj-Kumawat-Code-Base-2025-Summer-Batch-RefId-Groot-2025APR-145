import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaExpand, FaPhoneSlash } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const socket = io("http://localhost:5000");

function UserWatchLive() {
  const videoRef = useRef(null);
  const peerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [user, setuser] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/profile", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then((res) => {
      // console.log(res.data.data);
      setuser(res.data.data);
    }).catch((error) => console.log(error))
  }, []);

  
useEffect(() => {
  socket.emit("role", "user");
  socket.emit("new-viewer");

  const peer = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" }
    ]
  });

  peerRef.current = peer;

  peer.ontrack = (event) => {
    if (videoRef.current) {
      videoRef.current.srcObject = event.streams[0];
    }
  };

  peer.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", {
        candidate: event.candidate,
        from: socket.id
      });
    }
  };

  socket.on("offer", async ({ offer }) => {
    try {
      await peer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);

      socket.emit("answer", {
        answer,
        userId: socket.id
      });
    } catch (error) {
      console.error("Offer error:", error);
    }
  });

  socket.on("ice-candidate", async ({ candidate }) => {
    try {
      if (candidate) {
        await peer.addIceCandidate(new RTCIceCandidate(candidate));
      }
    } catch (err) {
      console.error("ICE error:", err);
    }
  });

  return () => {
    peer.close();
    socket.off("offer");
    socket.off("ice-candidate");
  };
}, []);



  const toggleFullscreen = () => {
    if (!isFullscreen) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) videoRef.current.muted = !isMuted;
  };

  const toggleVideo = () => {
    setVideoOn(!videoOn);
    // You can handle actual video stream toggle logic here
  };

  const endClass = () => {
    socket.disconnect();
    window.location.href = "/"; // redirect after leaving class
  };

  // socket.emit("join-live", user);


  // socket.on("joined-confirmation",({message})=>{
  //     toast.success(message)
  //   })


  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen p-4">
      {/* Header */}
      <ToastContainer/>
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">📺 Live Class</h2>
      </div>

      {/* Video Container */}
      <div className="relative w-full max-w-[900px] flex justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isMuted}
          controls={false}
          className="rounded-lg shadow-lg w-full h-[500px] object-cover bg-black"
        />

        {/* Floating Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 bg-black bg-opacity-50 rounded-xl p-3">
          {/* Mute/Unmute */}
          <button
            onClick={toggleMute}
            className="text-white text-2xl p-2 rounded-full hover:bg-gray-700"
          >
            {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>

          {/* Start/Stop Video */}
          <button
            onClick={toggleVideo}
            className="text-white text-2xl p-2 rounded-full hover:bg-gray-700"
          >
            {videoOn ? <FaVideo /> : <FaVideoSlash />}
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="text-white text-2xl p-2 rounded-full hover:bg-gray-700"
          >
            <FaExpand />
          </button>

          {/* End Class */}
          <button
            onClick={endClass}
            className="text-white text-2xl p-2 rounded-full hover:bg-red-700 bg-red-600"
          >
            <FaPhoneSlash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserWatchLive;
