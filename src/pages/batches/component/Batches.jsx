import React, { useEffect, useState } from 'react'
import { CiMenuKebab } from "react-icons/ci";
import { RiAddLargeLine } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Batches = () => {
    const go = useNavigate();
    const [batches, setbatches] = useState([])
    const [Allbatches, setAllbatches] = useState([])
    const [openMenuIndex, setOpenMenuIndex] = useState(null); // NEW

    async function getbatchesdata() {
        try {
            axios.get("http://localhost:5000/getbatch").then((res) => {
                setbatches(res.data.batch)
                setAllbatches(res.data.batch)
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


    const SortBatches = (e) => {
        const value = e.target.value;
        let stordata = [...batches]
        if (value === "A") {
            setbatches(stordata.sort((a, b) => a.Batchname.localeCompare(b.Batchname)));
        } else if (value === "Z") {
            setbatches(stordata.sort((a, b) => b.Batchname.localeCompare(a.Batchname)));
        }
        setbatches(stordata)
    };

    const searchbar = (e) => {
        let value = e.target.value
        if (!value) {
            setbatches(Allbatches)
        } else {
            let filterdata = Allbatches.filter((user) => user.Batchname.toLowerCase().includes(value.toLowerCase()))
            setbatches(filterdata)
        }
    }

    const Exploedata = (item) => {
        go("/admin/Addstudentsinbatch", { state: { batch: item } })
        setOpenMenuIndex(null)
    }

    return (
        <div>
            <div className=''>
                <div className="border-b-6 border-gray-500 mb-2 px-5 py-2 rounded-br-4xl rounded-bl-4xl text-center">
                    <h1 className='text-2xl xl:text-4xl text-black font-bold'>
                        Your Batches <span className='text-[#7C86FF]'>({batches.length})</span>
                    </h1>
                    <h5 className='text-xl xl:text-2xl text-gray-500'>
                        Add / View Batches inside
                    </h5>

                    <div className="pt-10 pb-5 flex flex-wrap justify-between gap-1 sm:gap-2 xl:gap-6 sm:static">
                        <div className="flex flex-wrap gap-1">
                            <input
                                type="text"
                                placeholder='Select By Name'
                                className='py-2 px-4 rounded-sm w-[100px] sm:w-[150px] xl:w-[300px] border border-gray-300 outline-none bg-white'
                                onChange={searchbar}
                            />

                            <select
                                defaultValue="sort"
                                onChange={SortBatches}
                                className='py-2 px-1 sm:px-4 bg-white border border-gray-300 outline-none rounded'
                            >
                                <option value=" ">Sort By</option>
                                <option value="A">Ascending</option>
                                <option value="Z">Descending</option>
                            </select>

                            <select className='py-2 px-1 sm:px-4 bg-white border border-gray-300 outline-none rounded'>
                                <option value="">Filter</option>
                                <option value="">RAS</option>
                                <option value="">SSC CGL</option>
                            </select>
                        </div>

                        <div className="flex gap-1">
                            <button className='bg-white flex gap-3 items-center border-2 border-amber-400 text-xl text-black py-2 px-2 rounded-sm sm:w-[150px]'>
                                <FaRegStar color='orange' /> Featured
                            </button>
                            <button
                                className='bg-[#7C86FF] text-white text-lg font-bold py-2 px-2 rounded-sm sm:w-[150px]'
                                onClick={() => { go("/admin/newbatches") }}
                            >
                                Create Batch
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl flex flex-wrap p-5 justify-center gap-8 pt-5 transition-all duration-300 ">
                {batches.map((batch, index) => (
                    <div key={index} className="relative bg-white shadow-lg p-4 rounded-2xl w-[400px] h-60 space-y-3 overflow-hidden hover:shadow-2xl transition" onClick={()=>go("/admin/explorbatches" , 
                                        {state:batch}
                                    )}>
                        <div className="py-4 flex justify-between"  >
                            <h2 className="text-2xl font-bold mb-2">{batch.Batchname}</h2>
                            <h2
                                className="text-xl cursor-pointer font-bold mb-2"
                                onClick={() => {
                                    setOpenMenuIndex(openMenuIndex === index ? null : index);
                                }}
                            >
                                <CiMenuKebab />
                            </h2>
                        </div>

                        <p>{batch.subject}</p>
                        <div className="py-4 flex gap-3 items-center">
                            <h2 className="text-xl font-bold text-[#7C86FF]"><RiAddLargeLine /></h2>
                            <h2 className="text-xl font-bold">{batch.students}</h2>
                        </div>

                        {/* Dropdown Menu */}
                        {openMenuIndex === index && (
                            <div className="absolute top-14 right-0 z-10 bg-white  rounded-md shadow-lg p-3 space-y-2">
                                <p  className="block text-black text-sm border-b-1 border-gray-400 border-dashed font-semibold hover:text-blue-600" onClick={() => {
                                    setOpenMenuIndex(null)
                                    go("/admin/explorbatches" , 
                                        {state:batch}
                                    )
                                }}>View Batch</p>
                                <p className="block text-black text-sm border-b-1 border-gray-400 border-dashed font-semibold hover:text-blue-600" onClick={()=>{Exploedata(batch)}}>Add More Students</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Batches;
