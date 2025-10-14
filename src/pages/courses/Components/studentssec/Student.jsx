import React from 'react'
import { FaUsers } from 'react-icons/fa'
import { GrDocumentCsv } from 'react-icons/gr'
import { PiStudentFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'

function Student({ onClick }) {
  return (
    <div className="fixed  bg-white right-0 z-50 ">
      <div className="flex justify-between items-center border-b pb-2 p-5">
                    <h2 className="text-lg font-semibold">Add Document</h2>
                    <button
                        onClick={onClick}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ✕
                    </button>
                </div>
      <div className=" w-[250px] sm:w-[400px] overflow-auto rounded-lg shadow-lg p-5 relative h-[89vh]" >
        <div className=" flex  flex-col gap-5">

          <Link to="/addstudents" className="Addstudent cursor-pointer bg-white w-full p-5 h-48 rounded-2xl text-center flex shadow-2xl shadow-gray-200 flex-col justify-center">
            <h1 className='text-5xl  text-blue-500 '><PiStudentFill className='mx-auto' /></h1>
            <h1 className='font-semibold'>Add Student Menually</h1>
          </Link>

          <div className="Addstudent cursor-pointer bg-white w-full p-5 h-48 rounded-2xl text-center flex flex-col justify-center shadow-2xl shadow-gray-200">
            <h1 className='text-5xl  text-blue-500 '><FaUsers className='mx-auto' /></h1>
            <h1 className='font-semibold'>Add Student from Registered User</h1>
          </div>

          <div className="Addstudent cursor-pointer bg-white w-full p-5 h-48 rounded-2xl text-center flex flex-col justify-center shadow-2xl shadow-gray-200">
            <h1 className='text-5xl  text-blue-500 '><GrDocumentCsv className='mx-auto' /></h1>
            <h1 className='font-semibold'>Add CSV File</h1>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Student
