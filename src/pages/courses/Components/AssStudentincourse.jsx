import axios from "axios";
import { h1 } from "motion/react-client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const AssStudentincourse = () => {
    const [Document, setDocument] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [inputvalue, setinputvalue] = useState([]);
    const [updatedata, setupdatedata] = useState({
        userid: inputvalue,
        Coursesid: ""
    })
    let go = useNavigate()
    let hendlebox = (e) => {
        const { value, checked } = e.target;
        setinputvalue((pre) => {
            if (checked) {
                return [...pre, value];
            } else {
                return pre.filter((item) => item !== value);
            }
        });
    };

    async function getusesdataindb() {
        try {
            let res = await axios.get("http://localhost:5000/getusers");
            setAllUsers(res.data.getuser);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getusesdataindb();
    }, []);
    

   let courseId = JSON.parse(localStorage.getItem("CourseId"))||[]
    
    
   let hendlesubmit = () => {
  if (inputvalue.length > 0 && courseId) {
    axios.post("http://localhost:5000/Addcourseinuser", {
      userIds: inputvalue,
      courseId: courseId
    })
      .then((res) => {
        toast.success(" Updated:", res.data);
        go("/coursesdetales")
      })
      .catch((err) => console.error(err));
  } else {
    if (allUsers.length >0 ) {
      toast.error(" Please select users and make sure course exists");
    }else{
      toast.error(" Please Add users and make sure course exists");
    }
  }
};


    

    return (
        <div className=" ">
          <ToastContainer />
            <div className="">
                {/* Header */}
                <div className="flex justify-between items-center border-b px-5 py-3">
                    <h2 className="text-lg font-semibold">Add Document</h2>
                  
                </div>

                {/* Body (scrollable users list) */}
                <div className="flex-1 overflow-auto p-5 ">
                    {
                      allUsers.length > 0?
                      allUsers.map((user) => (
                        <div key={user._id} className="flex items-center gap-2 py-1">
                            <input
                                type="checkbox"
                                id={user._id}
                                name="Userid"
                                value={user._id}
                                onChange={hendlebox}
                            />
                            <label htmlFor={user._id}>{user.name}</label>
                        </div>
                    ))
                    :
                    
                    <h1 className="text-3xl font-bold text-center">User Note Found </h1>
                    }
                </div>

                {/* Footer (Save button fixed at bottom) */}
                <div className="border-t px-5 py-3 flex justify-end">
                    <button
                        className={`px-4 py-2 rounded-md text-white font-medium bg-blue-500 cursor-pointer`}
                        onClick={
                            hendlesubmit
                        }
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssStudentincourse;

