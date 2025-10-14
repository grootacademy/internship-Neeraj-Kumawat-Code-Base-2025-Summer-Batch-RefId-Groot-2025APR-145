import React, { useEffect, useState } from 'react';
import { FaFolderClosed } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ExplorUser_Course_Contant() {
    const navigate = useNavigate();
    const location = useLocation();
    const Coursedata = location.state || {};

    const [Contentleanth, setContentleanth] = useState();
    const [locationdata, setlocationdata] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [togglefolder, settogglefolder] = useState(false);

    useEffect(() => {
        if (Coursedata && Object.keys(Coursedata).length > 0) {
            localStorage.setItem('CourseId', JSON.stringify(Coursedata._id));
        }
    }, [Coursedata]);

    useEffect(() => {
        fetch("https://classplut2.onrender.com/getlivevideos")
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    setContentleanth(data.vdata.length);
                }
            });
        setlocationdata([Coursedata]);
    }, []);

    const explordatas = locationdata.flatMap(e => e.foldersdata || []);
    console.log(explordatas)
    const handleBuyNow = () => {
        navigate("/user/checkout", { state: Coursedata });
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

            {/* ====== Sidebar Menu (mocked) ====== */}
            <aside className="w-full lg:w-64 bg-white  flex-col">
                <div className="p-4 font-bold text-lg border-b cursor-pointer" onClick={() => navigate("/user/ExplorCourse", { state: Coursedata })}>Overview</div>
                <div className="p-4 text-blue-600 bg-blue-50 font-medium border-l-4 border-blue-500" >Content</div>
            </aside>

            {/* ====== Main Content ====== */}
            <main className="flex-1 p-6 space-y-6">

                {/* Course Title */}
                <h2 className="text-2xl font-bold text-gray-800 uppercase">{Coursedata.Coursename}</h2>

                {/* Folder List Box */}
                <div className="bg-white rounded-lg p-6 shadow space-y-4">
                    {explordatas.map((folder, index) => (
                        <div key={index} className="border-b pb-4 last:border-none">
                            <div
                                onClick={() => {
                                    settogglefolder(true);
                                    setSelectedFolder(folder);
                                    toast.error("📂 First you need to buy the course");
                                }}
                                className="flex items-center gap-4 cursor-pointer"
                            >
                                <div className="text-4xl text-blue-500">
                                    <FaFolderClosed />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-lg text-gray-700">{folder.data}</span>
                                    <span className="text-sm text-gray-500">{folder.filesCount || "0 file(s)"}</span>
                                </div>
                            </div>

                            {/* LIVE VIDEOS */}
                            {folder.liveVideo && folder.liveVideo.length > 0 && (
                                <div className="ml-10 mt-2 space-y-1">
                                    <p className="text-sm font-medium text-green-600">Live Videos</p>
                                    {folder.liveVideo.map((live, idx) => (
                                        <div
                                    key={idx}
                                    className="flex items-center justify-between px-3 py-1 rounded bg-gray-50 border text-sm text-gray-600"
                                >
                                    <div className="flex gap-4">
                                        <video
                                            src={live.path}
                                            
                                            className="max-w-[180px] max-h-[100px] rounded"
                                            ></video>
                                            <span className='text-xl font-semibold'>{live.title}</span>
                                    </div>
                                    <span className="text-red-500 font-semibold">🔒 Locked</span>
                                </div>

                            ))}
                        </div>
                    )}

                    {/* RECORDED VIDEOS */}
                    {folder.videos && folder.videos.length > 0 && (
                        <div className="ml-10 mt-2 space-y-1">
                            <p className="text-sm font-medium text-purple-600">Recorded Videos</p>
                            {folder.videos.map((video, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between px-3 py-1 rounded bg-gray-50 border text-sm text-gray-600 "
                                >
                                    <div className="flex flex-col">
                                        <span>{video.title}</span>
                                        <video
                                            src={video.path}
                                           
                                            className="max-w-[180px] max-h-[100px] rounded disabled cursor-not-allowed"
                                        ></video>
                                    </div>
                                    <span className="text-red-500 font-semibold">🔒 Locked</span>
                                </div>

                            ))}
                        </div>
                    )}
                </div>
                    ))}

        </div>
            </main >

        {/* ====== Sidebar Right ====== */ }
        < aside className = "w-full lg:w-80 bg-white border-l p-6 space-y-6" >
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

    {/* ===== Price Details ===== */ }
    <div className="text-sm space-y-2">
        <h3 className="font-semibold text-gray-700">PRICE DETAILS</h3>
        <div className="flex justify-between"><span>Internet Handling</span><span>₹ 41</span></div>
        <div className="flex justify-between"><span>Amount Payable</span><span>₹ 1,551</span></div>
        <div className="flex justify-between"><span>Course Price</span><span>₹ {Coursedata.CruntPrice}</span></div>
        <div className="flex justify-between"><span>G.S.T. (18%)</span><span>+ ₹ {Math.round((Coursedata.CruntPrice || 0) * 0.18)}</span></div>
        <div className="flex justify-between"><span>Discount</span><span>- ₹ {Coursedata.Discountrice}</span></div>
        <div className="flex justify-between"><span>Platform Fee</span><span>+ ₹ 10</span></div>
    </div>

    {/* ===== Buy Now Button ===== */ }
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
            </aside >
        </div >
    );
}

export default ExplorUser_Course_Contant;
