import React, { useEffect, useState } from "react";

const Live_ontents = ({ onClick }) => {
    const [liveclass, setliveclass] = useState("")
    const [videos, setVideos] = useState([]);

    // Backend se videos laane ka function
    const fetchVideos = async () => {
        let res = await fetch("http://localhost:5000/getlivevideos");
        let data = await res.json();
        if (data.status) {
            setVideos(data.vdata);
        }
    };

    useEffect(() => {
    fetchVideos()
    }, [])

   
    return (
        <div className="fixed h-full  right-0 z-50 overflow-auto">
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

                {
                    
                        videos.length === 0 ? (
                            <p>No videos uploaded yet.</p>
                        ) : (
                            videos.map((vid, index) => (
                                <div key={index} className="flex justify-between" style={{ marginBottom: "20px" }}>
                                    <h4 className="text-xl font-bold ps-5">{vid.title}</h4>
                                    <video
                                        width="200"
                                        controls
                                        src={`http://localhost:5000/${vid.path}`}
                                    />
                                </div>
                            ))
                        )
                    
                 
                }

                {/* Footer */}
                <div className="flex justify-end  mt-6 ">
                    <button
                        className={`px-4 py-2 rounded-md text-white font-medium ${liveclass.trim()
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-blue-300 cursor-not-allowed"
                            }`}
                        disabled={!liveclass.trim()}
                        onClick={() => {
                            setliveclass("");
                            onClick();
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Live_ontents;
