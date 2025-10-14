import { useState, useEffect } from "react";

function VideoPage() {
  const [file, setFile] = useState(null);
  const [videos, setVideos] = useState([]);

  // Backend se videos laane ka function
  const fetchVideos = async () => {
    let res = await fetch("https://classplut2.onrender.com/getlivevideos");
    let data = await res.json();
    if (data.status) {
      setVideos(data.vdata);
    }
  };

  // First time jab page load ho
  useEffect(() => {
    fetchVideos();
  }, []);

  // Upload handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a video!");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    let res = await fetch("https://classplut2.onrender.com/videos", {
      method: "POST",
      body: formData,
    });
    let data = await res.json();

    if (data.status) {
      alert("Video uploaded successfully!");
      setFile(null); // reset file input
      fetchVideos(); // upload ke baad refresh list
    } else {
      alert(data.msg);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📤 Upload & Watch Videos</h2>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>

      {/* Video List */}
      <h3>🎥 Uploaded Videos</h3>
      {videos.length === 0 ? (
        <p>No videos uploaded yet.</p>
      ) : (
        videos.map((vid, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h4>{vid.title}</h4>
            <video
              width="400"
              controls
              src={`https://classplut2.onrender.com/${vid.path}`}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default VideoPage;
