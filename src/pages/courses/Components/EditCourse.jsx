import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function EditCourse() {
    const [courseData, setCourseData] = useState({
        Coursename: '',
        Description: '',
        CruntPrice: '',
        Discountrice: '',
        Effectiveprice: '',
        CourseType: '',
        Course_Category: '',
        Course_Duration: '',
        Duration_Type: '',
        SubCategory: '',
        Category: '',
        foldersdata: [], 
        _id: ''
    });
    let navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null); 
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setCourseData(prev => ({ ...prev, ...location.state }));
        }
    }, [location.state]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        if (imageFile) {
            formData.append("image", imageFile);
        }

        for (let key in courseData) {
            if (key === "foldersdata") {
                formData.append(key, JSON.stringify(courseData[key])); // stringifying foldersdata
            } else {
                formData.append(key, courseData[key]);
            }
        }

        try {
            const res = await axios.put("https://classplut2.onrender.com/updatecourse", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.status) {
                toast.success("Course updated successfully!");
                setTimeout(() => {
                    navigate('/admin/courses');
                }, 2000);
            } else {
                toast.error(res.data.msg || "Failed to update course.");
            }
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error("Something went wrong.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    
    return (
        <div className=''>
            <h1>Edit Course</h1>
            <ToastContainer />
            <form onSubmit={handleUpdate} className='flex flex-col gap-4 bg-white  rounded shadow-md mx-auto'>
                <div className="flex flex-wrap gap-4 mx-auto ">
                    <div>
                        <label className='font-bold block'>Course Name:</label>
                        <input
                            type="text"
                            name="Coursename"
                            value={courseData.Coursename}
                            onChange={handleChange}
                            className='border p-2 rounded w-full sm:w-96'
                        />
                    </div>

                    <div>
                        <label className='font-bold block'>Description:</label>
                        <textarea
                            name="Description"
                            value={courseData.Description}
                            onChange={handleChange}
                            className='border p-2 rounded w-96'
                        />
                    </div>

                    <div>
                        <label className='font-bold block'>Original Price:</label>
                        <input
                            type="number"
                            name="CruntPrice"
                            value={courseData.CruntPrice}
                            onChange={handleChange}
                            className='border p-2 rounded w-96'
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mx-auto ">
                    <div>
                        <label className='font-bold block'>Discount Price:</label>
                        <input
                            type="number"
                            name="Discountrice"
                            value={courseData.Discountrice}
                            onChange={handleChange}
                            className='border p-2 rounded w-96'
                        />
                    </div>

                    <div>
                        <label className='font-bold block'>Effective Price:</label>
                        <input
                            type="number"
                            name="Effectiveprice"
                            value={courseData.Effectiveprice}
                            onChange={handleChange}
                            className='border p-2 rounded w-96'
                        />
                    </div>

                    <div>
                        <label className='font-bold block'>Course Type:</label>
                        <input
                            type="text"
                            name="CourseType"
                            value={courseData.CourseType}
                            onChange={handleChange}
                            className='border p-2 rounded w-96'
                        />
                    </div>

                </div>

                <div className="flex flex-wrap gap-4 mx-auto ">

                    <div>
                        <label className='font-bold block'>Course Category:</label>
                        <input
                            type="text"
                            name="Course_Category"
                            value={courseData.Course_Category}
                            onChange={handleChange}
                            className='border p-2 rounded w-96'
                        />
                    </div>

                    <div>
                        <label className='font-bold block'>Course Duration:</label>
                        <input
                            type="number"
                            name="Course_Duration"
                            value={courseData.Course_Duration}
                            onChange={handleChange}
                            className='border p-2 rounded w-96'
                        />
                    </div>

                    <div>
                        <label className='font-bold block'>Duration Type:</label>
                        <input
                            type="text"
                            name="Duration_Type"
                            value={courseData.Duration_Type}
                            onChange={handleChange}
                            className='border p-2 rounded w-96'
                        />
                    </div>

                </div>

                <div className="flex flex-wrap gap-4 mx-auto ">
                    <div>
                        <label className='font-bold block'>Subcategory:</label>
                        <input
                            type="text"
                            name="SubCategory"
                            value={courseData.SubCategory}
                            onChange={handleChange}
                            className='border p-2 rounded w-96'
                        />
                    </div>

                    <div>
                        <label className='font-bold block'>Category:</label>
                        <input
                            type="text"
                            name="Category"
                            value={courseData.Category}
                            onChange={handleChange}
                            className='border p-2 rounded w-96'
                        />
                    </div>

                    <div>
                        <label className='font-bold block'>Upload New Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className='border p-2 rounded w-96'
                        />
                    </div>
                </div>

                {courseData.imagePath && (
                    <div className='mx-auto'>
                        <label className='font-bold block '>Current Image:</label><br />
                        <img
                            src={imageFile ? URL.createObjectURL(imageFile) : `https://classplut2.onrender.com/${courseData.imagePath}`}
                            alt="Course"
                            className='border p-2 rounded w-96 '
                            width={150}
                        />
                    </div>
                )}

                <button className='bg-blue-500 text-white p-2 rounded' type="submit">Update Course</button>
            </form>
        </div>
    );
}

export default EditCourse;
