import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addfolder } from "../../../../../components/storeslice/Addfolders";
import { toast } from "react-toastify";

const AddFolderModal = ({  onClick }) => {
    const [folderName, setFolderName] = useState([]);
    let dispatch = useDispatch()

    let inputdata = (e) =>{
        // console.log(e.target.value)

        setFolderName({...folderName,[e.target.name]:e.target.value})

    }

    return (
        <div className="fixed h-full  right-0 z-50 m-2">
            <div className="bg-white w-[400px] h-full rounded-lg shadow-lg p-5 relative">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg font-semibold">Add Folder</h2>
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
                        Folder name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter folder name"
                        name="data"
                        onChange={inputdata}
                        className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Base Info
                    </label>
                    <input
                        type="text"
                        placeholder="Enter folder name"
                        name="info"
                        onChange={inputdata}
                        className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Footer */}
                <div className="flex justify-end  mt-6 ">
                    <button
                        className={`px-4 py-2 rounded-md text-white font-medium ${folderName.data
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-blue-300 cursor-not-allowed"
                            }`}
                        disabled={!folderName.data}
                        onClick={() => {
                            setFolderName("");
                            onClick();
                            dispatch(addfolder(folderName))
                            toast.success("Added")
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddFolderModal;
