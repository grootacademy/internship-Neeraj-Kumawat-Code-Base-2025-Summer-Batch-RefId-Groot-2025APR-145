import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function AdminLiveStream({ batchId }) {
  const videoRef = useRef(null);
  const [viewers, setViewers] = useState([]);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  useEffect(() => {
    socket.emit("role", "admin");

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;

        // Start recording
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) recordedChunksRef.current.push(e.data);
        };
        mediaRecorder.onstop = async () => {
          const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
          const formData = new FormData();
          formData.append("video", blob, `live_${Date.now()}.webm`);
          formData.append("batchId", batchId);

          // Send to backend
          await fetch("http://localhost:5000/savelivevideo", {
            method: "POST",
            body: formData,
          });
          recordedChunksRef.current = [];
        };
        mediaRecorder.start();
        setRecording(true);

        // Handle new viewers
        socket.on("new-viewer", async (viewerId) => {
          const peer = new RTCPeerConnection();
          stream.getTracks().forEach(track => peer.addTrack(track, stream));

          peer.onicecandidate = (event) => {
            if (event.candidate) {
              socket.emit("ice-candidate", { candidate: event.candidate, to: viewerId });
            }
          };

          const offer = await peer.createOffer();
          await peer.setLocalDescription(offer);
          socket.emit("offer", { offer, to: viewerId });

          // Answer from viewer
          socket.on("answer", async ({ answer, from }) => {
            if (from === viewerId) await peer.setRemoteDescription(answer);
          });
          socket.on("ice-candidate", async ({ candidate, from }) => {
            if (from === viewerId && candidate) await peer.addIceCandidate(candidate);
          });
        });
      })
      .catch((err) => console.error("Camera error:", err));

    return () => {
      socket.off("new-viewer");
      if (mediaRecorderRef.current && recording) {
        mediaRecorderRef.current.stop();
        setRecording(false);
      }
    };
  }, [batchId]);

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-xl font-bold">Admin Live Stream</h2>
      <video ref={videoRef} autoPlay playsInline muted className="rounded-lg w-[600px]" />
    </div>
  );
}

export default AdminLiveStream;
