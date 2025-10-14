import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Home,
    Globe,
    BookOpen,
    Layers,
    FileText,
    Smartphone,
    Layout,
    Users,
    MessageCircle,
    BarChart3,
    Settings,
    Megaphone,
    User2,
} from "lucide-react";


function LeftNavbar() {

    const [iscourseopen, setiscourseopen] = useState(false)
    const [isbatchopen, setisbatchopen] = useState(false)
    const [ispeopleopen, setispeopleopen] = useState(false)

    return (
        <>
            <div className="Navbar ">
                <div className="logo  sticky top-0 text-black hover:text-black z-20 flex content-center items-center gap-1 p-3 ">
                    <img className='w-16 ' src="https://pixelgenixitsolution.com/assets/logo-DYymvdQZ.jpg" alt="" />
                    <div className="">
                        <h1 className='text-2xl font-bold text-center  border-b  sticky  '>PixelGenix  </h1>
                        <p className='font-semibold'>IT SOLUTIONS Pvt Ltd</p>
                    </div>

                </div>

                {/* Xl navbar--------------------------------------- */}


                <div className="flex flex-col space-y-10    ">
                    <div className="flex flex-col mt-6 px-5 space-y-5">
                        <Link to="/" className="  focus:bg-blue-200 rounded ps-5 flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600">
                            <Home size={20} /> Dashboard
                        </Link>
                        <Link to="/video" className="flex items-center   focus:bg-blue-200 rounded ps-5  gap-3 text-black text-lg font-semibold hover:text-blue-600">
                            <Globe size={20} /> Website
                        </Link>
                        <div className=""
                            onClick={() => setiscourseopen(!iscourseopen)}
                        // onMouseLeave={() => setiscourseopen(false)}
                        >
                            <Link className="flex   focus:bg-blue-200 rounded ps-5  justify-between items-center gap-3 text-black text-lg font-semibold hover:text-blue-600">
                                <p className='flex gap-3 items-center'><BookOpen size={20} /> Courses</p> <p className='flex justify-end text-xl '><span>{!iscourseopen ? "+" : "-"}</span></p>
                            </Link>

                            {
                                iscourseopen
                                &&
                                <div className='relative left-5 flex top-2 flex-col  gap-4 '>
                                    <Link to="courses" className="flex items-center   focus:bg-blue-200 rounded ps-5  gap-3 text-black text-lg font-semibold hover:text-blue-600">
                                        My Courses
                                    </Link>
                                    <Link className="flex items-center   focus:bg-blue-200 rounded ps-5  gap-3 text-black text-lg font-semibold hover:text-blue-600">
                                        Globle Courses
                                    </Link>
                                    <Link className="flex items-center   focus:bg-blue-200 rounded ps-5  gap-3 text-black text-lg font-semibold hover:text-blue-600">
                                        Manage Coupons
                                    </Link>
                                </div>
                            }

                        </div>
                        <div className=""
                            onClick={() => setisbatchopen(!isbatchopen)}

                        >
                            <Link className="flex items-center   focus:bg-blue-200 rounded ps-5  justify-between gap-3 text-black text-lg font-semibold hover:text-blue-600">
                                <p className='flex gap-3 items-center '><Layers size={20} /> Batches</p> <p className='flex justify-end text-xl '><span>{!isbatchopen ? "+" : "-"}</span></p>
                            </Link>
                            {
                                isbatchopen &&
                                <>
                                    <div className='relative left-5 flex top-2 flex-wrap  gap-4 z-10 '>

                                        <Link to="batches" className=" flex items-center   focus:bg-blue-200 rounded ps-5  gap-3 text-black text-lg font-semibold hover:text-blue-600">
                                            Manage Batches
                                        </Link>
                                        <Link className="flex items-center   focus:bg-blue-200 rounded ps-5  gap-3 text-black text-lg font-semibold hover:text-blue-600">
                                            Manage Fees
                                        </Link>
                                    </div>
                                </>
                            }
                        </div>
                        <Link to="live_stream" className="flex items-center   focus:bg-blue-200 rounded ps-5  gap-3 text-black text-lg font-semibold hover:text-blue-600">
                            <FileText size={20} /> Content
                        </Link>
                        <Link className="flex items-center   focus:bg-blue-200 rounded ps-5  gap-3 text-black text-lg font-semibold hover:text-blue-600">
                            <Smartphone size={20} /> Your App
                        </Link>
                        <Link className="flex items-center   focus:bg-blue-200 rounded ps-5  gap-3 text-black text-lg font-semibold hover:text-blue-600">
                            <Layout size={20} /> Landing Page
                        </Link>
                        <Link className="flex items-center   focus:bg-blue-200 rounded ps-5  gap-3 text-black text-lg font-semibold hover:text-blue-600">
                            <Users size={20} /> 1:1 Session
                        </Link>
                        <Link to='Chatappadmin' className="flex items-center   focus:bg-blue-200 rounded ps-5  gap-3 text-black text-lg font-semibold hover:text-blue-600">
                            <MessageCircle size={20} /> Chats
                        </Link>
                        <Link className="flex items-center   focus:bg-blue-200 rounded ps-5  gap-3 text-black text-lg font-semibold hover:text-blue-600">
                            <BarChart3 size={20} /> Analytics
                        </Link>
                        <Link className="flex items-center   focus:bg-blue-200 rounded ps-5  gap-3 text-black text-lg font-semibold hover:text-blue-600">
                            <Settings size={20} /> Integration
                        </Link>
                        <Link className="flex items-center   focus:bg-blue-200 rounded ps-5  gap-3 text-black text-lg font-semibold hover:text-blue-600">
                            <Megaphone size={20} /> Campaigns
                        </Link>

                        <div className=""
                            onClick={() => setispeopleopen(!ispeopleopen)}

                        >
                            <Link className="flex items-center   focus:bg-blue-200 rounded ps-5  justify-between gap-3 text-black text-lg font-semibold hover:text-blue-600">
                                <p className='flex gap-3 items-center'> <User2 size={20} /> Peoples</p> <p className='flex justify-end text-xl '><span>{!ispeopleopen ? "+" : "-"}</span></p>
                            </Link>
                            {
                                ispeopleopen &&
                                <>
                                    <div className='relative left-5 flex flex-col top-2 flex-wrap  gap-4 z-10 '>

                                        <Link to="users" className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600">
                                            Users
                                        </Link>
                                        <Link className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600">
                                            Team Mambers
                                        </Link>
                                        <Link className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600">
                                            Lead Enquiry
                                        </Link>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <div className=" flex ">
                        <Link className=' rounded-r-full  py-5 text-xl px-5 bg-indigo-500 text-white font-semibold'>Help & support</Link>
                    </div>
                </div>
            </div>


            <div />
        </>
    )
}

export default LeftNavbar
