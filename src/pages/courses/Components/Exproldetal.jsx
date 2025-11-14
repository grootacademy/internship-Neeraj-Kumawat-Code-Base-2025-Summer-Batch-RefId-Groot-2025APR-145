import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsPerson, BsCurrencyRupee, BsGear } from 'react-icons/bs';
import { GrFormPreviousLink } from "react-icons/gr";
import LiveClass from './liveclass/LiveClass';
import Live_ontents from './liveclass/Live_ontents';
import { FaEdit, FaFileVideo, FaFolder, FaFolderOpen } from "react-icons/fa";
import { RiLiveLine } from "react-icons/ri";
import { PiStudentFill } from "react-icons/pi";
import { FaFolderClosed, FaRegNoteSticky } from "react-icons/fa6";
import { MdAssignmentInd, MdDelete } from "react-icons/md";
import { MdOutlineBorderColor } from "react-icons/md";
import AddStudents from '../../batches/component/creatbatch/Addstudents';
import AssStudentincourse from './AssStudentincourse';
import Student from './studentssec/Student';
import axios from 'axios';

function Exproldetal() {
    const navigate = useNavigate();

    const [isLiveclass, setisLiveclass] = useState(false);
    const [iscontentopen, setiscontentopen] = useState(false)
    const [moreOptions, setMoreOptions] = useState(false);
    const [isstudentadd, setisstudentadd] = useState(false)
    const [Contentleanth, setContentleanth] = useState()
    const [locationdata, setlocationdata] = useState([])
    const [selectedFolder, setSelectedFolder] = useState([])
    const [togglefolder, settogglefolder] = useState(false)

    let location = useLocation()
    let Coursedata = location.state || []

    const fetchVideos = async () => {
        let res = await fetch("http://localhost:5000/getlivevideos");
        let data = await res.json();
        if (data.status) {
            setContentleanth(data.vdata.length)
            // console.log(data.vdata)
        }
    };

    useEffect(() => {
        if (Coursedata && Object.keys(Coursedata).length > 0) {
            localStorage.setItem('CourseId', JSON.stringify(Coursedata._id));

        }
    }, [Coursedata]);


    useEffect(() => {
        fetchVideos()
        setlocationdata([Coursedata])

    }, [])

    const Alllinks = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, staggerChildren: 0.2 }
        }
    };

    const explordatas = locationdata.flatMap(e => e.foldersdata || []);
    const videos = explordatas.flatMap(e => e.videos || []);
    const livevideos = explordatas.flatMap(e => e.liveVideo || []);




    let Deletcourse = () => {
        axios.post("http://localhost:5000/deletecourse", { id: Coursedata._id })
            .then((res) => {
                if (res.data.status) {
                    alert(res.data.msg)
                    navigate("/admin/courses")
                } else {
                    alert("Error in Deleting Course")
                }
            })
    }

    let EditCourse = () => {
        navigate("/admin/Editcourse", { state: location.state })
    }

    // Create a copy of explordatas and add "Content" folder if not present
    const updatedFolders = React.useMemo(() => {
        if (!explordatas) return [];

        const contentExists = explordatas.some(folder => folder.data === "Content");
        if (!contentExists) {
            return [
                ...explordatas,
                { data: "Content", info: "Videos folder", liveVideo: { videos: [] } } // add any other default fields if needed
            ];
        }
        return explordatas;
    }, [explordatas]);



    return (
        <div className="p-6  min-h-screen space-y-8">

            {/* Top Section: Main Info + Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left: Main Content Info (spans 2 columns on large) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Top: Two Cards */}
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

                    {/* Middle: Batch Info */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                        <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
                            🎓 Course Overview
                        </h2>

                        {/* Course Name */}
                        <p className="text-lg font-medium text-indigo-600">
                            <span className="font-semibold text-gray-700">Batch Name:</span> {Coursedata.Coursename}
                        </p>

                        {/* Course Image */}
                        <img
                            className="w-full max-w-2xl rounded-xl border border-gray-200"
                            src={`http://localhost:5000/${Coursedata.imagePath}`}
                            alt="Course Banner"
                        />

                        {/* Grid Data */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-800">
                            <div>
                                <span className="font-semibold text-gray-600">Batch Code:</span> cidrwgol
                            </div>
                            <div>
                                <span className="font-semibold text-gray-600">Subject:</span> TEST
                            </div>
                            <div>
                                <span className="font-semibold text-gray-600">Students Enrolled:</span>
                                <span className="text-blue-600 cursor-pointer ml-1 underline">View all</span> (3)
                            </div>
                            <div>
                                <span className="font-semibold text-gray-600">Tests Added:</span>
                                <span className="text-blue-600 cursor-pointer ml-1 underline">View all</span> (19)
                            </div>
                            <div>
                                <span className="font-semibold text-gray-600">Join Requests:</span> No Requests
                            </div>
                        </div>
                            <div>
                                <span className="font-semibold text-gray-600">Course Description:</span> {Coursedata.Description}
                            </div>

                        {/* Extra Course Info */}
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                            <div>
                                <span className="font-semibold">Category:</span> {Coursedata.Category}
                            </div>
                            <div>
                                <span className="font-semibold">Sub-Category:</span> {Coursedata.SubCategory}
                            </div>
                            <div>
                                <span className="font-semibold">Course Type:</span> {Coursedata.CourseType}
                            </div>
                            <div>
                                <span className="font-semibold">Course Duration:</span> {Coursedata.Course_Duration} {Coursedata.Duration_Type}
                            </div>
                            <div>
                                <span className="font-semibold">Price:</span> ₹{Coursedata.CruntPrice}
                            </div>
                            <div>
                                <span className="font-semibold">Discount Price:</span> ₹{Coursedata.Discountrice}
                            </div>
                            <div>
                                <span className="font-semibold">Effective Price:</span> ₹{Coursedata.Effectiveprice}
                            </div>
                        </div>
                    </div>



                    {/* folders --------------------------------------------------------- */}
                    <div
                        className="flex items-center gap-2 cursor-pointer border-b pb-2 mb-4 "
                        onClick={() => {
                            settogglefolder(!togglefolder)
                        }}
                    >
                        <h1 className="text-7xl text-blue-500">{togglefolder ? < FaFolderOpen /> : <FaFolderClosed />}</h1>
                        <div>
                            <h1 className="text-2xl font-bold">Contents</h1>
                            <p className="text-gray-500">Contents go here</p>
                        </div>
                    </div>



                    {togglefolder && (
                        updatedFolders.length > 0 ? (
                            updatedFolders.map((folder, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 cursor-pointer border-b pb-2 mb-4"
                                    onClick={() => {
                                        setSelectedFolder(folder);
                                        navigate("/admin/ExploreVideos", {
                                            state: { courseData: Coursedata, selectedFolder: folder }
                                        });
                                    }}
                                >
                                    <h1 className="text-7xl text-blue-500">
                                        {selectedFolder?.data === folder.data ? <FaFolderOpen /> : <FaFolderClosed />}
                                    </h1>
                                    <div>
                                        <h1 className="text-2xl font-bold">{folder.data}</h1>
                                        <p className="text-gray-500">{folder.info || "No description"}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-red-500 mt-10">No Folders Available</p>
                        )
                    )}




                </div>

                {/* Right: Sidebar Options */}
                <div className="bg-white p-6 rounded-xl shadow w-full">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4">
                        <div className="p-4 border rounded-lg h-24 " onClick={() => { setisstudentadd(true) }}>
                            <div className="flex content-center items-center">
                                <h1 className='text-2xl w-12 h-12 rounded-full bg-blue-200 flex  content-center items-center justify-center'><PiStudentFill /></h1>
                                <h3 className="font-semibold">Add Students</h3>
                            </div>

                        </div>
                        <div className="p-4 border rounded-lg h-24 flex flex-col justify-between">
                            <div className="flex content-center items-center">
                                <h1 className='text-2xl w-12 h-12 rounded-full bg-blue-200 flex  content-center items-center justify-center'><FaRegNoteSticky /></h1>
                                <h3 className="font-semibold">Test</h3>
                            </div>
                            <p className="text-sm text-gray-500">5 Tests</p>
                        </div>
                        <div className="p-4 border rounded-lg h-24 flex flex-col justify-between">
                            <div className="flex content-center items-center">
                                <h1 className='text-2xl w-12 h-12 rounded-full bg-blue-200 flex  content-center items-center justify-center'>C</h1>
                                <h3 className="font-semibold">Offline Classes</h3>
                            </div>
                            <p className="text-sm text-gray-500">Create Class</p>
                        </div>
                        <div className="p-4 border rounded-lg h-24 flex flex-col justify-between">
                            <div className="flex content-center items-center">
                                <h1 className='text-2xl w-12 h-12 rounded-full bg-blue-200 flex  content-center items-center justify-center'><MdAssignmentInd /></h1>
                                <h3 className="font-semibold">Assignment</h3>
                            </div>
                            <p className="text-sm text-gray-500">Create assignment</p>
                        </div>
                        <div className="p-4 border rounded-lg h-24 flex flex-col justify-between">
                            <div className="flex content-center items-center">
                                <h1 className='text-2xl w-12 h-12 rounded-full bg-blue-200 flex  content-center items-center justify-center'><MdOutlineBorderColor /></h1>
                                <h3 className="font-semibold">Notice Board</h3>
                            </div>
                            <p className="text-sm text-gray-500">1 Notices</p>
                        </div>
                    </div>

                    {/* More Options */}
                    <div className="text-center mt-4">
                        <button
                            onClick={() => setMoreOptions(!moreOptions)}
                            className="text-blue-600 font-medium"
                        >
                            ... More Options
                        </button>
                        {moreOptions && (
                            <motion.div
                                className="flex flex-col space-y-2  mt-3 items-start"
                                variants={Alllinks}
                                initial="hidden"
                                animate="visible"
                            >
                                <h1 className="flex items-center gap-2 w-full hover:bg-gray-100 rounded p-2" onClick={Deletcourse}><MdDelete />Delete</h1>
                                <h1 className="flex items-center gap-2 w-full hover:bg-gray-100 rounded p-2" onClick={EditCourse}><FaEdit />Edit</h1>
                                <h1 className="flex items-center gap-2 w-full hover:bg-gray-100 rounded p-2"><BsGear /> Settings</h1>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex justify-start">
                <button
                    className="flex items-center gap-2 border border-blue-500 text-blue-500 rounded-xl py-2 px-4"
                    onClick={() => navigate("/admin/courses")}
                >
                    <GrFormPreviousLink /> Previous
                </button>
            </div>

            {/* Live Class Modal */}
            {isLiveclass && <LiveClass CourseId={Coursedata._id} onClick={() => setisLiveclass(false)} />}
            {
                iscontentopen &&
                <>
                    <div className=" absolute top-14">

                        <Live_ontents isOpen={open} onClick={() => setiscontentopen(false)} />

                    </div>
                </>
            }
            {
                isstudentadd &&
                <>
                    <div className=" absolute top-14">

                        <Student isOpen={open} onClick={() => setisstudentadd(false)} />

                    </div>
                </>
            }
        </div>

    );
}

export default Exproldetal;
