import react, { useState } from "react"
import { CgProfile } from "react-icons/cg"
import { FaOpencart } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { MdMenuOpen } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react"
import { FaCreativeCommons } from "react-icons/fa";
import { Home, Globe, BookOpen, Layers, FileText, Smartphone, Layout, Users, MessageCircle, BarChart3, Settings, Megaphone, User2, } from "lucide-react";
import { BsPerson, BsCurrencyRupee, BsGear, BsHeadset, BsArrowLeftCircle } from 'react-icons/bs';
import MyProfile from "../pages/profilederopdown/MyProfile";


function Topnavbar() {
  let go = useNavigate();

  const [iscourseopen, setiscourseopen] = useState(false)
  const [isbatchopen, setisbatchopen] = useState(false)
  const [togleMenu, settogleMenu] = useState(false)
  const [isuseropen, setisuseropen] = useState(false)
  const [iscreatcourse, setiscreatcourse] = useState(false)
  const [isprofileopen, setisprofileopen] = useState(false)
  const [ismyprofileopen, setismyprofileopen] = useState(false)

  const hendlemenu = () => {

    settogleMenu(!togleMenu)

  }


  const Alllinks = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
        staggerChildren: 0.5,
      },
    }
  };
  return (
    <>
      <div className="sticky top-0 bg-white/60  md:border-none px-5 py-5 z-10  text-center" >

        <div className="flex justify-between content-center items-center">

          {/* <h1 className='text-3xl font-bold text-center  sticky  p-6  md:inline'> </h1> */}
          <div className="hidden md:inline"></div>

          <div className="logo  text-black hover:text-black z-20 flex content-center items-center gap-1 md:hidden ">
            <img className='w-16 ' src="https://pixelgenixitsolution.com/assets/logo-DYymvdQZ.jpg" alt="" />
            <div className="hidden sm:inline">
              <h1 className='text-2xl font-bold text-center  border-b  sticky  '>PixelGenix  </h1>
              <p className='font-semibold'>IT SOLUTIONS Pvt Ltd</p>
            </div>
          </div>

          <div className="flex gap-5">


            <h1 className='text-2xl xl:text-3xl  font-bold text-black cursor-pointer'><FaOpencart /></h1>
            <h1 className='text-2xl xl:text-3xl text-[#7C86FF] font-bold cursor-pointer ' onClick={() => { setisprofileopen(!isprofileopen) }}><CgProfile /></h1>
            <h1 className='text-2xl xl:text-3xl text-black font-bold inline md:hidden cursor-pointer' onClick={hendlemenu}>{!togleMenu ? <MdMenu /> : <MdMenuOpen />}</h1>
          </div>


        </div>


        {/* Profile  ----------------------------------------------- drop down ----------- */}

        {
          isprofileopen &&
          <motion.div className="  flex-col absolute right-0  bg-white    space-y-10  overflow-y-scroll  "
            variants={Alllinks}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col mt-6 px-5 space-y-2 " >
              <div className="">
                {/* My Profile */}
                <Link
                  href="#"
                  className="flex items-center space-x-4 p-2 my-2 text-gray-700 hover:bg-gray-100 rounded-md transition duration-200"
                  onClick={() => {
                    setismyprofileopen(true)
                    setisprofileopen(false)
                  }}
                >
                  <div className="text-xl text-gray-500"><BsPerson /></div>
                  <span className="font-medium">My Profile</span>
                </Link>

                {/* Recharge */}
                <Link
                  href="#"
                  className="flex items-center space-x-4 p-2 my-2 text-gray-700 hover:bg-gray-100 rounded-md transition duration-200"
                >
                  <div className="text-xl text-gray-500"><BsCurrencyRupee /></div>
                  <span className="font-medium">Recharge</span>
                </Link>

                {/* Settings */}
                <Link
                  href="#"
                  className="flex items-center space-x-4 p-2 my-2 text-gray-700 hover:bg-gray-100 rounded-md transition duration-200"
                >
                  <div className="text-xl text-gray-500"><BsGear /></div>
                  <span className="font-medium">Settings</span>
                </Link>

                {/* Help and Support */}
                <Link
                  href="#"
                  className="flex items-center space-x-4 p-2 my-2 text-gray-700 hover:bg-gray-100 rounded-md transition duration-200"
                >
                  <div className="text-xl text-gray-500"><BsHeadset /></div>
                  <span className="font-medium">Help and Support</span>
                </Link>

                {/* Logout */}
                <Link
                  href="#"
                  className="flex items-center space-x-4 p-2 my-2 text-gray-700 hover:bg-gray-100 rounded-md transition duration-200"
                >
                  <div className="text-xl text-gray-500"><BsArrowLeftCircle /></div>
                  <span className="font-medium">Logout</span>
                </Link>
              </div>

            </div>
          </motion.div>
        }

        {
          ismyprofileopen &&
          <>
            <div className=" absolute top-14">

              <MyProfile isOpen={open} onClick={() => setismyprofileopen(false)} />

            </div>
          </>
        }


        {/* menu -------------------------------------------drop down ------------------- */}

        {
          togleMenu &&

          <motion.div className="Buttons flex md:hidden flex-col    space-y-10  overflow-y-scroll border-t border-gray-400 "
            variants={Alllinks}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col mt-6 px-5 space-y-2 " >
              <Link to="/" className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600" onClick={() => settogleMenu(false)}>
                <Home size={20} /> Dashboard
              </Link>
              <Link to="video" className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600" onClick={() => settogleMenu(false)}>
                <Globe size={20} /> Website
              </Link>

              <motion.div className=""
                onClick={() => setiscourseopen(!iscourseopen)}
              // onMouseLeave={() => setiscourseopen(false)}
              >
                <Link className="flex justify-between items-center gap-3 text-black text-lg font-semibold hover:text-blue-600">
                  <p className='flex gap-3 items-center'><BookOpen size={20} /> Courses</p> <p className='flex justify-end text-xl '><span>{!iscourseopen ? "+" : "-"}</span></p>
                </Link>

                {
                  iscourseopen
                  &&
                  <div className='relative left-5 flex top-2 flex-col  gap-4 '>
                    <Link to="courses" className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600" onClick={() => settogleMenu(false)} >
                      My Courses
                    </Link>
                    <Link className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600" onClick={() => settogleMenu(false)}>
                      Globle Courses
                    </Link>
                    <Link className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600" onClick={() => settogleMenu(false)}>
                      Manage Coupons
                    </Link>
                  </div>
                }

              </motion.div>

              <motion.div className=""
                onClick={() => setisbatchopen(!isbatchopen)}

              >
                <Link className="flex items-center justify-between gap-3 text-black text-lg font-semibold hover:text-blue-600">
                  <p className='flex gap-3 items-center'><Layers size={20} /> Batches</p> <p className='flex justify-end text-xl '><span>{!isbatchopen ? "+" : "-"}</span></p>
                </Link>
                {
                  isbatchopen &&
                  <>
                    <div className='relative left-5 flex flex-col top-2 flex-wrap  gap-4 z-10 '>

                      <Link to="batches" className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600" onClick={() => settogleMenu(false)}>
                        Manage Batches
                      </Link>
                      <Link className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600" onClick={() => settogleMenu(false)}>
                        Manage Fees
                      </Link>
                    </div>
                  </>
                }
              </motion.div>
              <Link className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600" onClick={() => settogleMenu(false)}>
                <FileText size={20} /> Content
              </Link>
              <Link className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600" onClick={() => settogleMenu(false)}>
                <Smartphone size={20} /> Your App
              </Link>
              <Link className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600" onClick={() => settogleMenu(false)}>
                <Layout size={20} /> Landing Page
              </Link>
              <Link className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600" onClick={() => settogleMenu(false)}>
                <Users size={20} /> 1:1 Session
              </Link>
              <Link className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600" onClick={() => settogleMenu(false)}>
                <MessageCircle size={20} /> Chats
              </Link>
              <Link className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600" onClick={() => settogleMenu(false)}>
                <BarChart3 size={20} /> Analytics
              </Link>
              <Link className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600" onClick={() => settogleMenu(false)}>
                <Settings size={20} /> Integration
              </Link>
              <Link className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600" onClick={() => settogleMenu(false)}>
                <Megaphone size={20} /> Campaigns
              </Link>

              <motion.div className=""
                onClick={() => setisuseropen(!isuseropen)}

              >
                <Link className="flex items-center justify-between gap-3 text-black  text-lg font-semibold hover:text-blue-600" >

                  <p className='flex gap-3 items-center'> <User2 size={20} /> Peoples</p> <p className='flex justify-end text-xl '><span>{!isuseropen ? "+" : "-"}</span></p>
                </Link>

                {
                  isuseropen &&
                  <>
                    <div className='relative left-5 flex flex-col top-2 flex-wrap  gap-4 z-10 '>

                      <Link to="users" className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600" onClick={() => settogleMenu(false)}>
                        User
                      </Link>
                      <Link className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600" onClick={() => settogleMenu(false)}>
                        Team Mambers
                      </Link>
                      <Link className="flex items-center gap-3 text-black text-lg font-semibold hover:text-blue-600" onClick={() => settogleMenu(false)}>
                        Lead Enquiry
                      </Link>
                    </div>
                  </>
                }
              </motion.div>
            </div>

          </motion.div>


        }
      </div >
    </>
  )
}

export default Topnavbar