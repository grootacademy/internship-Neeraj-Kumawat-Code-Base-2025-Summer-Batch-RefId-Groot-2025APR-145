import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import LiveClass from "../../courses/Components/liveclass/LiveClass";
import Live_ontents from "../../courses/Components/liveclass/Live_ontents";
import { RiLiveLine } from "react-icons/ri";
import { FaFileVideo } from "react-icons/fa6";
import AllLiveclasses from "./AllLiveclasses";
import { BsGear } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

function Explorbatches() {
  const location = useLocation();
  const batch = location.state || {}; // Batch data from navigate
  const [allUsers, setAllUsers] = useState([]);
  const [isLiveclass, setisLiveclass] = useState(false);
  const [iscontentopen, setiscontentopen] = useState(false)
  const [Contentleanth, setContentleanth] = useState()
  const [moreOptions, setMoreOptions] = useState(false)
  let go = useNavigate()
  const fetchVideos = async () => {
    let res = await fetch("https://classplut2.onrender.com/getlivevideos");
    let data = await res.json();
    if (data.status) {
      setContentleanth(data.vdata.length)
      // console.log(data.vdata)
    }
  };

  useEffect(() => {
    if (batch && Object.keys(batch).length > 0) {
      localStorage.setItem('BatchId', JSON.stringify(batch._id));

    }
  }, [batch]);

  useEffect(() => {
    axios.get("https://classplut2.onrender.com/getusers")
      .then((res) => {
        // console.log(res.data); // Optional: log to see what you get
        setAllUsers(res.data.data); // Update with actual key if different
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);
  // console.log(batch)

  let existuser = allUsers.filter((user) => batch.Users?.includes(user._id))

  let batchid = batch._id
  // console.log(batchid)
  let Deletbatch = () => {
    axios.post("https://classplut2.onrender.com/deletebatch", { batchid }).then((res) => {
      if (res.data.status) {
        alert(res.data.msg)
        setTimeout(() => {
          go(-1)
        }, 2000);
      } else {
        toast.error(res.data.msg)
      }
    })
      .catch(error => console.log(error))
  }

  let Editbatch = () => {
    go("/admin/edit_batch", { state: batch })
  }

  return (
    <div className="p-5 space-y-3">
      {/* live class */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow" onClick={() => { setiscontentopen(true) }}>
          <div className="flex content-center items-center">
            <h1 className='text-2xl w-12 h-12 rounded-full bg-blue-200 flex  content-center items-center justify-center'><FaFileVideo /></h1>
            <h2 className="text-xl font-semibold text-gray-700">Content</h2>
          </div>
          <p className="text-blue-600 text-2xl font-bold">
            {Contentleanth}<span className="text-sm font-normal text-gray-500">items</span>
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow cursor-pointer" onClick={() => setisLiveclass(true)}>
          <div className="flex content-center items-center">
            <h1 className='text-2xl w-12 h-12 rounded-full bg-blue-200 flex  content-center items-center justify-center'><RiLiveLine /></h1>
            <h2 className="text-xl font-semibold text-gray-700">Live Class</h2>
          </div>
          <button
            onClick={() => setisLiveclass(true)}
            className="text-blue-600 font-semibold underline mt-2"
          >
            Go Live
          </button>
        </div>
      </div>


      {/* Batch Info */}
      <div className="bg-white shadow-md rounded-lg p-5 mb-6 flex justify-between">
        <div className="space-y-5">
          <h1 className="text-2xl font-bold  text-blue-800">Batch: {batch?.Batchname}</h1>
        <p className="text-black font-semibold">Subject: {batch?.subject}</p>
        <p className="text-sm text-gray-400 font-bold">Batch ID: {batch?._id}</p>
        </div>
        <div className="text-center mt-4 relative">
          <button
            onClick={() => setMoreOptions(!moreOptions)}
            className="text-white font-medium bg-blue-500 px-4 py-5 rounded"
          >
             More Options
          </button>
          {moreOptions && (
            <div
              className="flex flex-col space-y-2  mt-3 items-start absolute bg-white px-5 pb-5 shadow" 
            >
              <h1 className="flex items-center gap-2 w-full hover:bg-gray-100 rounded p-2 shadow shadow-emerald-500 " onClick={Deletbatch}><MdDelete />Delete</h1>
              <h1 className="flex items-center gap-2 w-full hover:bg-gray-100 rounded p-2 shadow shadow-emerald-500" onClick={Editbatch}><FaEdit />Edit</h1>
              <h1 className="flex items-center gap-2 w-full hover:bg-gray-100 rounded p-2 shadow shadow-emerald-500"><BsGear /> Settings</h1>
            </div>
          )}
        </div>
      </div>

      {/* Matching Students */}
      <div className="bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-xl p-6 space-y-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-black">Students in this Batch</h2>

        {existuser.length > 0 ? (
          <ul className="space-y-3 ">
            {existuser.map((user, index) => (
              <li
                key={index}
                className="bg-white border w-full max-w-96 border-blue-100 rounded-md p-3 shadow-sm flex flex-col  justify-between hover:shadow-md transition"
              >
                <span className="text-blue-700 font-medium">Name:{user.username}</span>
                <span className="text-blue-700 font-medium">{user.email}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No students yet. Add some!</p>
        )}

        <button
          onClick={() => go("/admin/Addstudentsinbatch", { state: { batchs: batch } })}
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg transition duration-200 shadow-md"
        >
          Add More Students
        </button>
      </div>




      {isLiveclass && <LiveClass Liveclass_Id={batch._id} onClick={() => setisLiveclass(false)} />}
      {
        iscontentopen &&
        <>
          <div className=" absolute top-14">

            <AllLiveclasses isOpen={open} batchId={batch._id} onClick={() => setiscontentopen(false)} />

          </div>
        </>
      }
    </div>

  );
}

export default Explorbatches;
