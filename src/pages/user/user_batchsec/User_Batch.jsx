import React, { useEffect, useState } from 'react'
import { CiMenuKebab } from "react-icons/ci";
import { RiAddLargeLine } from "react-icons/ri";
import { FaRegStar, FaSortAlphaDownAlt, FaSortAlphaUp } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const User_Batch = () => {
    const go = useNavigate();
    const [batches, setbatches] = useState([])
    const [openMenuIndex, setOpenMenuIndex] = useState(null); // NEW

    async function getbatchesdata() {
        try {
            axios.get("http://localhost:5000/userBatches",{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then((res) => {
                setbatches(res.data.batch)
                // setAllbatches(res.data.batch)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getbatchesdata()
    }, [])

    // Get local storage data
    let getdata = JSON.parse(localStorage.getItem("reduxState"));
    let concket = getdata ? [...batches, ...(getdata.addbatch || [])] : batches;


console.log(batches)



    const Exploedata = (item) => {
        go("/user/Explorbatch", { state: { batch: item } })
        setOpenMenuIndex(null)
    }

    return (
        <div className="p-10 ">
            <div className="mb-5 border-b pb-5 flex justify-between items-center  px-10 md:px-20">
                <div className="">
                    <h1 className='text-3xl font-bold'>Batches</h1>
                    <p className='text-gray-600'>Manage your batches efficiently</p>
                </div>

                <div className="">
                    <input type="text " className='border p-2 rounded-md w-80' placeholder='Search Batches...' />
                </div>

                <div className="">
                    <button className="p-2 border rounded-md flex contain-content items-center gap-3"><FaSortAlphaDownAlt />Sort</button>
                    {/* <button className="p-2 border rounded-md flex contain-content items-center"><FaSortAlphaUp />Sort</button> */}
                </div>
            </div>

            {/* Cards Container */}



            <div className="rounded-2xl flex justify-center flex-wrap p-5 gap-20 pt-5 transition-all duration-300 ">
                {batches.map((batch, index) => (
                    <div key={index} onClick={() => Exploedata(batch)} className="relative flex flex-col justify-around bg-white shadow-lg p-4 rounded-2xl w-[400px] h-60 space-y-3 overflow-hidden hover:shadow-2xl transition" >
                        <div className="py-4 flex justify-between">
                            <h2 className="text-2xl font-bold mb-2">{batch.Batchname}</h2>

                        </div>

                        {/* <p>{batch.subject}</p> */}
                        <div className="py-4 flex gap-3 items-center">

                            <h2 className="text-sm bg-orange-400 p-2 rounded-2xl font-bold">One Roof Education</h2>
                        </div>


                    </div>
                ))}
            </div>
          
        </div>
    );
};

export default User_Batch;
