import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Singup() {
    const [inputdata, setInputData] = useState([]);

    const handleInput = (e) => {
        setInputData({ ...inputdata, [e.target.name]: e.target.value });

    };

    let handleLogin = ()=>{

    }

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
                <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
                    Login To One Roof Education
                </h2>

                <form onSubmit={handleLogin} className="space-y-5">
                    {/* Mobile Number */}


                    <div className="">

                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                placeholder="Enter name"
                                name="username"
                                onChange={handleInput}
                                required
                                className="w-full p-3 border border-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Phonenumber</label>
                            <input
                                type="text"
                                placeholder="Phone Number 91+9876"
                                name="Phonenumber"
                                onChange={handleInput}
                                required
                                className="w-full p-3 border border-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                placeholder="Enter name"
                                name="username"
                                onChange={handleInput}
                                required
                                className="w-full p-3 border border-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={handleInput}
                                required
                                className="w-full p-3 border border-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                    </div>

                    {/* Login Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-5 font-bold bg-blue-500 text-white py-3 rounded-lg  hover:bg-blue-600 transition"
                        >
                            Login with OTP
                        </button>
                    </div>
                </form>

                {/* OR Divider */}
                <div className="flex justify-center my-6">
                    <span className="px-3 text-gray-500 text-center text-sm">OR</span>
                </div>

                {/* Login with Email */}
                <div className="flex justify-center">
                    <button className=" text-blue-500 py-3 rounded-lg font-semibold hover:text-blue-600   ">
                        <Link to="/login">Login with Email</Link>
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    By signing up, you agree to our{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                        T&C
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                        Privacy Policy
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Singup
