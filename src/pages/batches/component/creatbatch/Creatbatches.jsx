import React, { useEffect, useState } from 'react'
import { MdOutlineUpload } from "react-icons/md";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
// import { Addnewbatch } from '../../../../components/storeslice/Addbatch';
import axios from 'axios';
import AddStudents from './Addstudents';

function Creatbatches() {
    const [Termcondication, setTermcondication] = useState(false)
    const [usersdata, setusersdata] = useState([]);
    const [isselectuser, setisselectuser] = useState(false)
    const [isaddstudent, setisaddstudent] = useState(false)
    const [inputdata, setinputdata] = useState({
        Batchname: "",
        subject: "",

    })
    let go = useNavigate()
    let hendleinput = (e) => {
        const { name, value } = e.target;
        setinputdata((prev) => ({
            ...prev,
            [name]: value
        }));
    };



    let handlesubmit = () => {
        if (!Termcondication) {
            alert(" Please accept Terms & Conditions");
            return;
        }

        if (!inputdata.Batchname || !inputdata.subject) {
            alert(" Please fill all required fields");
            return;
        }

        axios.post("https://classplut2.onrender.com/batch", inputdata).then((res) => {
            alert(res.data.msg,"jyju")
        
        }).catch((errer => console.log(errer)))

        go(-1)

    }







    return (
        <>
            <div className="flex justify-between flex-wrap">

                <div className="p-5 flex flex-col gap-5 mx-auto  md:mx-0 w-full md:max-w-fit">
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="name" className='text-lg font-bold ps-2'>Batch name</label>
                        <input className='py-3 w-full md:w-[400px] border bg-white border-gray-500  rounded-2xl px-4 font-semibold outline-none  ' type="text" name="Batchname" value={inputdata.Batchname} id="Batchname" placeholder='Enter Batch Name' onChange={hendleinput} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="subject" className='text-lg font-bold ps-2'>Subject</label>
                        <input className='py-3 w-full md:w-[400px] border bg-white border-gray-500  rounded-2xl px-4 font-semibold outline-none  ' type="text" name="subject" id="subject" value={inputdata.subject} placeholder='Enter subject Name' onChange={hendleinput} />
                    </div>

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


            <div className="flex justify-between  space-y-5 md:space-y-0  flex-wrap bg-white p-5 rounded-2xl shadow-lg m-5 relative -bottom-3/12">

                <button className='text-[#7C86FF] flex items-center content-center border border-[#7C86FF] text-lg font-bold py-3 px-6 rounded-2xl  transition-colors duration-300' onClick={() => { go(-1) }}>
                    <GrFormPreviousLink fontSize={30} /> Previous
                </button>

                <div className="flex flex-wrap space-y-6 md:space-y-0">
                    <div className="flex  content-center items-center flex-row-reverse gap-2 ">
                        <label htmlFor="t&c" className='text-black font-semibold'>I have read and aggry to <span className='text-blue-500 underline'>The T&C</span></label>
                        <input type="checkbox" name="" id="t&c" onClick={() => { setTermcondication(!Termcondication) }} />
                    </div>

                    <button className={`bg-[#7C86FF] flex items-center content-center text-white font-bold py-3 px-6 text-lg rounded-2xl hover:bg-[#6a74e0] transition-colors duration-300   ms-5  `} onClick={handlesubmit}   >
                        Submit <GrFormNextLink fontSize={30} />
                    </button>
                </div>

            </div>

        </>
    )
}

export default Creatbatches
