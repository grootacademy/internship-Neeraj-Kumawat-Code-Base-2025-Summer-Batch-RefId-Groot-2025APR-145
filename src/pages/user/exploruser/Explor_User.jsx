import React, { use, useEffect, useState } from 'react';
import User_Batch from '../user_batchsec/User_Batch';
import User_Courses from '../user_coursesec/User_Courses';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaRightLong } from 'react-icons/fa6';

const ExpandableSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b">
            <button
                className="w-full text-left py-3 px-4 font-semibold flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <span>{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && <div className="p-4 bg-white">{children}</div>}
        </div>
    );
};

function Explore_User() {
    const [activeTab, setActiveTab] = useState('Info');
    const [input, setinput] = useState([]);
    const [getcoursedata, setgetcoursedata] = useState([]);
    const [Users, setUsers] = useState([]);
    useEffect(() => {
        axios.get("https://classplut2.onrender.com/checkoutget", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then((res) => {
            setinput(res.data.data);
        });
    }, [])

    useEffect(() => {
        axios.get("https://classplut2.onrender.com/getcourses").then((res) => {

            setgetcoursedata(res.data.coursedata)
        }).catch((error) => console.log(error))

    }, [])

    let cannotbuy = getcoursedata.filter((item) => {
        return input.some((purchased) => purchased.courseId === item._id);
    });

    const tabs = ['Info', 'Batches', 'Courses', 'Performance', 'Payments', 'Assignments'];
console.log(input);

useEffect(() => {
    axios.get("https://classplut2.onrender.com/profile", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then((res) => {
        console.log(res.data.data);
        setUsers(res.data.data);
    }).catch((error) => console.log(error))
}, []);

    return (
        <div className="container mx-auto my-8 bg-white shadow-md rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center bg-blue-100 p-6">
                <div className="w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center text-2xl font-bold">
                   {Users?.username?.charAt(0)}
                </div>
                <div className="ml-4">
                    <h2 className="text-xl font-semibold">{Users.username}</h2>
                    <p className="text-sm text-gray-600">{new Date(Users.createdAt).toLocaleDateString()}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-around  bg-gray-50 border-b py-2 text-xl font-medium text-gray-700">
                {tabs.map((tab) => (
                    <span
                        key={tab}
                        className={`cursor-pointer px-4 py-1 ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : ''
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </span>
                ))}
            </div>

            {/* Content */}
            <div className="p-4 min-h-[400px]">
                {activeTab === 'Info' && (
                    <>
                        <ExpandableSection title="1. Basic Information">
                            <div className="grid grid-cols-2 gap-4">
                                <div><strong>Name:</strong> {Users.username}</div>
                                <div><strong>Mobile Number:</strong> +91 9929992999</div>
                                <div><strong>Email:</strong> --------</div>
                                <div><strong>Roll Number:</strong> --------</div>
                                <div><strong>Date of Joining:</strong> --------</div>
                                <div><strong>About:</strong> --------</div>
                            </div>
                        </ExpandableSection>

                        <ExpandableSection title="2. Parent's Information">
                            <p>No data available</p>
                        </ExpandableSection>

                        <ExpandableSection title="3. Personal Details">
                            <p>No data available</p>
                        </ExpandableSection>

                        <ExpandableSection title="4. Address">
                            <p>No data available</p>
                        </ExpandableSection>

                        <ExpandableSection title="5. Educational Details">
                            <p>No data available</p>
                        </ExpandableSection>
                    </>
                )}

                {activeTab === 'Batches' && <User_Batch />}
                {activeTab === 'Courses' && <>
                    {input.length === 0 ? (
                        <div className="px-10 py-10 space-x-1">
                            <h1>No Courses Purchased Yet!........</h1>
                            <button className="bg-blue-500 text-white py-2 px-4 rounded"><Link to="/user/course">Purchase Courses</Link></button>
                        </div>
                    ) : (
                        <div className=" flex flex-wrap justify-center sm:justify-start gap-10 items-center   ">
                            {cannotbuy.map((course, index) => (
                                <div

                                    className="bg-white shadow-lg rounded w-[250px] overflow-hidden hover:shadow-2xl transition "
                                    key={course._id || index}
                                >
                                    <img
                                        src={`https://classplut2.onrender.com/${course.imagePath}` || "https://via.placeholder.com/320x180"}
                                        className="w-full h-48 object-cover p-2"
                                        alt={course.Coursename}

                                    />
                                    <div className="px-5 py-4">
                                        <h2 className="text-lg font-bold mb-2">{course.Coursename}</h2>
                                        {/* <p className="text-gray-500 mb-1">
                                {course.Description.slice(0, 40)} <span className='cursor-pointer' >....</span>
                            </p> */}
                                        {/* <p className="text-gray-500 mb-1">
                                Course Type: {course.CourseType}
                            </p> */}

                                        <Link to="/user/buycourses" className='text-blue-500 hover:underline flex content-center items-center gap-2'><span>Go To Course</span> <FaRightLong /> </Link>

                                    </div>
                                </div>
                            ))}

                        </div>

                    )}
                </>}
                {activeTab === 'Performance' && <p>Performance data coming soon.</p>}
                {activeTab === 'Payments' && <>
                { input.length === 0 ? 
                            <h1 className='text-2xl font-bold'>No Paid Records Found</h1>
                        : 
                            <div>
                                <h1 className='text-2xl font-bold mb-5'>Paid Records</h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {input.map((item) => (
                                        <div key={item._id} className="border p-4 rounded shadow bg-white">
                                            <h2 className="text-lg font-semibold mb-2">{item.courseName}</h2>
                                            <p><span className="font-medium">Name:</span> {item.fname} {item.lname}</p>
                                            <p><span className="font-medium">Email:</span> {item.email}</p>
                                            <p><span className="font-medium">Mobile:</span> {item.mobile}</p>
                                            <p><span className="font-medium">Address:</span> {item.address}, {item.city}, {item.state}, {item.pincode}, {item.country}</p>
                                            <p><span className="font-medium">Date:</span> {item.date}</p>
                                            <p><span className="font-medium">Payment ID:</span> {item.paymentId}</p>
                                            <p><span className="font-medium">Amount Paid:</span> ₹{item.totalAmount}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                </>}
                {activeTab === 'Assignments' && <p>Assignments coming soon.</p>}
            </div>
        </div>
    );
}

export default Explore_User;
