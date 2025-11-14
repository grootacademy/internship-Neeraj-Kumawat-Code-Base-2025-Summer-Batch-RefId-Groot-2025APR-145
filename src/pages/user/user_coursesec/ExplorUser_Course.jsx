import React, { useEffect, useState } from 'react';
import { FaFolderClosed, FaFolderOpen } from 'react-icons/fa6';
import { GrFormPreviousLink } from 'react-icons/gr';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ExplorUser_Course() {
    const navigate = useNavigate();

    const [Contentleanth, setContentleanth] = useState();
    const [locationdata, setlocationdata] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState([]);
    const [togglefolder, settogglefolder] = useState(false);

    const location = useLocation();
    const Coursedata = location.state || [];

    // const fetchVideos = async () => {
    //     let res = await fetch("http://localhost:5000/getlivevideos");
    //     let data = await res.json();
    //     if (data.status) {
    //         setContentleanth(data.vdata.length);
    //     }
    // };
    let amount = Coursedata.CruntPrice - Coursedata.Discountrice
    let incgst = (amount * 18) / 100
    let totleamountprice = amount + incgst

    useEffect(() => {
        if (Coursedata && Object.keys(Coursedata).length > 0) {
            localStorage.setItem('CourseId', JSON.stringify(Coursedata._id));
        }
    }, [Coursedata]);

    useEffect(() => {
        // fetchVideos();
        setlocationdata([Coursedata]);
    }, []);

    const explordatas = locationdata.flatMap(e => e.foldersdata || []);
    const videos = selectedFolder?.videos || [];
    const livevideos = selectedFolder?.liveVideo || [];

    const handleBuyNow = () => {
        navigate("/user/checkout", { state: Coursedata });
    };



    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

            {/* ====== Sidebar Menu (mocked) ====== */}
            <aside className="w-full lg:w-64 bg-white border-r  flex-col">
                <div className="p-4  text-blue-600 bg-blue-50 font-medium border-l-4 border-blue-500 ">Overview</div>
                <div className="p-4 cursor-pointer" onClick={() => navigate("/user/ExplorCourse/content", { state: Coursedata })
                }>Content</div>
            </aside>
            <main className="w-full  space-y-8">
                {/* Batch Info */}
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
                        <div>
                            <span className="font-semibold text-gray-600">Course Description:</span> {Coursedata.Description}
                        </div>
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


                {/* Folder List */}
                {/* {explordatas.map((folder, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-white rounded-xl shadow cursor-pointer"
                        onClick={() => {
                            setSelectedFolder(folder);
                            settogglefolder(true);
                            toast.error("📂 First you need to buy the course");
                        }}
                    >
                        <div className="text-4xl text-blue-500">
                            {togglefolder ? <FaFolderOpen /> : <FaFolderClosed />}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{folder.data}</h3>
                            <p className="text-sm text-gray-500">{folder.info || "No description"}</p>
                        </div>
                    </div>
                ))} */}

                {/* Videos */}



                {/* Videos
                {togglefolder && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">📁 {selectedFolder.data} - Videos</h3>
                            {videos.length > 0 ? (
                                videos.map((vdi, index) => (
                                    <video key={index} className="w-full max-w-4xl mx-auto rounded-lg" controls src={vdi.path}></video>
                                ))
                            ) : (
                                <p className="text-gray-500">No Videos Found</p>
                            )}
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">🔴 Live Classes</h3>
                            {livevideos.length > 0 ? (
                                livevideos.map((lv, index) => (
                                    <video key={index} className="w-full max-w-4xl mx-auto rounded-lg" controls src={lv.path}></video>
                                ))
                            ) : (
                                <p className="text-gray-500">No Live Videos Found</p>
                            )}
                        </div>
                    </div>
                )} */}

                {/* Back Button */}
                <div className="flex justify-start">
                    <button
                        className="flex items-center gap-2 border border-blue-500 text-blue-500 rounded-xl py-2 px-4 hover:bg-blue-50"
                        onClick={() => navigate("/")}
                    >
                        <GrFormPreviousLink /> Previous
                    </button>
                </div>
            </main>



            <aside className="w-full lg:w-80 bg-white border-l p-6 space-y-6">
                <div className="text-sm">
                    <p className="text-gray-600 font-medium mb-1">Have doubts regarding this course?</p>
                    <button className="text-blue-600 text-sm underline hover:text-blue-800">Talk to Tutor</button>
                </div>

                <div className="text-sm">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-600">Select State</span>
                        <span className="text-blue-600 text-xs cursor-pointer">CHANGE</span>
                    </div>
                    <p className="text-gray-700 font-medium">Purchasing in Rajasthan</p>
                </div>

                <div className="text-sm">
                    <p className="text-gray-600 font-medium mb-1">Coupon Code</p>
                    <button className="text-blue-600 text-sm underline hover:text-blue-800">View All</button>
                </div>

                {/* ===== Price Details ===== */}
                <div className="text-sm space-y-2">
                    <h3 className="font-semibold text-gray-700">PRICE DETAILS</h3>
                    {/* <div className="flex justify-between"><span>Internet Handling</span><span>₹ 41</span></div> */}
                    {/* <div className="flex justify-between"><span>Amount Payable</span><span>₹ 1,551</span></div> */}
                    <div className="flex justify-between"><span>Course Price</span><span>₹ {Coursedata.CruntPrice}-{Coursedata.Discountrice}={amount}</span></div>
                    <div className="flex justify-between"><span>G.S.T. (18%)</span><span>+ ₹ {incgst}</span></div>
                    {/* <div className="flex justify-between"><span>Discount</span><span>- ₹ {data.Discountrice}</span></div> */}
                    <div className="flex justify-between"><span>Platform Fee</span><span>+ ₹ 10</span></div>
                    <div className="flex justify-between"><span>Totle Fees</span><span>{totleamountprice + 10}</span></div>

                </div>

                {/* ===== Buy Now Button ===== */}
                <button
                    onClick={handleBuyNow}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                >
                     Buy Now
                </button>

                <p className="text-xs text-gray-400">
                    * Amount payable is inclusive of taxes. <br />
                    <span className="underline">Terms & Conditions apply</span>
                </p>

                <ToastContainer />
            </aside>
        </div>
    );
}

export default ExplorUser_Course;
