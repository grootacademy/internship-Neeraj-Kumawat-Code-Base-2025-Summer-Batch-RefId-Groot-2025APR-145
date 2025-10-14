import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Payment() {
    const [isUpcoming, setIsUpcoming] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [isUnpaid, setIsUnpaid] = useState(true);
    const [usercheckoutdata, setUserCheckoutData] = useState([]);

    useEffect(() => {
        axios.get("https://classplut2.onrender.com/checkoutget", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then((res) => {
            setUserCheckoutData(res.data.data);
        });
    }, [])

    console.log(usercheckoutdata);
    return (
        <div>
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

                {/* ====== Sidebar Menu (mocked) ====== */}
                <aside className="w-full lg:w-64 bg-white  flex-col">
                    <div className={`p-4 font-bold text-lg border-b cursor-pointer ${isUnpaid ? 'text-blue-600 bg-blue-50 font-medium border-l-4 border-blue-500' : ''}`} onClick={() => { setIsUnpaid(true); setIsUpcoming(false); setIsPaid(false); }}>UnPaid</div>
                    <div className={`p-4 font-bold text-lg border-b cursor-pointer ${isUpcoming ? 'text-blue-600 bg-blue-50 font-medium border-l-4 border-blue-500' : ''}`} onClick={() => { setIsUnpaid(false); setIsUpcoming(true); setIsPaid(false); }}>UpComming</div>
                    <div className={`p-4 font-bold text-lg  cursor-pointer ${isPaid ? 'text-blue-600 bg-blue-50 font-medium border-l-4 border-blue-500' : ''}`} onClick={() => { setIsUnpaid(false); setIsUpcoming(false); setIsPaid(true); }} >Paid</div>
                </aside>



                {/* ====== Main Content ====== */}
                <main className="flex-1 p-6 space-y-6">

                    {
                        isUnpaid && <h1 className='text-2xl font-bold'>UnPaid Page Coming Soon...</h1>
                    }
                    {
                        isUpcoming && <h1 className='text-2xl font-bold'>UpComming Page Coming Soon...</h1>
                    }
                    {
                        isPaid && <>
                       { usercheckoutdata.length === 0 ? 
                            <h1 className='text-2xl font-bold'>No Paid Records Found</h1>
                        : 
                            <div>
                                <h1 className='text-2xl font-bold mb-5'>Paid Records</h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {usercheckoutdata.map((item) => (
                                        <div key={item._id} className="border p-4 rounded shadow bg-white">
                                            <h2 className="text-lg font-semibold mb-2">{item.courseName}</h2>
                                            <p><span className="font-medium">Name:</span> {item.fname} {item.lname}</p>
                                            <p><span className="font-medium">Email:</span> {item.email}</p>
                                            <p><span className="font-medium">Mobile:</span> {item.mobile}</p>
                                            <p><span className="font-medium">Address:</span> {item.address}, {item.city}, {item.state}, {item.pincode}, {item.country}</p>
                                            <p><span className="font-medium">Date:</span> {item.date}</p>
                                            <p><span className="font-medium">Payment ID:</span> {item.paymentId}</p>
                                            <p><span className="font-medium">Amount Paid:</span> ₹{item.totalAmount}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                        
                        </>
                    }

                </main>

            </div>
        </div>
    )
}

export default Payment
