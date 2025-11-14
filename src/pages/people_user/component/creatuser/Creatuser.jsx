import React, { useState } from 'react'
import { MdOutlineUpload } from "react-icons/md";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from '../../../../components/storeslice/Detalesslice';
import { addUser } from '../../../../components/storeslice/CreateUser';
import axios from 'axios';

function Createuser() {
    const [Termcondication, setTermcondication] = useState(false)
    const [inputdata, setinputdata] = useState([])
    let Dispatch = useDispatch()
    let selector = useSelector(state => state.User)
    let go = useNavigate()

    let hendleinput = (e) => {
        setinputdata({ ...inputdata, [e.target.name]: e.target.value })
    }

    let handlesubmit = () => {
        if (!Termcondication) {
            alert(" Please accept Terms & Conditions");
            return;
        }

        if (!inputdata.name || !inputdata.contactNo || !inputdata.registrdata) {
            alert(" Please fill all required fields");
            return;
        }else if (inputdata.contactNo.length !==10){
            
            alert(" 10 desires are required");
        }
         else {
             //  Dispatch(addUser(inputdata))
             //  go("/users")
             
             axios.post("http://localhost:5000/users",inputdata).then((res)=>{
                 // alert(res.data.msg)
                 if(res.data.status=== true){
                 alert(" Submit");
                 go("/users")
                 }else{
                     alert(" Submit");
                 }

            }).catch((errer)=>console.log(errer))
        }
    }


    return (
        <>
            <div className="flex justify-between flex-wrap">

                <div className="p-5 flex flex-col gap-5 w-full md:w-fit ">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className='text-lg font-bold ps-2'>Username name</label>
                        <input className='py-3 w-full md:w-[400px] border bg-white border-gray-500  rounded-2xl px-4 font-semibold outline-none  ' type="text" name="name" id="Batchname" placeholder='Enter User Name' onChange={hendleinput} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="subject" className='text-lg font-bold ps-2'>Phone Number</label>
                        <input className='py-3 w-full md:w-[400px] border bg-white border-gray-500  rounded-2xl px-4 font-semibold outline-none  ' type="number" name="contactNo" id="subject" placeholder='Phome Number 91+' onChange={hendleinput} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="registrdata" className='text-lg font-bold ps-2'>Registrdata</label>
                        <input className='py-3 w-full md:w-[400px] border bg-white border-gray-500  rounded-2xl px-4 font-semibold outline-none  ' type="date" name="registrdata" id="registrdata" placeholder='registrdata' onChange={hendleinput} />
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


            <div className="flex justify-between space-y-5 flex-wrap bg-white p-5 rounded-2xl shadow-lg m-5 relative -bottom-3/12">

                <button className='text-[#7C86FF] flex items-center content-center border border-[#7C86FF] text-lg font-bold py-3 px-6 rounded-2xl  transition-colors duration-300' onClick={() => { go("/users") }}>
                    <GrFormPreviousLink fontSize={30} /> Previous
                </button>

                <div className="flex flex-wrap space-y-6">
                    <div className="flex  content-center items-center flex-row-reverse gap-2 ">
                        <label htmlFor="t&c" className='text-black font-semibold'>I have read and aggry to <span className='text-blue-500 underline'>The T&C</span></label>
                        <input type="checkbox" name="" id="t&c" onClick={() => { setTermcondication(!Termcondication) }} />
                    </div>

                    <button className={`bg-[#7C86FF] flex items-center content-center text-white font-bold py-3 px-6 text-lg rounded-2xl hover:bg-[#6a74e0] transition-colors duration-300   ms-5  `} onClick={handlesubmit}   >
                        Submit<GrFormNextLink fontSize={30} />
                    </button>
                </div>

            </div>
        </>
    )
}

export default Createuser
