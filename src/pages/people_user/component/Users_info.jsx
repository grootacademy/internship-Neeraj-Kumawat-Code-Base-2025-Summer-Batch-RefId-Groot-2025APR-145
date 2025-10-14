import React, { useEffect, useState } from 'react';
import { FaRegStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { CiMenuKebab } from "react-icons/ci";
import axios from 'axios';

function Users_info() {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [Ismenuopen, setIsmenuopen] = useState(false);
  // Fetch users
  const fetchUsersFromDB = async () => {
    try {
      const res = await axios.get("https://classplut2.onrender.com/allchatusers");
      setUsersData(res.data.data);
      setAllUsers(res.data.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsersFromDB();
  }, []);

  // console.log(usersData)
  // Sort users
  const handleSort = (e) => {
    const value = e.target.value;
    let sorted = [...usersData];
    if (value === "A") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === "Z") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    setUsersData(sorted);
  };

  // Search users
  const handleSearch = (e) => {
    const value = e.target.value.trim();
    if (!value) {
      setUsersData(allUsers);
    } else if (!/\d/.test(value)) {
      const filtered = allUsers.filter(user =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setUsersData(filtered);
    } else {
      const filtered = allUsers.filter(user =>
        user.contactNo.includes(value)
      );
      setUsersData(filtered);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="border-b-6 border-gray-500 mb-2 px-5 py-2 rounded-br-4xl rounded-bl-4xl text-center">
        <h1 className="text-2xl xl:text-4xl text-black font-bold">
          Users <span className="text-[#7C86FF]">({usersData.length})</span>
        </h1>
        <h5 className="text-xl xl:text-2xl text-gray-500">Add/View, filter, Manage your Users</h5>

        <div className="pt-10 pb-5 flex flex-col xl:flex-row justify-between gap-1 sm:gap-2 xl:gap-6">
          {/* Search and Filter */}
          <div className="flex flex-wrap gap-1">
            <input
              type="text"
              placeholder="Search by Name / Mobile Number"
              className="py-2 px-4 rounded-sm w-full md:w-[300px] border border-gray-300 outline-none bg-white"
              onChange={handleSearch}
            />
            <select
              onChange={handleSort}
              className="py-2 w-full md:w-fit sm:px-4 bg-white border border-gray-300 outline-none rounded"
            >
              <option value="">Sort</option>
              <option value="A">A-Z</option>
              <option value="Z">Z-A</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-1">
            <button className="bg-white flex gap-3 items-center border-2 border-amber-400 text-xl text-black py-2 px-2 rounded-sm sm:w-[150px]">
              <FaRegStar color="orange" /> Featured
            </button>
            <button
              className="bg-[#7C86FF] text-white text-lg font-bold py-2 px-2 rounded-sm sm:w-[150px]"
              onClick={() => navigate("/users/createusers")}
            >
              Create User
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:inline w-full">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-100">
              <td className="p-5 text-start text-2xl text-blue-500 font-bold">Username</td>
              <td className="p-5 text-start text-2xl text-blue-500 font-bold">Email</td>
              <td className="p-5 text-center text-2xl text-blue-500 font-bold">Registration Date</td>
              <td className="p-5 text-center text-2xl text-blue-500 font-bold">Buy</td>
              <td className="p-5 text-center text-2xl text-blue-500 font-bold">Payment Mode</td>
              <td className="p-5 text-center text-2xl text-blue-500 font-bold">Price</td>
              <td className="p-5 text-center text-2xl text-blue-500 font-bold">Action</td>
            </tr>
          </thead>
          <tbody>
            {usersData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">No users found.</td>
              </tr>
            ) : (
              usersData.map((user) => (
                <tr className="bg-white" key={user._id}>
                  <td className="flex gap-5 items-center p-2">
                    <input type="checkbox" />
                    <h1 className="px-4 py-3 rounded bg-red-300 text-white">
                      {user.fname.slice(0,1)}
                    </h1>
                    <div className="flex flex-col">
                      <p className="text-blue-500 pb-1">{user.fname} {user.lname}</p>
                      <p>{user.contactNo}</p>
                    </div>
                  </td>
                  <td className="text-start">{user.email}</td>
                  <td className="text-center">
                  {user.date}
                  </td>
                  <td className="text-center capitalize">{user.courseName || 'user'}</td>
                  <td className="text-center capitalize text-green-500">{user.paymentId ? "success" : "pending"}</td>
                  <td className="text-center">₹{user.totalAmount || '0.00'}</td>
                  <td className="text-center">
                    <CiMenuKebab className="text-2xl mx-auto cursor-pointer" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden w-full p-5">
        <h1 className="text-2xl font-bold">Users</h1>
        {usersData.length === 0 ? (
          <p className="text-center py-5 text-gray-500">No users found.</p>
        ) : (
          usersData.map((user) => (
            <div key={user._id} className="mb-4 border-b pb-3">
              <ul className="w-full flex justify-between items-center">
                <li className="flex gap-4 items-center">
                  <input type="checkbox" />
                  <h1 className="px-4 py-3 rounded bg-red-300 text-white">
                    {user.fname.slice(0,1)}
                  </h1>
                  <div className="flex flex-col">
                    <p className="text-blue-500 pb-1">{user.fname} {user.lname}</p>
                    <p>{user.contactNo}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(user.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm capitalize">{user.courseName}</p>
                    <p className="text-sm capitalize  text-green-500">Payment:{user.paymentId ? "success" : "pending"}</p>
                    <p className="text-sm">Price: ₹{user.totalAmount || '0.00'}</p>
                  </div>
                </li>
                <li className="" onClick={() => setIsmenuopen(!Ismenuopen)}>
                  <CiMenuKebab className="text-2xl cursor-pointer" />
                </li>
              </ul>
              {
                Ismenuopen && (
                  <div className="absolute top-20 right-5 bg-black border w-40 p-3 rounded shadow">
                    <ul className="flex flex-col gap-3">  
                      <li className="text-sm capitalize">Edit</li>
                      <li className="text-sm capitalize">Delete</li>
                    </ul>
                  </div>
                )
              }
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Users_info;
