import React, { useState } from 'react'
import { MdOutlineUpload } from "react-icons/md";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from '../../../../components/storeslice/Detalesslice';

function Createanewcourse() {
    const [Termcondication, setTermcondication] = useState(false)
    const [inputdata, setinputdata] = useState({
        Coursename:"",
        Description:"",
        Category:"",
        image:null
    })
    let Dispatch = useDispatch()
    let go = useNavigate()

    let hendleinput = (e) => {
        setinputdata({ ...inputdata, [e.target.name]: e.target.value })
    }

    let hendlefile = (e) =>{
         setinputdata({ ...inputdata, image: e.target.files[0] });
         console.log("image:", e.target.files[0])
    }

    let handlesubmit = () => {
        
        if (!inputdata.Coursename || !inputdata.Description || !inputdata.Category ) {
            alert("❌ Please fill all required fields");
            return;
        }
        if (!Termcondication) {
            alert(" Please accept Terms & Conditions");
            return;
        }
       
      
console.log(inputdata)
        go("/admin/AddcoursePrice",{state:inputdata})
    };

  const steps = [
        { id: 1, name: "Basic Information", status: "current" },
        { id: 2, name: "Edit Price", status: "upcoming" },
        { id: 3, name: "Add Content", status: "upcoming" },
        { id: 4, name: "Bundle (Optional)", status: "upcoming" },
    ];

    return (
        <>
            <div className="w-full flex flex-wrap gap-y-5 items-center justify-between px-10 py-4 ">
                {steps.map((step, stepIdx) => (
                    <div key={step.id} className="flex-1 flex items-center">

                        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold ${step.status === "complete" ? "bg-blue-500" : step.status === "current" ? "bg-blue-300" : "bg-gray-300"} `}>
                            {step.status === "complete" ? "✓" : step.id}
                        </div>


                        <div className="ml-2 text-sm font-medium whitespace-nowrap">
                            {step.name}
                        </div>

                        {/* Line */}

                        <div className={`flex-1 h-[2px] mx-2  ${step.status === "complete" ? "bg-blue-500" : "bg-gray-300"}`}></div>

                    </div>
                ))}
            </div>

            <div className="flex justify-between flex-wrap">

                <div className="p-5 flex flex-col gap-5  mx-auto md:mx-0                ">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className='text-lg font-bold ps-2'>Name</label>
                        <input className='py-3 w-full md:w-[400px] border bg-white border-gray-500  rounded-2xl px-4 font-semibold outline-none  ' type="text" name="Coursename" id="name" placeholder='Enter Course Name' onChange={hendleinput} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="Description" className='text-lg font-bold ps-2'>Description</label>
                        <textarea className='py-3 w-full md:w-[400px]  border bg-white  border-gray-500  rounded-2xl px-4 font-semibold outline-none' type="text" name="Description" id="Description" placeholder='Description' onChange={hendleinput}></textarea>
                    </div>

                    <div className="flex flex-col gap-2 border-b border-gray-400 pb-5 w-fit">
                        <label htmlFor="Thumbnail" className='text-lg font-bold ps-2'>Add Thumbnail</label>
                        <input className='py-3 w-full md:w-[400px] border-none text-blue-500 bg-white   rounded-2xl px-4 font-semibold outline-none  ' type="file" accept="image/png, image/jpeg"  name="image" id="Thumbnail" placeholder={`${<MdOutlineUpload />} Uplod Thumbnail Image`} onChange={hendlefile} />
                        <p className='text-lg text-gray-500'>Recommended Image size : 400px  x 300px , png or jpeg file</p>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        <div className="flex flex-col gap-2 w-full sm:w-fit">
                            <label htmlFor="Category" className='text-lg font-bold ps-2'>Category</label>
                            <select name="Category" id="Category" onChange={hendleinput} className='py-3 w-full sm:w-[200px] border bg-white border-gray-500  rounded-2xl px-4 font-semibold outline-none'>
                                <option value="">Select Category</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Design">Design</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2  w-full sm:w-fit">
                            <label htmlFor="SubCategory" className='text-lg font-bold ps-2'>Sub Category</label>
                            <select name="SubCategory" id="SubCategory" onChange={hendleinput} className='py-3 w-full sm:w-[200px] border bg-white border-gray-500  rounded-2xl px-4 font-semibold outline-none'>
                                <option value="">Select Category</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Design">Design</option>
                            </select>
                        </div>

                    </div>

                    <input className='py-3 w-full md:w-[400px] border-none text-blue-500 bg-white   rounded-2xl px-4 font-semibold outline-none  ' type="text" name="anothercategory" onChange={hendleinput} id="Thumbnail" placeholder={` Add another category`} />


                </div>

                <div className=" bg-white w-72 h-96 py-5 px-2 mx-auto  rounded-2xl shadow-lg m-5">
                    <h1 className='text-xl font-bold'>Featurs</h1>
                    <ul className=' ps-5 text-lg text-gray-600 mt-3 flex flex-col gap-2'>
                        <li className='flex items-center gap-2'><FaCheckCircle color='green' />Allow offline download</li>
                        <li className='flex items-center gap-2'><FaCheckCircle color='green' />Create installments</li>
                        <li className='flex items-center gap-2'><FaCheckCircle color='green' />Promote course with trial</li>
                        <li className='flex items-center gap-2'><FaCheckCircle color='green' />Conduct LIVE classes</li>
                        <li className='flex items-center gap-2'><FaCheckCircle color='green' />Allow course preview</li>
                        <li className='flex items-center gap-2'><FaCheckCircle color='green' />Limit course access</li>
                    </ul>
                </div>

            </div>


            <div className="flex justify-between flex-wrap bg-white p-5 rounded-2xl shadow-lg m-5 relative bottom-0">

                <button className='text-[#7C86FF] flex items-center content-center border border-[#7C86FF] text-lg font-bold py-3 px-6 rounded-2xl  transition-colors duration-300' onClick={() => { go("/admin/courses") }}>
                    <GrFormPreviousLink fontSize={30} /> Previous
                </button>

                <div className="flex flex-wrap">
                    <div className="flex  content-center items-center flex-row-reverse gap-2 ">
                        <label htmlFor="t&c" className='text-black font-semibold'>I have read and aggry to <span className='text-blue-500 underline'>The T&C</span></label>
                        <input type="checkbox" name="" id="t&c" onClick={() => { setTermcondication(!Termcondication) }} />
                    </div>

                    <button className={`bg-[#7C86FF] flex items-center content-center text-white font-bold py-3 px-6 text-lg rounded-2xl hover:bg-[#6a74e0] transition-colors duration-300   ms-5  `} onClick={handlesubmit}   >
                        Edit Price<GrFormNextLink fontSize={30} />
                    </button>
                </div>

            </div>
        </>
    )
}

export default Createanewcourse
