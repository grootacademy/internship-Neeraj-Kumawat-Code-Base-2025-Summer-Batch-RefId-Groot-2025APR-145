import React from 'react'
import LeftNavbar from './LeftNavbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Topnavbar from './Topnavbar'
import User from '../pages/user/User'

function Applayout() {
    return (
        // <>
        // <User/>
        // </>
        <>
            <div className="relative flex flex-col   sm:flex-row bg-[#f8fafc] min-h-screen overflow-hidden">

                {/* Sidebar */}
                <div className="absolute z-10 hidden md:inline sm:relative border-gray-50 w-[350px] bg-white/60 overflow-y-scroll h-[100vh] rounded-2xl rounded-tr-none">
                    <LeftNavbar />
                </div>

                {/* 🔷 Triangles */}
                <div className="absolute top-0 right-0 w-0 h-0 
                    border-l-[420px] border-l-transparent 
                    border-b-[420px] border-b-blue-400 opacity-40">
                </div>
                <div className="absolute top-0 left-72 w-0 h-0 
                    border-l-[300px] border-l-transparent 
                    border-b-[300px] border-b-purple-500 opacity-40">
                </div>
                <div className="absolute bottom-0 right-0 w-0 h-0 
                    border-r-[350px] border-r-transparent 
                    border-t-[350px] border-t-green-400 opacity-40">
                </div>
                <div className="absolute bottom-0 left-56 w-0 h-0 
                    border-r-[280px] border-r-transparent 
                    border-t-[280px] border-t-yellow-300 opacity-40">
                </div>

                {/* 🔵 Circles */}
                <div className="absolute top-32 left-1/4 w-32 h-32 bg-blue-300 rounded-full opacity-30"></div>
                <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-green-300 rounded-full opacity-30"></div>
                <div className="absolute top-1/2 left-10 w-16 h-16 bg-purple-400 rounded-full opacity-30"></div>

                {/* ▫ Squares */}
                <div className="absolute top-10 right-20 w-16 h-16 bg-yellow-400 rotate-12 opacity-40"></div>
                <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-200 rotate-45 opacity-30"></div>

                {/* Main Content */}
                <div className="w-full h-[100vh] z-20 overflow-y-scroll m-0 p-0 relative">
                    <Topnavbar />
                    <Outlet />
                </div>

                <Footer />
            </div>
        </>
    )
}

export default Applayout
