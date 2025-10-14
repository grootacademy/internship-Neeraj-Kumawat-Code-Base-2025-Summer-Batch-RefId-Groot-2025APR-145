import React, { useEffect, useState } from 'react'
import AdvanceOpt from './AdvanceOpt';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';


function CreatCpriceSec() {
    let go =useNavigate()
    const [Advanceopt, setAdvanceopt] = useState(false)
    const [Termcondication, setTermcondication] = useState(false)
    const [inputvalue, setinputvalue] = useState({})
    const [paymenttype, setpaymenttype] = useState(true)
    const [Errors, setErrors] = useState()
    let location =useLocation()
    const [Coursebhienddetales, setCoursebhienddetales] = useState()
    useEffect(() => {
    setCoursebhienddetales(location.state)
    }, [])

    // let coursedata= location.state
    const steps = [
        { id: 1, name: "Basic Information", status: "complete" },
        { id: 2, name: "Edit Price", status: "current" },
        { id: 3, name: "Add Content", status: "upcoming" },
        { id: 4, name: "Bundle (Optional)", status: "upcoming" },
    ];

    let Henelinputs = (e) => {
        setinputvalue({ ...inputvalue,[e.target.name]: e.target.value })
        
    }
    

  let handlesubmit = () => {
    const newErrors = {};

    if (!inputvalue.CourseType){ 
            toast.error("Please select Course Type.");
    }else
    if (!inputvalue.Duraction_Type){
        toast.error("Select Course Duration Type.")
    }else
    if (!inputvalue.Course_Duraction || inputvalue.Course_Duraction <= 0) {
        toast.error("Enter valid duration (> 0).")
    }else if (!inputvalue.CruntPrice || inputvalue.CruntPrice < 1){
        toast.error("Price must be at least ₹1.")
    }else if (inputvalue.Dicsountprice < 0){
         toast.error("Discount cannot be negative.")
    }else if (!inputvalue.Effectiveprice || inputvalue.Effectiveprice < 0) {
        toast.error("Effective Price must be positive.")
    }else{
        let joindaata = {...Coursebhienddetales,...inputvalue}
        go("/admin/addcontent",{state:joindaata})
    toast.success("Form Submitted Successfully!");
    }

   

    
   
};



    return (
        <div className='p-3'>
            <ToastContainer />

            <div className="p-3">
                <h1 className='p-3 font-semibold'>Add /View Content of your Course</h1>
                <div className="w-full flex flex-wrap gap-y-5 items-center justify-between px-10 py-4">
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

                <div className="bg-white w-full ">
                    <div className=" space-y-5 p-5 border-b  border-gray-500">
                        <h1 className='p-3 font-semibold'>Course Type</h1>
                        <div className="px-5">
                            <input
                                type="radio"
                                name="CourseType"
                                id="paid"
                                value="Paid"
                                onChange={Henelinputs}
                            />
                            <label htmlFor="paid" className='font-semibold pe-10'>Paid Course</label>

                            <input
                                type="radio"
                                name="CourseType"
                                id="free"
                                value="Free"
                                onChange={Henelinputs}
                            />
                            <label htmlFor="free" className='font-semibold'>Free Course</label>
                        </div>


                        <div className="">
                            <h1 className='p-3 font-semibold'>Course Duration Type</h1>
                            <select name="Course_Category" id="Category" onChange={Henelinputs} className='py-3 w-full max-w-2xl border bg-white border-gray-500  rounded-2xl px-4 font-semibold outline-none'>
                                <option value="Single">Single Validity</option>
                                <option value="Fixed">Fixed Date Validity</option>
                                <option value="Lifetime ">Lifetime Validity</option>
                            </select>
                            <p className='italic text-gray-400'>Course will expire after a fixed period of time for all students based on their purchase date</p>
                            <input type="number" onChange={Henelinputs} className='py-2 w-full px-5 font-semibold max-w-sm border-1 outline-none rounded-2xl'placeholder='1'  name='Course_Duraction' />

                            <select name="Duraction_Type" onChange={Henelinputs} id="Category" className='py-3 w-full max-w-52 border bg-white border-gray-500  rounded-2xl px-4 font-semibold outline-none'>
                                <option value="Year">Year</option>
                                <option value="Month">Month</option>
                                <option value="Days">Days</option>
                            </select>
                        </div>

                        <div className="price flex  gap-5 flex-wrap">
                            <div className="flex flex-col w-full max-w-52">
                                <label htmlFor="price" className='font-semibold'>Price</label>
                                <input type="number" name="CruntPrice" onChange={Henelinputs} className='border-1 outline-none py-2 px-3 rounded-full font-semibold' id="price" placeholder='₹ 1' />
                            </div>
                            <div className="flex flex-col w-full max-w-52">
                                <label htmlFor="Dicsountprice">Price</label>
                                <input type="number" name="Dicsountprice" onChange={Henelinputs} className='border-1 outline-none py-2 px-3 rounded-full font-semibold' id="Dicsountprice" placeholder='₹ 0' />
                            </div>

                            <div className="flex flex-col w-full max-w-52">
                                <label htmlFor="Effectiveprice">Effective Price</label>
                                <input type="number" name="Effectiveprice" onChange={Henelinputs} className='border-1 outline-none py-2 px-3 rounded-full font-semibold' id="Effectiveprice" placeholder='₹ 1.03' />
                            </div>

                        </div>

                    </div>
                    <p className='text-blue-500 hover:to-blue-700 hover:underline font-semibold cursor-pointer p-5 text-center' onClick={() => { setAdvanceopt(true) }}>Advance Option</p>
                </div>
            </div>
            {
                Advanceopt &&
                <>
                    <div className=" absolute top-14">

                        <AdvanceOpt isOpen={open} onClick={() => setAdvanceopt(false)} />

                    </div>
                </>
            }
            <div className="flex justify-between flex-wrap bg-white p-5 rounded-2xl shadow-lg m-5 relative bottom-0">

                <button className='text-[#7C86FF] flex items-center content-center border border-[#7C86FF] text-lg font-bold py-3 px-6 rounded-2xl  transition-colors duration-300' onClick={() => { go("/admin/Addcourse") }}>
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
        </div>
    )
}

export default CreatCpriceSec
