import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Using framer-motion
import { useDispatch } from 'react-redux';
import { FaRightLong } from 'react-icons/fa6';
import axios from 'axios';

function User_Courses() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [getcoursedata, setgetcoursedata] = useState([]);
    const [input, setinput] = useState([]);

    // Navigate to course details
    const expandmore = (course) => {
        navigate("/user/ExplorCourse", { state: course || [] });
    }

    // Fetch purchased courses
    useEffect(() => {
        axios.get("https://classplut2.onrender.com/checkoutget", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then(res => setinput(res.data.data))
            .catch(err => console.log(err));
    }, []);

    // Fetch all courses
    useEffect(() => {
        axios.get("https://classplut2.onrender.com/getcourses")
            .then(res => setgetcoursedata(res.data.coursedata))
            .catch(err => console.log(err));
    }, []);

    const cannotbuy = getcoursedata.filter(item =>
        input.some(purchased => purchased.courseId === item._id)
    );

    const CanBuy = getcoursedata.filter(item =>
        !input.some(purchased => purchased.courseId === item._id)
    );

    // Framer-motion variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, when: "beforeChildren" }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        hover: { scale: 1.05, transition: { duration: 0.3 } }
    }

    return (
        <div className='px-10'>

            <div className="bg-gray-100 py-10 px-5">
                <h2 className="text-3xl font-bold text-center mb-10">
                    Types of Professional Courses
                </h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {getcoursedata.reverse().slice(0,4).map((course, index) => (
                        <div
                            key={course.id}
                            className="relative bg-white rounded-xl shadow-lg w-64 h-72 flex flex-col items-center justify-center 
                 hover:scale-105 hover:shadow-2xl transform transition duration-500 ease-in-out
                 overflow-hidden group cursor-pointer"
                 onClick={() => expandmore(course)}
                        >
                            {/* Top Color Banner */}
                            <div className="absolute top-0 left-0 w-full h-10 rounded-t-xl bg-gradient-to-r from-red-400 to-pink-500"></div>

                            {/* Course Number */}
                            <div className="absolute  top-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white font-bold w-12 h-12 
                      flex items-center justify-center rounded-full shadow-lg text-lg">
                                {index + 1}
                            </div>
                            <img
                                src={course.imagePath ? `https://classplut2.onrender.com/${course.imagePath}` : "https://via.placeholder.com/320x180"}
                                className="w-full h-38 object-cover p-2 pt-5"
                                alt={course.Coursename}
                            />
                            {/* Course Title */}
                            <h3 className="text-lg font-semibold text-center px-3 mt-6 transition-colors duration-300 group-hover:text-pink-600">
                                {course.Coursename}
                            </h3>
                            
                            {/* Animated underline on hover */}
                            <span className="absolute bottom-4 w-0 h-1 bg-pink-500 rounded-full transition-all duration-500 group-hover:w-16"></span>
                        </div>
                    ))}
                </div>

            </div>

            {/* Purchased Courses */}
            <motion.div
                className="flex justify-start gap-10 items-center flex-wrap"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {cannotbuy.map((course, index) => (
                    <motion.div
                        key={course._id || index}
                        className="bg-white shadow-lg rounded w-[250px] overflow-hidden transition"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        <img
                            src={course.imagePath ? `https://classplut2.onrender.com/${course.imagePath}` : "https://via.placeholder.com/320x180"}
                            className="w-full h-48 object-cover p-2"
                            alt={course.Coursename}
                        />
                        <div className="px-5 py-4">
                            <h2 className="text-lg font-bold mb-2 truncate">{course.Coursename}</h2>
                            <Link to="/user/buycourses" className='text-blue-500 hover:underline flex items-center gap-2'>
                                <span>Go To Course</span> <FaRightLong />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <h1 className='text-2xl py-5'>Courses ({getcoursedata.length})</h1>

            {/* Courses Available to Buy */}
            <motion.div
                className="flex flex-wrap justify-start gap-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {CanBuy.map((course, index) => (
                    <motion.div
                        key={course._id || index}
                        className="bg-white shadow-lg rounded overflow-hidden w-full sm:w-60 md:w-64 lg:w-72 transition"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        <img
                            src={course.imagePath ? `https://classplut2.onrender.com/${course.imagePath}` : "https://via.placeholder.com/320x180"}
                            className="w-full h-48 object-cover cursor-pointer p-2"
                            alt={course.Coursename}
                            onClick={() => expandmore(course)}
                        />
                        <div className="px-5 py-4">
                            <h2 className="text-lg font-bold mb-2 truncate">{course.Coursename}</h2>
                            <p className="text-green-600 font-semibold mb-1">
                                Live: {course.live ? "Yes" : "No"}
                            </p>
                            <div className="flex gap-3 items-center">
                                <p className="text-black text-xl font-bold">{course.CruntPrice}</p>
                                {course.Discountrice && (
                                    <p className="line-through text-red-500">{course.Discountrice}</p>
                                )}
                            </div>
                            <button
                                className="mt-3 w-full px-4 py-2 cursor-pointer rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition"
                                onClick={() => expandmore(course)}
                                aria-label={`Buy ${course.Coursename} course`}
                            >
                                Buy Now
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

        </div>
    )
}

export default User_Courses;
