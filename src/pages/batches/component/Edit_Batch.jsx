import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Edit_Batch() {
    const location = useLocation();
    const batch = location.state;
    const [allusers, setAllUsers] = useState([])
    const [formData, setFormData] = useState({
        _id: batch._id,
        Batchname: batch?.Batchname || '',
        subject: batch?.subject || '',
        Users: batch?.Users || [],
    });
    let go = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleRemoveUser = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            Users: prev.Users.filter((_, index) => index !== indexToRemove)
        }));
    };


    useEffect(() => {
        axios.get("http://localhost:5000/getusers")
            .then((res) => {
                // console.log(res.data); // Optional: log to see what you get
                setAllUsers(res.data.data); // Update with actual key if different
            })
            .catch((err) => console.error("Error fetching users:", err));
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Updated batch:', formData);
        axios.post("http://localhost:5000/edit_batch", { formData }).then((res) => {
            if (res.data.status) {
                toast.success(res.data.msg)
                setTimeout(() => {
                    go(-2)
                }, 2000);
            } else {
                toast.error(res.data.msg)

            }
        })
            .catch(error => console.log(error))
    };
    let filterusers = allusers.filter(item => formData.Users.includes(item._id));
    console.log(formData)

    return (
        <div>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div className=" space-y-4 mx-auto p-3">
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-xl font-bold pe-3'>Batch Name:</label>
                        <input
                            className="px-5 py-3 rounded border w-full max-w-4xl"
                            name="Batchname"
                            type="text"
                            value={formData.Batchname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="subject" className='text-xl font-bold pe-3'>Batch Subject</label>
                        <input
                            className="px-5 py-3 rounded border w-full max-w-4xl"
                            name="subject"
                            type="text"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                        <div className="flex-1 overflow-auto p-5 space-y-5">
                   
                    {filterusers.map((user, index) => (
                        <li
                            key={index}
                            className="bg-white border w-full max-w-96  border-blue-100 rounded-md p-3 shadow-sm flex flex-wrap  gap-6 hover:shadow-md transition "
                        >
                            <button
                                        type="button"
                                        className="text-red-500 underline"
                                        onClick={() => handleRemoveUser(index)}
                                    >
                                        Remove
                                    </button>
                            <div className="flex flex-col  justify-between " >
                                <span className="text-blue-700 font-medium">Name:{user.username}</span>
                                <span className="text-blue-700 font-medium">{user.email}</span>
                            </div>
                        </li>
                    ))}
                </div>
                    


                <button
                    type="submit"
                    className="px-5 py-2 border border-green-500 text-green-500 font-semibold mt-4"
                >
                    Edit
                </button>
            </form>
        </div>
    );
}

export default Edit_Batch;
