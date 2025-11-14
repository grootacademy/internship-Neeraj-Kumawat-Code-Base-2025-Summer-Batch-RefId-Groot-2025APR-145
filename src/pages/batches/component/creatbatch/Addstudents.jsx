import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const AddStudents = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [courseId, setCourseId] = useState("");

    let Go = useNavigate()
    let location = useLocation()
    let batch_id = location.state.batchs._id

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setSelectedUserIds((prev) =>
            checked ? [...prev, value] : prev.filter((id) => id !== value)
        );
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/getusers");
            setAllUsers(res.data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };


    useEffect(() => {
        fetchUsers();

    }, []);

    const handleSubmit = async () => {
        if (selectedUserIds.length > 0 && batch_id) {
            try {
                const res = await axios.post("http://localhost:5000/Updatebatchid", {
                    userIds: selectedUserIds,
                    courseId: batch_id,
                }).then((res) => {
                    if (res.status) {
                        toast.success("User Added Success")
                        setTimeout(() => {
                            Go(-2)
                        }, 2000);
                    } else {
                        toast.error("Somthing went Rong")

                    }
                }).catch(error => console.log(error))


            } catch (err) {
                console.error(err);
            }
        } else {
            toast.error(" Please select users ");
        }
    };

    return (
        <div className="h-full right-0 z-50 bg-whate/50 w-full flex justify-end">
            <ToastContainer />
            <div className=" w-full rounded-lg shadow-lg flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center border-b px-5 py-3">
                    <h2 className="text-lg font-semibold">Add Students</h2>
                    <button
                        onClick={() => Go(-1)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Users list */}
                <div className="flex-1 overflow-auto p-5 space-y-5">
                   
                    {allUsers.map((user, index) => (
                        <li
                            key={index}
                            className="bg-white border w-96  border-blue-100 rounded-md p-3 shadow-sm flex   gap-6 hover:shadow-md transition "
                        >
                            <input
                                type="checkbox"
                                id={user._id}
                                value={user._id}
                                onChange={handleCheckboxChange}
                                className="w-6"
                            />
                            <label className="flex flex-col  justify-between cursor-pointer" htmlFor={user._id}>
                                <span className="text-blue-700 font-medium">Name:{user.username}</span>
                                <span className="text-blue-700 font-medium">{user.email}</span>
                            </label>
                        </li>
                    ))}
                </div>

                {/* Save button */}
                <div className="border-t mb-96 px-5 py-3 flex justify-between">
                    <button className='border border-blue-500 px-4 py-3 rounded text-blue-500 font-semibold' onClick={() => Go(-1)}>Previous</button>
                    <button
                        className="px-4 py-2 rounded-md text-white font-medium bg-blue-500"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddStudents;
