import React from 'react'
import { RiFilter2Line } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
function Courses_heddder() {
let Go =useNavigate()
    const newcourse = () => {
       Go('/admin/Addcourse')
    }
    return (
        <div className=''>
            <div className="border-b-6 border-gray-500 mb-2  px-5 py-2 rounded-br-4xl rounded-bl-4xl  text-center">


                <h1 className='text-2xl xl:text-4xl text-black font-bold '>Your Course <span className='text-[#7C86FF]'>(28)</span></h1>
                <h5 className=' text-xl xl:text-2xl text-gray-500'>Add/View Courses of Your Brand  </h5>

                <div className="pt-10 pb-5 flex flex-wrap justify-between  gap-1 sm:gap-2 xl:gap-6   sm:static">
                    <div className="flex flex-wrap gap-1">
                        <input type="text" placeholder='Select By Name' className='py-2 px-4 rounded-sm  w-[100px] sm:w-[150px] xl:w-[300px] border border-gray-300 outline-none bg-white' />
                        <select name="" id=""  defaultValue="sort" className='py-2 px-1 sm:px-4 bg-white border border-gray-300 outlone-none rounded'>
                            <option value="" >Sort By</option>
                            <option value="">RAS</option>
                            <option value="">SSC CGL</option>
                        </select>
                        <select name="" id="" className='py-2 px-1 sm:px-4 bg-white border border-gray-300 outlone-none rounded'>
                            <option value="" >Filter</option>
                            <option value="">RAS</option>
                            <option value="">SSC CGL</option>
                        </select>
                    </div>

                    <div className="flex gap-1">
                        <button className='bg-white cursor-pointer flex gap-3 items-center border-2 border-amber-400 text-xl text-black py-2 px-2 rounded-sm sm:w-[150px]'><FaRegStar color='orange'  /> Featurted</button>
                        <button className='bg-[#7C86FF] cursor-pointer transition-transform hover:scale- text-white text-lg font-bold py-2  px-2 rounded-sm sm:w-[150px] ' onClick={newcourse}>Add Course</button>    
                    
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Courses_heddder
