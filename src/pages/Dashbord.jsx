import React from 'react';
import { FaChevronRight, FaArrowRight } from "react-icons/fa";
import { IoLayersSharp } from "react-icons/io5";
import { FiShare2 } from "react-icons/fi";
import { FaImage, FaRegNoteSticky } from "react-icons/fa6";
import { MdOutlineContentCopy, MdOutlineContactPage, MdOutlineCampaign } from "react-icons/md";
import { TbDeviceMobileDown } from "react-icons/tb";
import { GrAnnounce } from "react-icons/gr";
import { LiaDiscourse } from "react-icons/lia";
import { Link } from 'react-router-dom';

function Dashboard() {

    const offering = [
        // {
        //     icon: <LiaDiscourse />,
        //     offername: "Your App",
        //     usageDetails: "30 students",
        //     title: "Easily create a course and sell online",
        //     landingpage: "Create Course",
        // },
        {
            icon: <MdOutlineContactPage />,
            offername: "Landing Page",
            usageDetails: "No landing pages",
            title: "Easily create a course and sell online",
            landingpage: "Create Landing Page",
        },
        {
            icon: <FaRegNoteSticky />,
            offername: "Test Portal",
            usageDetails: "307 Tests Created",
            title: "Easily create a course and sell online",
            landingpage: "Create Test Portal",
        },
        {
            icon: <MdOutlineCampaign />,
            offername: "Campaign",
            usageDetails: "No Campaign created",
            title: "Easily create a course and sell online",
            landingpage: "Create Campaign",
        },
    ];

    const services = [
        {
            icon: <IoLayersSharp />,
            title: "Create Website",
            tag: "Premium",
            tagColor: "orange",
            description: "Create your personalised website",
            rightIcon: <FaChevronRight />,
        },
        {
            icon: <TbDeviceMobileDown />,
            title: "Your App",
            tag: "",
            tagColor: "",
            description: "Share CopyLink",
            leftIcons: [<FiShare2 />, <MdOutlineContentCopy />],
            rightIcon: <FaChevronRight />,
        },
    ];

    const getTagColorClasses = (color) => {
        const map = {
            orange: "border-orange-400 text-orange-400",
            red: "border-red-400 text-red-400",
            blue: "border-blue-400 text-blue-400",
        };
        return map[color] || "";
    };

    return (
        <>
            <div className="flex flex-col xl:flex-row gap-5">
                <div className="w-full xl:w-3/4">
                    
                    <div className="p-5 flex flex-wrap gap-5 justify-center">
                        {services.map((item, i) => (
                            <div
                                key={i}
                                className="bg-white py-10 px-2 sm:px-5 flex justify-between gap-5 items-center w-full max-w-[390px] rounded-3xl"
                            >
                                <div className="flex gap-2">
                                    <div className="text-2xl text-blue-500 w-12 h-12 bg-blue-200 border flex items-center justify-center rounded-full">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h1 className="text-2xl font-bold text-blue-500">{item.title}</h1>
                                            {item.tag && (
                                                <span className={`border-2 py-1 px-3 font-bold rounded ${getTagColorClasses(item.tagColor)}`}>
                                                    {item.tag}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 flex items-center gap-1 flex-wrap">
                                            {item.leftIcons?.map((icon, idx) => (
                                                <span key={idx}>{icon}</span>
                                            ))}
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-blue-500 text-2xl">{item.rightIcon}</div>
                            </div>
                        ))}
                    </div>

                    <div className="p-3 sm:p-5 m-5 rounded-3xl bg-white">
                        <h1 className="text-xl text-center xl:text-start font-bold mb-5">Our Offerings</h1>
                        <div className="flex flex-wrap justify-center gap-x-7 gap-y-5">
                            <div
                                    className="border border-gray-400 rounded-3xl w-full max-w-[380px] p-5"
                                >
                                    <div className="flex gap-3 items-start mb-3">
                                        <div className="text-2xl text-blue-500 w-12 h-12 bg-blue-200 border flex items-center justify-center rounded-full">
                                            <LiaDiscourse />
                                        </div>
                                        <div>
                                            <h1 className="text-2xl sm:text-3xl font-bold">Your App</h1>
                                            <p className="text-gray-500">30 students</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500">Easily create a course and sell onlin</p>
                                    <Link to="Addcourse" className="text-xl cursor-pointer hover:underline font-bold py-5 text-blue-500 flex items-center gap-3">
                                        Create Course <FaArrowRight />
                                    </Link>
                                </div>
                            {offering.map((item, i) => (
                                <div
                                    key={i}
                                    className="border border-gray-400 rounded-3xl w-full max-w-[380px] p-5"
                                >
                                    <div className="flex gap-3 items-start mb-3">
                                        <div className="text-2xl text-blue-500 w-12 h-12 bg-blue-200 border flex items-center justify-center rounded-full">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h1 className="text-2xl sm:text-3xl font-bold">{item.offername}</h1>
                                            <p className="text-gray-500">{item.usageDetails}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500">{item.title}</p>
                                    <h2 className="text-xl cursor-pointer hover:underline font-bold py-5 text-blue-500 flex items-center gap-3">
                                        {item.landingpage} <FaArrowRight />
                                    </h2>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-full xl:w-1/4 p-5 flex flex-col gap-5">

                    <div className="bg-white p-5 rounded-3xl">
                        <h1 className="text-2xl font-bold border-b-2 border-gray-400 pb-3">Upcoming Classes</h1>
                        <button className="bg-blue-100 font-bold text-blue-500 py-3 w-full mt-4 rounded-3xl">+ Create Class</button>
                    </div>

                  
                    <div className="bg-white p-5 rounded-3xl">
                        <h1 className="text-2xl font-bold border-b-2 border-gray-400 pb-3">Additional Offerings</h1>
                        <div className="flex flex-col gap-4 mt-4">
                            
                            <div className="flex gap-4 bg-blue-100 p-3 rounded-3xl">
                                <div className="text-2xl text-blue-500 w-12 h-12 bg-blue-200 border flex items-center justify-center rounded-full">
                                    <FaImage />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-blue-500">Banners</h1>
                                    <p className="text-gray-500">3 Live</p>
                                </div>
                            </div>
                           
                            <div className="flex gap-4 bg-blue-100 p-3 rounded-3xl">
                                <div className="text-2xl text-blue-500 w-12 h-12 bg-blue-200 border flex items-center justify-center rounded-full">
                                    <MdOutlineCampaign />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-blue-500">Coupons</h1>
                                    <p className="text-gray-500">50 Live</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-4 bg-blue-100 p-3 rounded-3xl">
                                <div className="text-2xl text-blue-500 w-12 h-12 bg-blue-200 border flex items-center justify-center rounded-full">
                                    <GrAnnounce />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-blue-500">Notice</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
