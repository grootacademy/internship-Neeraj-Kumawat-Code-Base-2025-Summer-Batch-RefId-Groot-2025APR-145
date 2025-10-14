import React from 'react'

function Outlethadder(props) {
    return (
        <div>
            <div className=''>
                <div className=" border-b-6 border-gray-500  px-5 py-2 rounded-br-4xl xl:rounded-br-full  bg-cover " style={{ backgroundImage: "Url(" }}>


                    <h1 className='text-2xl xl:text-4xl text-black font-bold'>{props.name} </h1>
                    <h5 className=' text-xl xl:text-2xl text-gray-800'>{props.title} </h5>


                </div>
            </div>
        </div>
    )
}

export default Outlethadder
