import React, { useState } from "react";

const Addc_ImportContent = ({ onClick }) => {
    const [liveclass, setliveclass] = useState("")

    const liveclasses = [
        { id: 1, Classname: "Testing", Duration: "00:04:04" },
        { id: 2, Classname: "Live", Duration: "38:30" },
        { id: 3, Classname: "live", Duration: "00:42:45" },
        { id: 4, Classname: "Operating System", Duration: "0150:54" },
        { id: 5, Classname: "Live Class ", Duration: "33:04:45" },
    ];

    return (
        <div className="fixed h-full  right-0 z-50">
            <div className="bg-white w-[250px] sm:w-[600px] h-full rounded-lg shadow-lg p-5 relative">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg font-semibold">Add Live Classes</h2>
                    <button
                        onClick={onClick}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}

                {
                    liveclasses.map((item, index) => {
                        return (
                            <div className="flex  content-center  items-center gap-2.5 py-3" key={index}>
                                <input type="checkbox" name="" id="" />
                                <div className="">
                                    <h3 className="text-lg font-semibold ">{item.Classname}</h3>
                                    <p className="text-sm font-semibold">{item.Duration}</p>
                                </div>
                            </div>
                        )
                    })
                }

                {/* Footer */}
                <div className="flex justify-end  mt-6 ">
                    <button
                        className={`px-4 py-2 rounded-md text-white font-medium ${liveclass.trim()
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-blue-300 cursor-not-allowed"
                            }`}
                        disabled={!liveclass.trim()}
                        onClick={() => {
                            setliveclass("");
                            onClick();
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Addc_ImportContent;
