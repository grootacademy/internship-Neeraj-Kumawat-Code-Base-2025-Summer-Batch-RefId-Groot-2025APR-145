import React, { useState } from "react";

const AddC_onlinetest = ({  onClick }) => {
    const [onlinetest, setonlinetest] = useState("")


    return (
        <div className="fixed h-full  right-0 z-50">
            <div className="bg-white w-[250px] sm:w-[400px] h-full rounded-lg shadow-lg p-5 relative">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg font-semibold">Add OnlineTest</h2>
                    <button
                        onClick={onClick}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Online test
                    </label>
                    <input
                        type="text"
                        placeholder="Enter folder name"
                        value={onlinetest}
                        onChange={(e) => setonlinetest(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Footer */}
                <div className="flex justify-end  mt-6 ">
                    <button
                        className={`px-4 py-2 rounded-md text-white font-medium ${onlinetest.trim()
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-blue-300 cursor-not-allowed"
                            }`}
                        disabled={!onlinetest.trim()}
                        onClick={() => {
                            setonlinetest("");
                            onClose();
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddC_onlinetest;
