import React, { useEffect, useState } from 'react'

function Liveclasses() {
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
        <div className="">
            <div className="bg-white">
           

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
                
            </div>
        </div>
    );
};

export default Liveclasses
