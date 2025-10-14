import { h1 } from "motion/react-client";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";


function Explor_batch_user() {
  let location = useLocation();
  let batchdata = location.state.batch || {};
  const [videos, setVideos] = useState([]);
  console.log(batchdata);
  const [activeTab, setActiveTab] = useState('Overview');
  let tab = ["Overview", "Assignments", "Announcements", "Tests", "Videos", "Live classes", "Study material"]




  const fetchVideos = async () => {
    let res = await fetch("https://classplut2.onrender.com/getlivevideos");
    let data = await res.json();
    if (data.status) {
      setVideos(data.vdata);
    }
  };

  useEffect(() => {
    fetchVideos()
  }, [])

  let filter = videos.filter((item) => item.Liveclass_Id == batchdata._id)
  return (
    <div className="p-6 flex">
      {/* Sidebar */}


      <div className="flex flex-col gap-5 border-r  bg-gray-50 h-screen py-2 text-xl font-medium text-gray-700">
        {tab.map((tab, index) => (
          <span
            key={index}
            className={`cursor-pointer px-4 py-1 ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : ''
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </span>
        ))}
      </div>



      {/* Main Content */}
      {activeTab === "Overview" &&
        <div className="">
          <h1 className="text-2xl w-2xl font-bold mb-4">Batch Details</h1>
          {
            Object.keys(batchdata).length > 0 ? (
              <div className="bg-white  p-6 rounded-lg shadow-md w-full">
                <h2 className="text-xl font-semibold mb-2">{batchdata.Batchname}</h2>
                <p className="text-gray-600 mb-4">Batch Code :{batchdata._id}</p>
              </div>
            ) : (
              <p className="text-gray-600">No batch details available.</p>
            )}
        </div>}

      {activeTab === "Live classes" &&
        <>
       <div className="">
         {
          filter.length === 0 ? (
        <p>No videos uploaded yet.</p>
      ) : (
        filter.map((vid, index) => (
          <div key={index} className="flex items-center content-center gap-5  p-5" style={{ marginBottom: "20px" }}>
            <video
              width="200"
              controls
              src={`https://classplut2.onrender.com/${vid.path}`}
              
              className="rounded-2xl w-80"
            />
            <h4 className="text-xl font-bold ps-5">{vid.title}</h4>
          </div>
        ))
      )
        }
       </div>
        </>
      }
    </div>
  );
}

export default Explor_batch_user;