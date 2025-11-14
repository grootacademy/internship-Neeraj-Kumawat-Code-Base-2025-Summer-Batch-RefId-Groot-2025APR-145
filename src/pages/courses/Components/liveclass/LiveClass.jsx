// import React, { useState, useRef, useEffect } from "react";
// import Webcam from "react-webcam";
// import { TiArrowBack } from "react-icons/ti";
// import { SlEarphonesAlt } from "react-icons/sl";
// import axios from "axios";
// import { FaMicrophone } from "react-icons/fa6";
// import { FaMicrophoneSlash } from "react-icons/fa6";
// import { FaVideo } from "react-icons/fa";
// import { FaVideoSlash } from "react-icons/fa";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { toast, ToastContainer } from "react-toastify";

// const LiveClass = ({ onClick ,Liveclass_Id}) => {
//   const [liveClassTitle, setLiveClassTitle] = useState("");
//   const [isLive, setIsLive] = useState(false);
//   const [recording, setRecording] = useState(false);
//   const [muted, setMuted] = useState(false);
//   const [videoOn, setVideoOn] = useState(true);

//   const [mics, setMics] = useState([]);
//   const [cameras, setCameras] = useState([]);
//   const [selectedMic, setSelectedMic] = useState("default");
//   const [selectedCamera, setSelectedCamera] = useState("default");

//   const webcamRef = useRef(null);
//   const mediaRecorderRef = useRef(null);

//   const filterDevices = (devices, kind) => {
//     const filtered = devices.filter((d) => d.kind === kind);
//     const unique = [];
//     const seen = new Set();

//     filtered.forEach((device) => {
//       if (device.deviceId === "default") {
//         unique.push({
//           deviceId: "default",
//           label: `Default ${kind === "audioinput" ? "Microphone" : "Camera"}`,
//         });
//       } else if (!seen.has(device.label)) {
//         unique.push(device);
//         seen.add(device.label);
//       }
//     });
//     return unique;
//   };

//   console.log(Liveclass_Id)

//   useEffect(() => {
//     const getDevices = async () => {
//       try {
//         const deviceInfos = await navigator.mediaDevices.enumerateDevices();
//         setMics(filterDevices(deviceInfos, "audioinput"));
//         setCameras(filterDevices(deviceInfos, "videoinput"));
//       } catch (err) {
//         console.error("Error fetching devices", err);
//       }
//     };
//     getDevices();
//     navigator.mediaDevices.addEventListener("devicechange", getDevices);
//     return () =>
//       navigator.mediaDevices.removeEventListener("devicechange", getDevices);
//   }, []);

//   const handleStartMeeting = () => {
//     if (!liveClassTitle.trim()) return alert("Please enter a class title");
//     setIsLive(true);
//   };
//   const handleStartRecording = () => {
//     if (!webcamRef.current) return;

//     const stream = webcamRef.current.stream;

//     // Prevent recording if video is off
//     // if (!videoOn) return alert("Enable video to record!");

//     setRecording(true);
//     mediaRecorderRef.current = new MediaRecorder(stream, {
//       mimeType: "video/webm",
//     });

//     let localChunks = [];
//     mediaRecorderRef.current.ondataavailable = (event) => {
//       if (event.data.size > 0) localChunks.push(event.data);
//     };

//     mediaRecorderRef.current.onstop = async () => {
//       const blob = new Blob(localChunks, { type: "video/webm" });
//       if (!blob.size) return; // Don't save empty video

//       const formData = new FormData();
//       formData.append("video", blob, `${liveClassTitle || "recording"}.webm`);

//       try {
//         const res = await axios.post(
//           "http://localhost:5000/liveclasssvideos",
//           formData,
//           Liveclass_Id && formData.append("Liveclass_Id", Liveclass_Id),
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );
//         res.data.status
//           ? toast.success("Video uploaded successfully!")
//           : toast.error(res.data.msg || "Upload failed");
//       } catch (err) {
//         console.error(err);
//         toast.error("Error uploading video!");
//       }
//     };

//     mediaRecorderRef.current.start();
//   };


//   const handleStopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }
//   };

//   const backToLive = () => {
//     setRecording(false);
//     setIsLive(false);
//   };

//   return (
//     <div className="fixed inset-0 h-[100vh] overflow-auto w-full bg-white z-50 flex flex-col">
//       <h1 className="text-3xl font-thin absolute p-4 hover:text-red-800 cursor-pointer" onClick={onClick}><IoMdArrowRoundBack /></h1>
// <ToastContainer/>

//       {!isLive ? (
//         <div className="grid md:grid-cols-2 h-full">

//           {/* Left: Info & Device selectors */}
//           <div className="flex flex-col justify-center items-start p-10 gap-8 bg-blue-500/30 ">
//             <h1 className="text-6xl font-thin">Video & Live Classes</h1>
//             <p className="text-xl">Start your live class and record it easily</p>

//             <input
//               type="text"
//               value={liveClassTitle}
//               onChange={(e) => setLiveClassTitle(e.target.value)}
//               placeholder="Enter class title"
//               className="w-full md:w-80 p-3 rounded-lg outline-none border border-white bg-black text-white placeholder-white focus:ring-2 focus:ring-white"
//             />

//             <div className="flex flex-col gap-4 mt-4">
//               <div className="flex items-center  gap-2">
//                 <SlEarphonesAlt className="text-2xl text-white" />
//                 <select
//                   value={selectedMic}
//                   onChange={(e) => setSelectedMic(e.target.value)}
//                   className="border p-2 rounded-lg w-full text-black"
//                 >
//                   {mics.map((device) => (
//                     <option key={device.deviceId} value={device.deviceId}>
//                       {device.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex items-center gap-2">
//                 <FaVideo className="text-2xl text-white" />
//                 <select
//                   value={selectedCamera}
//                   onChange={(e) => setSelectedCamera(e.target.value)}
//                   className="border p-2 rounded-lg w-full text-black"
//                 >
//                   {cameras.map((device) => (
//                     <option key={device.deviceId} value={device.deviceId}>
//                       {device.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//           </div>

//           {/* Right: Webcam */}
//           <div className="flex flex-col items-center justify-center p-10 gap-6 w-full">
//             <p className="text-2xl">{liveClassTitle}</p>
//             <div className="relative w-full h-96 border rounded-xl overflow-hidden bg-black flex items-center justify-center">
//               <Webcam
//               audio={!muted}
//               ref={webcamRef}
//               videoConstraints={{ deviceId: selectedCamera }}
//               className={`w-full h-full object-cover transition-all duration-500 ${!videoOn ? "blur-sm brightness-0" : ""}`}
//             />

//             {!videoOn && (
//               <div
//                 onClick={() => setVideoOn(true)}
//                 className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-white"
//               >
//                 <FaVideoSlash className="text-8xl mb-4" />
//                 <p className="text-xl font-semibold">Video Off - Click to Enable</p>
//               </div>
//             )}
//             </div>

//             {/* Controls */}
//             <div className="flex gap-4 mt-4">
//               <button
//                 onClick={() => setMuted(!muted)}
//                 className="w-14 h-14 rounded-full flex items-center content-center justify-center text-3xl font-bold bg-blue-300"
//               >
//                 {muted ? <FaMicrophoneSlash /> : <FaMicrophone />}
//               </button>

//               <button
//                 onClick={() => setVideoOn(!videoOn)}
//                 className="w-14 h-14 rounded-full flex items-center content-center justify-center text-3xl font-bold bg-blue-300"
//               >
//                 {videoOn ? <FaVideo /> : <FaVideoSlash />}
//               </button>


//             </div>
//             <button
//               onClick={handleStartMeeting}
//               className="mt-6 px-6 py-3  rounded-xl bg-white text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-all"
//             >
//               Start Meeting
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="relative flex flex-col items-center w-full h-full bg-black">
//           {/* Live Meeting */}
//           <div className="absolute top-5 left-5 flex items-center gap-3 z-50">
//             <button
//               onClick={backToLive}
//               className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
//             >
//               <TiArrowBack size={24} />
//             </button>
//             <p className="text-white text-2xl font-semibold">{liveClassTitle}</p>
//           </div>

//             <Webcam
//               audio={!muted}
//               ref={webcamRef}
//               videoConstraints={{ deviceId: selectedCamera }}
//               className={`w-full h-full object-cover transition-all duration-500 ${!videoOn ? "blur-sm brightness-0" : ""}`}
//             />

//             {!videoOn && (
//               <div
//                 onClick={() => setVideoOn(true)}
//                 className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-white"
//               >
//                 <FaVideoSlash className="text-8xl mb-4" />
//                 <p className="text-xl font-semibold">Video Off - Click to Enable</p>
//               </div>
//             )}


//           <div className="absolute bottom-10 flex gap-4 bg-black/50 px-6 py-3 rounded-xl z-50">
//             <button
//               onClick={() => setMuted(!muted)}
//               className="px-4 py-2 border rounded-lg text-white hover:bg-gray-700 transition-colors"
//             >
//               {muted ? <FaMicrophoneSlash /> : <FaMicrophone />}
//             </button>

//             <button
//               onClick={() => {

//                 setVideoOn(!videoOn);
//               }}
//               className="px-4 py-2 border rounded-lg text-white hover:bg-gray-700 transition-colors"
//             >
//               {videoOn ? <FaVideo /> : <FaVideoSlash />}
//             </button>


//             {!recording ? (
//               <button
//                 onClick={handleStartRecording}
//                 className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
//               >
//                 Start Recording
//               </button>
//             ) : (
//               <button
//                 onClick={handleStopRecording}
//                 className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
//               >
//                 Stop Recording
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LiveClass;





import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import io from "socket.io-client";
import { TiArrowBack } from "react-icons/ti";
import { SlEarphonesAlt } from "react-icons/sl";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000");

const LiveClass = ({ onClick, Liveclass_Id }) => {
  const [liveClassTitle, setLiveClassTitle] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [recording, setRecording] = useState(false);
  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  let go = useNavigate()
  const [mics, setMics] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [selectedMic, setSelectedMic] = useState("default");
  const [selectedCamera, setSelectedCamera] = useState("default");
  const [viewers, setViewers] = useState([]);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const streamRef = useRef(null);
  const peersRef = useRef({});

  // Helper to filter unique devices
  const filterDevices = (devices, kind) => {
    const filtered = devices.filter((d) => d.kind === kind);
    const unique = [];
    const seen = new Set();

    filtered.forEach((device) => {
      if (device.deviceId === "default") {
        unique.push({
          deviceId: "default",
          label: `Default ${kind === "audioinput" ? "Microphone" : "Camera"}`,
        });
      } else if (!seen.has(device.label)) {
        unique.push(device);
        seen.add(device.label);
      }
    });
    return unique;
  };

  // Fetch devices
  useEffect(() => {
    const getDevices = async () => {
      try {
        const deviceInfos = await navigator.mediaDevices.enumerateDevices();
        setMics(filterDevices(deviceInfos, "audioinput"));
        setCameras(filterDevices(deviceInfos, "videoinput"));
      } catch (err) {
        console.error("Error fetching devices", err);
      }
    };
    getDevices();
    navigator.mediaDevices.addEventListener("devicechange", getDevices);
    return () =>
      navigator.mediaDevices.removeEventListener("devicechange", getDevices);
  }, []);


  // Start recording
  const handleStartRecording = () => {
    if (!streamRef.current) return;
    const stream = streamRef.current;

    mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "video/webm" });
    setRecording(true);
    let localChunks = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) localChunks.push(e.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(localChunks, { type: "video/webm" });
      if (!blob.size) return;

      const formData = new FormData();
      formData.append("video", blob, `${liveClassTitle || "recording"}.webm`);
      if (Liveclass_Id) formData.append("Liveclass_Id", Liveclass_Id);

      try {
        const res = await axios.post("http://localhost:5000/liveclasssvideos", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        res.data.status
          ? toast.success("Video uploaded successfully!")
          : toast.error(res.data.msg || "Upload failed");
      } catch (err) {
        console.error(err);
        toast.error("Error uploading video!");
      }
    };

    mediaRecorderRef.current.start();
  };

  // Start live session
const handleStartLive = async () => {
  if (!liveClassTitle.trim()) return alert("Please enter a class title");
  setIsLive(true);

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: selectedCamera },
      audio: { deviceId: selectedMic },
    });

    streamRef.current = stream;
    webcamRef.current.srcObject = stream;

    handleStartRecording();

    socket.emit("role", "admin");
    socket.emit("live-start", Liveclass_Id);

    socket.on("new-viewer", async (viewerId) => {
      console.log("Viewer joined:", viewerId);

      const peer = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      peersRef.current[viewerId] = peer;

      stream.getTracks().forEach((track) => peer.addTrack(track, stream));

      peer.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", { candidate: event.candidate, to: viewerId });
        }
      };

      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);

      socket.emit("offer", { offer, to: viewerId });
    });

    socket.on("answer", async ({ answer, from }) => {
      if (peersRef.current[from]) {
        await peersRef.current[from].setRemoteDescription(answer);
      }
    });

    socket.on("ice-candidate", async ({ candidate, from }) => {
      if (peersRef.current[from] && candidate) {
        await peersRef.current[from].addIceCandidate(candidate);
      }
    });

  } catch (err) {
    console.error("Camera error:", err);
    toast.error("Camera / Mic access failed!");
  }
};




  const handleStopLive = () => {
    setIsLive(false);
    setRecording(false);
    if (mediaRecorderRef.current && recording) mediaRecorderRef.current.stop();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      webcamRef.current.srcObject = null;
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      handleStopLive()
      setTimeout(() => {
        go("/admin/batches")
      }, 2000);
    }

  };
  // show viewer ----------------------------------



  // useEffect(() => {
  //   socket.emit("admin-join");

  //   socket.on("viewer-joined", (user) => {
  //     setViewers((prev) => [...prev, user]);
  //   });

  //   socket.on("viewer-left", ({ socketId }) => {
  //     setViewers((prev) => prev.filter((v) => v.socketId !== socketId));
  //   });
  // }, []);



  return (
    <div className="fixed inset-0 h-[100vh] overflow-auto w-full bg-white z-50 flex flex-col">
      <ToastContainer />
      <h1
        className="text-3xl font-thin absolute p-4 hover:text-red-800 cursor-pointer"
        onClick={onClick}
      >
        <IoMdArrowRoundBack />
      </h1>

      {!isLive ? (
        <div className="grid md:grid-cols-2 h-full">
          {/* Left panel */}
          <div className="flex flex-col justify-center items-start p-10 gap-8 bg-blue-500/30 ">
            <h1 className="text-6xl font-thin">Video & Live Classes</h1>
            <p className="text-xl">Start your live class and record it easily</p>
            <input
              type="text"
              value={liveClassTitle}
              onChange={(e) => setLiveClassTitle(e.target.value)}
              placeholder="Enter class title"
              className="w-full md:w-80 p-3 rounded-lg outline-none border border-white bg-black text-white placeholder-white focus:ring-2 focus:ring-white"
            />

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-2">
                <SlEarphonesAlt className="text-2xl text-white" />
                <select
                  value={selectedMic}
                  onChange={(e) => setSelectedMic(e.target.value)}
                  className="border p-2 rounded-lg w-full text-black"
                >
                  {mics.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <FaVideo className="text-2xl text-white" />
                <select
                  value={selectedCamera}
                  onChange={(e) => setSelectedCamera(e.target.value)}
                  className="border p-2 rounded-lg w-full text-black"
                >
                  {cameras.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex flex-col items-center justify-center p-10 gap-6 w-full">
            <p className="text-2xl">{liveClassTitle}</p>
            <div className="relative w-full h-96 border rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <Webcam
                audio={!muted}
                ref={webcamRef}
                videoConstraints={{ deviceId: selectedCamera }}
                className={`w-full h-full object-cover transition-all duration-500 ${!videoOn ? "blur-sm brightness-0" : ""
                  }`}
              />
              {!videoOn && (
                <div
                  onClick={() => setVideoOn(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-white"
                >
                  <FaVideoSlash className="text-8xl mb-4" />
                  <p className="text-xl font-semibold">Video Off - Click to Enable</p>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setMuted(!muted)}
                className="w-14 h-14 rounded-full flex items-center content-center justify-center text-3xl font-bold bg-blue-300"
              >
                {muted ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>

              <button
                onClick={() => setVideoOn(!videoOn)}
                className="w-14 h-14 rounded-full flex items-center content-center justify-center text-3xl font-bold bg-blue-300"
              >
                {videoOn ? <FaVideo /> : <FaVideoSlash />}
              </button>
            </div>

            <button
              onClick={handleStartLive}
              className="mt-6 px-6 py-3 rounded-xl bg-white text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-all"
            >
              Start Live
            </button>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center w-full h-full bg-black">
          <div className="absolute top-5 left-5 flex items-center gap-3 z-50">
            <button
              onClick={handleStopLive}
              className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
            >
              <TiArrowBack size={24} />
            </button>
            <p className="text-white text-2xl font-semibold">{liveClassTitle}</p>
          </div>

          <Webcam
            audio={!muted}
            ref={webcamRef}
            videoConstraints={{ deviceId: selectedCamera }}
            className={`w-full h-full object-cover transition-all duration-500 ${!videoOn ? "blur-sm brightness-0" : ""
              }`}
          />

          {!videoOn && (
            <div
              onClick={() => setVideoOn(true)}
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-white"
            >
              <FaVideoSlash className="text-8xl mb-4" />
              <p className="text-xl font-semibold">Video Off - Click to Enable</p>
            </div>
          )}

          <div className="absolute bottom-10 flex gap-4 bg-black/50 px-6 py-3 rounded-xl z-50">
            <button
              onClick={() => setMuted(!muted)}
              className="px-4 py-2 border rounded-lg text-white hover:bg-gray-700 transition-colors"
            >
              {muted ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>

            <button
              onClick={() => setVideoOn(!videoOn)}
              className="px-4 py-2 border rounded-lg text-white hover:bg-gray-700 transition-colors"
            >
              {videoOn ? <FaVideo /> : <FaVideoSlash />}
            </button>



            <button
              onClick={handleStopRecording}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Stop Recording
            </button>

          </div>
        </div>
      )}

      {/* <div className="w-96 bg-white absolute bottom-20 right-3 rounded-2xl p-5">
        {
          viewers.map((user, index) => {
            return (
              <>
                <ul className="" key={index}>
                    <li className="text-xl font-bold ">{user.email} </li>
                </ul>
              </>
            )
          })
        }
      </div> */}
    </div>
  );
};

export default LiveClass;
