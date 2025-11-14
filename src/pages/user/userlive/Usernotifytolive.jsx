import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";

const socket = io("http://localhost:5000");

function UserDashboard() {
  const [notification, setNotification] = useState(null);
  const [batches, setBatches] = useState([]);
  const [liveActive, setLiveActive] = useState(false);

  useEffect(() => {
    async function getBatchesData() {
      try {
        const res = await axios.get("http://localhost:5000/userBatches", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setBatches(res.data.batch || []);
      } catch (error) {
        console.log(error);
      }
    }

    getBatchesData();
  }, []);

  useEffect(() => {
    // Notify when live starts
    socket.on("notify-live", (data) => {
      console.log("Live Notification:", data);

      // Only show if user's batch matches
      if (batches.some((batch) => batch._id === data.Liveclass_Id)) {
        setNotification(data.message);
        setLiveActive(true);
      }
    });

    // Notify when live ends
    socket.on("live-ended", (data) => {
      setNotification(data.message);
      setLiveActive(false);
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off("notify-course-live");
      socket.off("live-ended");
    };
  }, [batches]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎓 Welcome Use</h1>

      {notification && (
        <div className="bg-yellow-200 border border-yellow-500 rounded-lg p-4 mb-4 shadow-md">
          <p>{notification}</p>
          {liveActive && (
            <button
              onClick={() => (window.location.href = "/user/UserWatchLive")}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Join Live Class
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
