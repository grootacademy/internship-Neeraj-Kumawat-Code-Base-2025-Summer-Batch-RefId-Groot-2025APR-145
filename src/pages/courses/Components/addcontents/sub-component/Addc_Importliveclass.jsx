import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addliveVideoToFolder } from "../../../../../components/storeslice/Addfolders";

const Addc_Importliveclass = ({ onClick , folderId}) => {
    const [liveclass, setliveclass] = useState("")
    const [liveVideos, setliveVideos] = useState([])
    const [selectedVideos, setSelectedVideos] = useState([])
    const liveclasses = [
        { id: 1, Classname: "Testing", Duration: "00:04:04" },
        { id: 2, Classname: "Live", Duration: "38:30" },
        { id: 3, Classname: "live", Duration: "00:42:45" },
        { id: 4, Classname: "Operating System", Duration: "0150:54" },
        { id: 5, Classname: "Live Class ", Duration: "33:04:45" },
    ];
    let dispatch =useDispatch()

    const fetchliveVideos = async () => {
        let res = await fetch("https://classplut2.onrender.com/getlivevideos");
        let data = await res.json();
        if (data.status) {
            setliveVideos(data.vdata);
        }
    };

    useEffect(() => {
        fetchliveVideos();
    }, []);

    const VideoValue = (e, video) => {
        if (e.target.checked) {
            setSelectedVideos(prev => [...prev, video]);
        } else {
            setSelectedVideos(prev => prev.filter(v => v._id !== video._id));
        }
    };



    const handleSaveToFolder = () => {
        if (!folderId) {
            alert("Folder not selected");
            return;
        }

        selectedVideos.forEach(video => {
            dispatch(addliveVideoToFolder({
                folderId,
                livedata: {
                    id: video._id,
                    title: video.title,
                    path: `https://classplut2.onrender.com/${video.path}`
                }
            }));
        });

        alert("Selected folder to added Videos!");
        setSelectedVideos([]);
        onClick(); // close modal
    };

    console.log(liveVideos)
    return (
        <div className="fixed h-full  right-0 z-50">
            <div className="bg-white w-[250px] sm:w-[600px] h-full rounded-lg shadow-lg p-5 relative">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg font-semibold">Add Live Classes</h2>
                    <button
                        onClick={onClick}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                {liveVideos.length === 0 ? (
                    <p>No videos uploaded yet.</p>
                ) : (
                    liveVideos.map((vid, index) => (
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
                {selectedVideos.length > 0 && (
                    <button
                        onClick={handleSaveToFolder}
                        className="w-full mt-4 py-2 bg-green-600 text-white rounded"
                    >
                        Save Selected Videos to Folder
                    </button>
                )}

            </div>
        </div >
    );
};

export default Addc_Importliveclass;
