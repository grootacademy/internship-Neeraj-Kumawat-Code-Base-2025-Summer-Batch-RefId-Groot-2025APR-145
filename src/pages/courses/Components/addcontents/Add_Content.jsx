import React, { useEffect, useState } from 'react'
import { FaFileAlt, FaFileArchive, FaFileImage, FaFolder, FaVideo } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineAssignment, MdOutlineContentPaste } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";
import { BsBroadcast } from "react-icons/bs";
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { useLocation, useNavigate } from 'react-router-dom';
import AddFolderModal from './sub-component/AddFolder';
import AddC_Videofolder from './sub-component/AddC_Videofolder';
import AddC_onlinetest from './sub-component/AddC_onlinetest';
import AddC_subjectivetest from './sub-component/AddC_subjectivetest';
import AddC_Document from './sub-component/Addc_Document';
import AddC_Images from './sub-component/Addc_Image';
import Addc_Zipfile from './sub-component/Addc_Zipfile';
import Addc_Importliveclass from './sub-component/Addc_Importliveclass';
import Addc_ImportContent from './sub-component/Addc_ImportContent';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { IoMdArrowRoundDown } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Add_Content() {
    const [videoSrc, setVideoSrc] = useState(null);
    const [addFolder, setAddFolder] = useState(false);
    const [addVideo, setAddVideo] = useState(false);
    const [addOnlineTest, setAddOnlineTest] = useState(false);
    const [addSubjectiveTest, setAddSubjectiveTest] = useState(false);
    const [addDocument, setAddDocument] = useState(false);
    const [addImage, setAddImage] = useState(false);
    const [addZip, setAddZip] = useState(false);
    const [addImportContent, setAddImportContent] = useState(false);
    const [addImportLive, setAddImportLive] = useState(false);
    const [openFolderIndex, setOpenFolderIndex] = useState(null);
    let go = useNavigate()
    let useselector = useSelector(state => state.Folders)
    let location = useLocation()


    // joindata -----------------------------
    const [joindata, setjoindata] = useState()
    useEffect(() => {

        setjoindata({
            ...location.state,
            foldersdata: useselector
        })


    }, [location.state, useselector])

    // console.log(joindata)

    let getdata = JSON.parse(localStorage.getItem("reduxState"));
    let concket = getdata ? getdata.Folders : [];

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // console.log(file)
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setVideoSrc(fileURL);
        }
    };

    const steps = [
        { id: 1, name: "Basic Information", status: "complete" },
        { id: 2, name: "Edit Price", status: "complete" },
        { id: 3, name: "Add Content", status: "current" },
        { id: 4, name: "Bundle (Optional)", status: "upcoming" },
    ];

    let filterdata;
    let filtervideos = [];
    let filtervliveideos = [];

    if (openFolderIndex !== null) {
        filterdata = useselector.find(
            (item) => item.id === concket[openFolderIndex].id
        );

        if (filterdata && filterdata.videos) {
            filtervideos = filterdata.videos;
        } else {
            toast.error("No videos found in the selected data.");
        }

        if (filterdata && filterdata.liveVideo) {
            filtervliveideos = filterdata.liveVideo;
        } else {
            toast.error("No videos found in the selected data.");
        }
    } else {
    }

    let Submitdata = () => {
        const formData = new FormData();

        // Append image
        formData.append("image", joindata.image);

        // Append each field
        for (let key in joindata) {
            if (key !== "image") {
                const value = joindata[key];

                // If it's object or array, stringify it
                if (typeof value === "object" && value !== null) {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, value);
                }
            }
        }

        if (!getdata) {
            toast.error("Select Folder.");
        } else {
            axios.post("https://classplut2.onrender.com/course", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
                .then((res) => {
                    if (res.status === 201) {
                        localStorage.removeItem("reduxState");
                        go("/admin/courses")
                        window.location.reload();
                    }
                })
                .catch((error) => console.log(error));

            toast.success("Course Added");
        }
    };



    let UnSubmitdata = () => {
        if (openFolderIndex === null) {
            toast.error("Select Folder.")
        } else {
            toast.error("404  Prossesing")
        }

    }

    return (
        <div className='p-4'>
            <ToastContainer />
            <div className="w-full rounded-2xl flex flex-wrap gap-y-5 items-center justify-between px-10 py-4 bg-white ">
                {steps.map((step, stepIdx) => (
                    <div key={step.id} className="flex-1 flex items-center">

                        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold ${step.status === "complete" ? "bg-blue-500" : step.status === "current" ? "bg-blue-300" : "bg-gray-300"} `}>
                            {step.status === "complete" ? "✓" : step.id}
                        </div>


                        <div className="ml-2 text-sm font-medium whitespace-nowrap">
                            {step.name}
                        </div>

                        {/* Line */}

                        <div className={`flex-1 h-[2px] mx-2  ${step.status === "complete" ? "bg-blue-500" : "bg-gray-300"}`}></div>

                    </div>
                ))}
            </div>

            <div className=" py-5 flex flex-col md:flex-row justify-between gap-2 ">

                <div className="w-full bg-white  p-3 rounded-2xl ">
                    {openFolderIndex === null ? (
                        concket.length > 0 ?

                            concket.map((item, index) => {
                                return (
                                    <div className="flex items-center gap-2 cursor-pointer " key={index} onClick={() => [setOpenFolderIndex(index)]}>
                                        <h1 className='text-7xl text-blue-500'><FaFolder /></h1>
                                        <div>
                                            <h1 className='text-2xl font-bold'>{item.data}</h1>
                                            <p className='text-gray-500'>{item.info}</p>

                                        </div>
                                    </div>
                                )
                            })
                            :
                            <>
                                <h1 className='text-4xl font-semibold text-center py-40 hover:text-blue-500 hover:underline cursor-pointer' onClick={() => setAddFolder(true)} >Add Folder</h1>

                            </>
                    ) : (
                        // Show only the selected folder
                        <div className="border-b py-5">
                            {/* Folder Header */}
                            <div
                                className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-3 rounded transition"
                                onClick={() => setOpenFolderIndex(null)}
                            >
                                <h1 className="text-6xl text-blue-500">
                                    <FaFolder />
                                </h1>
                                <div>
                                    <h1 className="text-2xl font-bold">{concket[openFolderIndex]?.data}</h1>
                                    <p className="text-gray-500 text-sm">{concket[openFolderIndex]?.info}</p>
                                </div>
                            </div>

                            {/* Add Content Section */}
                            <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-sm">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                    Add Content to: <span className="text-blue-600">{concket[openFolderIndex]?.data}</span>
                                </h2>

                                {/* Selected Videos */}
                                <div className="space-y-4">
                                    {filtervideos.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold text-lg underline mb-2 text-gray-700">Selected Videos</h3>
                                            {filtervideos.map((item, index) => (
                                                <div className="mb-3 border-b border-dashed pb-2" key={index}>
                                                    <video className="w-40 rounded" controls src={item.path} />
                                                    <p className="text-sm font-medium mt-1">{item.title}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Live Videos */}
                                    <div>
                                        <h3 className="font-semibold text-lg underline mb-2 text-gray-700">Selected Live Videos</h3>
                                        {filtervliveideos.length > 0 ? (
                                            filtervliveideos.map((item, index) => (
                                                <div className="mb-3 border-b border-dashed pb-2" key={index}>
                                                    <video className="w-40 rounded" controls src={item.path} />
                                                    <p className="text-sm font-medium mt-1">{item.title}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-red-500 italic">No selected live videos.</p>
                                        )}
                                    </div>

                                    {/* Back Button */}
                                    <button
                                        className="mt-6 inline-block text-sm text-red-600 hover:underline"
                                        onClick={() => setOpenFolderIndex(null)}
                                    >
                                        ← Back to All Folders
                                    </button>
                                </div>
                            </div>
                        </div>

                    )}



                </div>


                <div className="right bg-white p-3 w-full md:w-64 rounded-2xl">
                    <h1 className="text-2xl font-bold">Add Content</h1>

                    <div className="p-4 space-y-3 text-blue-500">
                        <div
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => setAddFolder(true)}
                        >
                            <FaFolder /> <span className="text-black font-semibold">Folder</span>
                        </div>

                        <div
                            className="cursor-pointer flex items-center space-x-2"
                            onClick={() => setAddVideo(true)}
                        >
                            <FaVideo /> <span className="text-black font-semibold">Video</span>
                        </div>

                        <div
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => setAddOnlineTest(true)}
                        >
                            <MdOutlineAssignment />{" "}
                            <span className="text-black font-semibold">Online Test</span>
                        </div>

                        <div
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => setAddSubjectiveTest(true)}
                        >
                            <AiOutlineFileText />{" "}
                            <span className="text-black font-semibold">Subjective Test</span>
                        </div>

                        <div
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => setAddDocument(true)}
                        >
                            <FaFileAlt />{" "}
                            <span className="text-black font-semibold">Document</span>
                        </div>

                        <div
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => setAddImage(true)}
                        >
                            <FaFileImage /> <span className="text-black font-semibold">Image</span>
                        </div>

                        <div
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => setAddZip(true)}
                        >
                            <FaFileArchive />{" "}
                            <span className="text-black font-semibold">Zip File</span>
                        </div>

                        <div
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => setAddImportContent(true)}
                        >
                            <MdOutlineContentPaste />{" "}
                            <span className="text-black font-semibold">Import Content</span>
                        </div>

                        <div
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => setAddImportLive(true)}
                        >
                            <BsBroadcast />{" "}
                            <span className="text-black font-semibold">Import Live</span>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex justify-between flex-wrap bg-white p-5 rounded-2xl shadow-lg  relative bottom-0">

                <button className='text-[#7C86FF] flex items-center content-center border border-[#7C86FF] text-lg font-bold py-3 px-6 rounded-2xl  transition-colors duration-300' onClick={() => { go("/admin/AddcoursePrice") }}>
                    <GrFormPreviousLink fontSize={30} /> Previous
                </button>

                <div className="flex gap-2 flex-wrap">
                    <button className='text-[#7C86FF] flex items-center content-center border border-[#7C86FF] text-lg font-bold py-3 px-6 rounded-2xl  transition-colors duration-300' onClick={UnSubmitdata}>
                        Un-Publish<IoMdArrowRoundDown fontSize={30} />
                    </button>
                    <button className='text-[#7C86FF] flex items-center content-center border border-[#7C86FF] text-lg font-bold py-3 px-6 rounded-2xl  transition-colors duration-300' onClick={Submitdata}>
                        Publish<GrFormNextLink fontSize={30} />
                    </button>
                </div>
            </div>

            {
                addFolder &&
                <>
                    <div className=" absolute top-14">

                        <AddFolderModal isOpen={open} onClick={() => setAddFolder(false)} />

                    </div>
                </>
            }
            {
                addVideo &&
                <div className=" absolute top-14">
                    <AddC_Videofolder
                        isOpen={open}
                        onClick={() => setAddVideo(false)}
                        folderId={concket[openFolderIndex]?.id}
                    />
                </div>
            }

            {
                addOnlineTest &&
                <>
                    <div className=" absolute top-14">

                        <AddC_onlinetest isOpen={open} onClick={() => setAddOnlineTest(false)} />

                    </div>
                </>
            }
            {addSubjectiveTest &&
                <>
                    <div className=" absolute top-14  ">

                        <AddC_subjectivetest isOpen={open} onClick={() => setAddSubjectiveTest(false)} />
                    </div>

                </>
            }

            {
                addDocument &&
                <div className=" absolute top-14  ">
                    <AddC_Document isOpen={open} onClick={() => setAddDocument(false)} />
                </div>
            }

            {
                addImage &&
                <div className=" absolute top-14  ">
                    <AddC_Images isOpen={open} onClick={() => setAddImage(false)} />
                </div>
            }
            {
                addZip &&
                <div className=" absolute top-20  ">
                    <Addc_Zipfile isOpen={open} onClick={() => setAddZip(false)} />
                </div>
            }
            {
                addImportLive &&
                <div className=" absolute top-14  ">
                    <Addc_Importliveclass isOpen={open} onClick={() => setAddImportLive(false)} folderId={concket[openFolderIndex]?.id} />
                </div>
            }
            {
                addImportContent &&
                <div className=" absolute top-14  ">
                    <Addc_ImportContent isOpen={open} onClick={() => setAddImportContent(false)} />
                </div>
            }

        </div>
    )
}

export default Add_Content
