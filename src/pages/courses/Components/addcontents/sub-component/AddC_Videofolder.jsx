// import React, { useEffect, useState } from "react";

// const AddC_Videofolder = ({ onClick }) => {
//     const [videoname, setvideoname] = useState("")
//     const [file, setFile] = useState(null);
//     const [videos, setVideos] = useState([]);
//     const [selectedvideos, setselectedvideos] = useState([{}])

//     // Backend se videos laane ka function
//     const fetchVideos = async () => {
//         let res = await fetch("https://classplut2.onrender.com/getvideos");
//         let data = await res.json();
//         if (data.status) {
//             setVideos(data.vdata);
//         }
//     };

//     // First time jab page load ho
//     useEffect(() => {
//         fetchVideos();
//     }, []);

//     // Upload handle
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!file) {
//             alert("Please select a video!");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("video", file);

//         let res = await fetch("https://classplut2.onrender.com/videos", {
//             method: "POST",
//             body: formData,
//         });
//         let data = await res.json();

//         if (data.status) {
//             alert("Video uploaded successfully!");
//             setFile(null); // reset file input
//             fetchVideos(); // upload ke baad refresh list
//         } else {
//             alert(data.msg);
//         }
//     };

// const VideoValue = (e) => {
//     if (e.target.checked) {
//         setselectedvideos(prev => [...prev, e.target.value]);
//     } else {
//         setselectedvideos(prev => prev.filter(val => val !== e.target.value));
//     }
// };

// console.log(selectedvideos)


//     return (
//         <div className="fixed h-full right-0 z-50 bg-black/40 w-full flex justify-end">
//             <div className="bg-white w-[250px] sm:w-[400px] h-full rounded-lg shadow-lg p-5 relative">
//                 {/* Header */}
//                 <div className="flex justify-between items-center border-b pb-2">
//                     <h2 className="text-lg font-semibold">Add Video</h2>
//                     <button
//                         onClick={onClick}
//                         className="text-gray-500 hover:text-gray-700 text-xl"
//                     >
//                         ✕
//                     </button>
//                 </div>

//                 {/* Body */}

//                 <div className="max-w-4xl mx-auto p-6 font-sans overflow-auto">
//                     <h2 className="text-2xl font-semibold text-gray-800 mb-4">📤 Upload & Watch Videos</h2>

//                     {/* Upload Form */}
//                     <form onSubmit={handleSubmit} className="flex flex-col  items-center gap-4 mb-6">
//                         <input
//                             type="file"
//                             accept="video/*"
//                             onChange={(e) => setFile(e.target.files[0])}
//                             className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
//                        file:rounded file:border-0 file:text-sm file:font-semibold
//                        file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                         />
//                         <button
//                             type="submit"
//                             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//                         >
//                             Upload
//                         </button>
//                     </form>

//                     {/* Video List */}
//                     <h3 className="text-xl font-medium text-gray-700 mb-3"> Uploaded Videos</h3>
//                     {videos.length === 0 ? (
//                         <p className="text-gray-500">No videos uploaded yet.</p>
//                     ) : (
//                         videos.map((vid, index) => (
//                             <div
//                                 key={index}
//                                 className="mb-6 p-4 "
//                             >
//                                 <h4 className="text-lg font-semibold mb-2">{vid.title}</h4>
//                                 <div className="flex justify-between">
//                                     <video className="w-40 rounded" controls src={`https://classplut2.onrender.com/${vid.path}`} />
//                                     <input type="checkbox"   value={vid._id} onClick={VideoValue} />
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>

//                 {/* Footer */}
//                 <div className="flex justify-end  mt-6 ">

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddC_Videofolder;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addVideoToFolder } from "../../../../../components/storeslice/Addfolders";

const AddC_Videofolder = ({ onClick, folderId }) => {
    const dispatch = useDispatch();

    const [file, setFile] = useState(null);
    const [videos, setVideos] = useState([]);
    const [selectedvideos, setSelectedVideos] = useState([]);

    // Fetch all videos
    const fetchVideos = async () => {
        let res = await fetch("https://classplut2.onrender.com/getvideos");
        let data = await res.json();
        if (data.status) {
            setVideos(data.data);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    //  Upload video and directly save to folder
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

    //  Select existing videos manually
    const VideoValue = (e, video) => {
        if (e.target.checked) {
            setSelectedVideos(prev => [...prev, video]);
        } else {
            setSelectedVideos(prev => prev.filter(v => v._id !== video._id));
        }
    };

    //  Save manually selected videos to Redux folder
    const handleSaveToFolder = () => {
        if (!folderId) {
            alert("Folder not selected");
            return;
        }

         selectedvideos.forEach(video => {
        dispatch(addVideoToFolder({
            folderId,
            videoData: {
                id: video._id,
                title: video.title,
                path: `https://classplut2.onrender.com/${video.path}`
            }
        }));
    });

        alert("Selected videos added to folder!");
        setSelectedVideos([]);
        onClick(); // close modal
    };

    return (
        <div className="fixed h-full right-0 z-50 bg-black/40 w-full flex justify-end">
            <div className="bg-white w-[250px] sm:w-[400px] h-full rounded-lg shadow-lg p-5 relative">
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg font-semibold">Add Video</h2>
                    <button onClick={onClick} className="text-xl">✕</button>
                </div>

                <div className="max-w-4xl mx-auto p-6 font-sans overflow-y-auto h-[85vh]">
                    <h2 className="text-2xl font-semibold mb-4">📤 Upload & Watch Videos</h2>

                    {/*  Upload Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mb-6">
                        <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="block w-full text-sm text-gray-700 file:py-2 file:px-4 file:bg-blue-50 hover:file:bg-blue-100"
                        />
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                            Upload
                        </button>
                    </form>

                    {/*  Uploaded Video List */}
                    <h3 className="text-xl font-medium mb-3">Uploaded Videos</h3>
                    {videos.length === 0 ? (
                        <p>No videos uploaded yet.</p>
                    ) : (
                        videos.map((vid, index) => (
                            <div key={index} className="mb-6 p-4">
                                <h4 className="text-lg font-semibold mb-2">{vid.title}</h4>
                                <div className="flex justify-between">
                                    <video className="w-40 rounded" controls src={`https://classplut2.onrender.com/${vid.path}`} />
                                    <input
                                        type="checkbox"
                                        value={vid._id}
                                        onChange={(e) => VideoValue(e, vid)}
                                    />
                                </div>
                            </div>
                        ))
                    )}

                    {/*  Save manually selected videos */}
                    {selectedvideos.length > 0 && (
                        <button
                            onClick={handleSaveToFolder}
                            className="w-full mt-4 py-2 bg-green-600 text-white rounded"
                        >
                            Save Selected Videos to Folder
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddC_Videofolder;
