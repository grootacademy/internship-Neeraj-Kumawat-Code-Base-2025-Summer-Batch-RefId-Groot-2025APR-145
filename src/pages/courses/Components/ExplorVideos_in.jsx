import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GrFormPreviousLink } from 'react-icons/gr';
import { FaTrashAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { p } from 'motion/react-client';
import { FaCheck } from 'react-icons/fa6';
import { toast, ToastContainer } from 'react-toastify';

function ExplorVideos_in() {
    const location = useLocation();
    const navigate = useNavigate();
    const { courseData, selectedFolder } = location.state || {};

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [uploadedVideos, setUploadedVideos] = useState([]);
    const [editVideoId, setEditVideoId] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');

    const fetchVideos = async () => {
        try {
            let res = await fetch("http://localhost:5000/getvideos");
            let data = await res.json();
            if (data.status) {
                const filteredVideos = data.data.filter(video => video.CourseId === courseData._id);
                setUploadedVideos(filteredVideos);
            }
        } catch (error) {
            console.error("Failed to fetch videos:", error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select a video!");
        if (!title.trim()) return alert("Please enter a title!");

        const formData = new FormData();
        formData.append("video", file);
        formData.append("title", title.trim());
        formData.append("courseId", courseData._id);
        formData.append("Publish", true);

        let res = await fetch("http://localhost:5000/videos", {
            method: "POST",
            body: formData,
        });
        let data = await res.json();

        if (data.status) {
            alert("Video uploaded successfully!");
            setFile(null);
            setTitle('');
            fetchVideos();
        } else {
            alert(data.msg);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this video?")) return;

        try {
            const res = await fetch("http://localhost:5000/deletevideo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (data.status) {
                alert("Video deleted successfully!");
                fetchVideos();
            } else {
                alert(data.msg || "Failed to delete video");
            }
        } catch (err) {
            console.error("Delete error:", err);
            alert("Something went wrong");
        }
    };

    const handleEditTitle = (video) => {
        setEditVideoId(video._id);
        setEditedTitle(video.title);
    };

    const handleSaveTitle = async (id) => {
        if (!editedTitle.trim()) {
            alert("Title cannot be empty.");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/updatevideotitle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, title: editedTitle }),
            });
            const data = await res.json();
            if (data.status) {
                alert("Title updated successfully!");
                setEditVideoId(null);
                setEditedTitle('');
                fetchVideos();
            } else {
                alert(data.msg || "Failed to update title");
            }
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    const handlePublish = async (id) => {
        

        try {
            const res = await fetch("http://localhost:5000/updatevideopublish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, publish: true }),
            });
            const data = await res.json();
            if (data.status) {
                toast.success("Published successfully!");
                setEditVideoId(null);
                setEditedTitle('');
                fetchVideos();
            } else {
                toast.error(data.msg || "Failed to update published status");
            }
        } catch (err) {
            console.error("Update error:", err);
        }
    };
    const handleUnPublish = async (id) => {
        

        try {
            const res = await fetch("http://localhost:5000/updatevideopublish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, publish: false }),
            });
            const data = await res.json();
            if (data.status) {
                toast.success("Unpublished successfully!");
                setEditVideoId(null);
                setEditedTitle('');
                fetchVideos();
            } else {
                toast.error(data.msg || "Failed to update published status");
            }
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    if (!courseData || !selectedFolder) {
        return <p className="text-center text-red-500 mt-10">Invalid Data Provided</p>;
    }

    const videos = selectedFolder.videos || [];
    const livevideos = selectedFolder.liveVideo || [];

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <ToastContainer/>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">📁 Folder: {selectedFolder.data}</h1>
            <p className="text-gray-600 mb-8">{selectedFolder.info || "No description provided."}</p>

            {/* Upload Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mb-10">
                <input
                    type="text"
                    placeholder="Enter video title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                    required
                />
                <input
                    type="file"
                    accept="video/*"
                    className='border border-gray-300 rounded-md p-2'
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                />
                <button className='bg-blue-500 text-white rounded-xl py-2 px-4' type="submit">
                    Upload
                </button>
            </form>

            {/* Uploaded Videos */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-700">🎥 Uploaded Videos for this Course</h2>
                {uploadedVideos.length > 0 ? (
                    uploadedVideos.map((video, index) => (
                        <div key={index} className="mb-8 bg-white p-4 rounded shadow-md">
                            {editVideoId === video._id ? (
                                <div className="flex flex-col gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                        className="border p-2 rounded w-full"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1"
                                            onClick={() => handleSaveTitle(video._id)}
                                        >
                                            <FaSave /> Save
                                        </button>
                                        <button
                                            className="bg-gray-400 text-white px-3 py-1 rounded flex items-center gap-1"
                                            onClick={() => setEditVideoId(null)}
                                        >
                                            <FaTimes /> Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-lg">{video.title || `Video ${index + 1}`}</h3>
                                    <div className="flex  gap-3">
                                        <button
                                            onClick={() => handleEditTitle(video)}
                                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(video._id)}
                                            className="text-red-600 hover:text-red-800 flex items-center gap-1"
                                        >
                                            <FaTrashAlt /> Delete
                                        </button>
                                        {video.Publish ? (
                                            <button
                                                onClick={() => handleUnPublish(video._id)}
                                                className="text-red-600 hover:text-red-800 flex items-center gap-1"
                                            >
                                                <FaTrashAlt /> UnPublish
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handlePublish(video._id)}
                                                className="text-green-600 hover:text-green-800 flex items-center gap-1"
                                            >
                                                <FaCheck /> Publish
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                            <video
                                className="w-full h-96 max-w-4xl mx-auto rounded-md shadow"
                                controls
                                src={`http://localhost:5000/${video.path}`}
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No uploaded videos found for this course.</p>
                )}
            </div>

            {/* Existing Folder Videos */}
            <div className="space-y-6 mt-12">
                <h2 className="text-xl font-bold text-gray-700">🎞 Folder Videos</h2>
                {videos.length > 0 ? (
                    videos.map((video, index) => (
                        <video
                            key={index}
                            className="w-full h-96 max-w-4xl mx-auto rounded-md shadow"
                            controls
                            src={video.path}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">No videos found in this folder.</p>
                )}
            </div>

            {/* Live Videos */}
            <div className="space-y-6 mt-12">
                <h2 className="text-xl font-bold text-gray-700">🔴 Live Classes</h2>
                {livevideos.length > 0 ? (
                    livevideos.map((lv, index) => (
                        <video
                            key={index}
                            className="w-full h-96 max-w-4xl mx-auto rounded-md shadow"
                            controls
                            src={lv.path}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">No live videos found.</p>
                )}
            </div>

            <div className="flex justify-start mt-8">
                <button
                    className="flex items-center gap-2 border border-blue-500 text-blue-500 rounded-xl py-2 px-4"
                    onClick={() => navigate("/admin/coursesdetales")}
                >
                    <GrFormPreviousLink /> Previous
                </button>
            </div>
        </div>
    );
}

export default ExplorVideos_in;
