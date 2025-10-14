import React, { useState } from "react";
import { BsExclamationTriangleFill, BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { IoMdCheckmarkCircle } from "react-icons/io";



const MyProfile = ({ onClick }) => {
    const userData = {
        basicInfo: {
            name: "MAPTREE",
            email: "sunrisesolutionsjpr@gmail.com",
            mobile: "+918619868141",
            about: "",
            status: "warning",
        },
        qualification: {
            specialization: "",
            qualification: "",
            experience: "12",
            status: "warning",
        },
        bankDetails: {
            beneficiaryName: "MAPTREE",
            accountNumber: "1821221517223988",
            ifscCode: "AUBL0002215",
            status: "success",
        },
    };
    const [brandingEnabled, setBrandingEnabled] = useState(false);

    return (
        <div className="fixed h-full right-0 z-50">
            <div className="bg-white  h-full rounded-lg shadow-lg p-5 relative overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-lg font-semibold">My Profile</h2>
                    <button
                        onClick={onClick}
                        className="text-gray-500 hover:text-gray-700 text-xl px-2 py-1 rounded shadow-2xl shadow-neutral-900 hover:shadow-green-500"
                    >
                        ✕
                    </button>
                </div>

                {/* body   */}

                <div className="bg-gray-50 p-4 my-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3 className="flex items-center text-md font-semibold text-gray-800">
                            Tax Details {userData.basicInfo.status === "warning" && <BsExclamationTriangleFill className="text-yellow-500 ml-1" />
                            }
                        </h3>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            Edit
                        </button>
                    </div>

                    <div className="flex text-start gap-3">
                        <p>Name:</p>
                        <p>{userData.basicInfo.name}</p>
                    </div>
                    <div className="flex text-start gap-3">
                        <p>Email:</p>
                        <p>{userData.basicInfo.email}</p>
                    </div>
                    <div className="flex text-start gap-3">
                        <p>Mobile:</p>
                        <p>{userData.basicInfo.mobile}</p>
                    </div>
                    <div className="flex text-start gap-3">
                        <p>About:</p>
                        <p>{userData.basicInfo.about}</p>
                    </div>

                </div>

                <div className="bg-gray-50 p-4 my-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3 className="flex items-center text-md font-semibold text-gray-800">
                            Qualification & Experience {userData.basicInfo.status === "warning" && <BsExclamationTriangleFill className="text-yellow-500 ml-1" />
                            }
                        </h3>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            Edit
                        </button>
                    </div>

                    <div className="flex text-start gap-3">
                        <p>Name:</p>
                        <p>{userData.qualification.specialization}</p>
                    </div>
                    <div className="flex text-start gap-3">
                        <p>Email:</p>
                        <p>{userData.basicInfo.qualification}</p>
                    </div>
                    <div className="flex text-start gap-3">
                        <p>Mobile:</p>
                        <p>{userData.basicInfo.experience}</p>
                    </div>


                </div>

                <div className="bg-gray-50 p-4 my-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3 className="flex items-center text-md font-semibold text-gray-800">
                            Bank Details {userData.bankDetails.status === "success" &&
                                <IoMdCheckmarkCircle className="text-green-600 ml-1" />}
                        </h3>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            Edit
                        </button>
                    </div>

                    <div className="flex text-start gap-3">
                        <p>Name:</p>
                        <p>{userData.bankDetails.beneficiaryName}</p>
                    </div>
                    <div className="flex text-start gap-3">
                        <p>Email:</p>
                        <p>{userData.bankDetails.accountNumber}</p>
                    </div>
                    <div className="flex text-start gap-3">
                        <p>Mobile:</p>
                        <p>{userData.bankDetails.ifscCode}</p>
                    </div>


                </div>


                <div className="bg-gray-50 p-4 my-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3 className="flex items-center text-md font-semibold text-gray-800">
                            Tax Details <BsExclamationTriangleFill className="text-yellow-500 ml-1" />
                        </h3>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            Edit
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyProfile;