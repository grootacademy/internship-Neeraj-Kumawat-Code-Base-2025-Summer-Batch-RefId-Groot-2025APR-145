import axios from 'axios'
import React, { useEffect, useState } from 'react'

function User_Buy_Courses() {
    const [input, setinput] =useState([])
    const [getcoursedata, setgetcoursedata] = useState([])
    useEffect(() => {
    axios.get("https://classplut2.onrender.com/checkoutget",{headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}).then((res) => {
      console.log(res.data.data);
        setinput(res.data.data);
    });
  }, [])

     useEffect(() => {
        axios.get("https://classplut2.onrender.com/getcourses").then((res) => {

            setgetcoursedata(res.data.coursedata)
        }).catch((error) => console.log(error))

    }, [])

    let filterdata = getcoursedata.filter((item) => {
        return input.some((purchased) => purchased.courseId === item._id);
    });
    console.log(filterdata);

  return (
    <div>
      <h1 className="text-2xl font-bold">Buy Courses</h1>
      <p className="mt-4">Here you can purchase courses.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterdata.map((course) => (
                <div key={course._id} className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">{course.Coursename}</h2>
                    <img src={`https://classplut2.onrender.com/${course.imagePath}`} alt="" />
                    <p className="text-gray-600 mb-4">{course.Description}</p>
                    <p className="text-lg font-bold mb-4">Price: ${course.price}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default User_Buy_Courses
