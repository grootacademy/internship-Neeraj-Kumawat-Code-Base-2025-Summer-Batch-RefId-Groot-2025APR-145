// // src/OtpVerify.jsx
// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';

// function OtpVerify() {
//   const [otp, setOtp] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get email from location state
//   const { email } = location.state || {};

//   const handleOTPVerify = (e) => {
//     e.preventDefault();

//     axios
//       .post("http://localhost:5000/verify-otp", {
//         email,
//         otp
//       })
//       .then((res) => {
//         alert(res.data.msg);

//         // Save to localStorage
//         localStorage.setItem("user", JSON.stringify({
//           email: res.data.email,
//           role: res.data.role,
//         }));
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("loginTime", Date.now());
//         // Redirect based on role
//         if (res.data.role === "admin") {
//           navigate("/admin");
//         } else {
//           navigate("/user");
//         }
//       })
//       .catch((err) => {
//         alert("Invalid OTP or something went wrong");
//       });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
//         <form onSubmit={handleOTPVerify} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-2">Enter OTP sent to {email}</label>
//             <input
//               type="text"
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full p-3 border border-green-600 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//               required
//             />
//           </div>
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="px-6 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
//             >
//               Verify OTP
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default OtpVerify;






// // // src/OtpVerify.jsx
// // import React, { useEffect, useState } from 'react';
// // import { useNavigate, useLocation } from 'react-router-dom';
// // import axios from 'axios';

// // function OtpVerify() {
// //   const [otp, setOtp] = useState('');
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [userdata, setuserdata] = useState()

// //   // Get email from location state
// //   const { email } = location.state || {};
  
// //   useEffect(() => {
// //   axios.get("http://localhost:5000/getuserrole").then((res) => {
// //     setuserdata(res.data.data)
// //     console.log(userdata)
// //   }).catch((error) => console.log(error))
// //   }, [])


// // const handleOTPVerify = async (e) => {
// //   e.preventDefault();

// //   try {
// //     const response = await axios.post("http://localhost:5000/verify-otp", {
// //       email,
// //       otp,
// //     });

// //     const { msg, token, user_id } = response.data;

// //     if (!token || !user_id) {
// //       alert("Unexpected response from server.");
// //       return;
// //     }

// //     alert(msg);

// //     localStorage.setItem("user", JSON.stringify({
// //       token,
// //       userId: user_id,
// //     }));

// //     if (!userdata || userdata.length === 0) {
// //       alert("User data not available.");
// //       return;
// //     }

// //     const user = userdata.find((el) => el._id === user_id);
// //     console.log(user?.role);
// //     if (user?.role === "admin") {
// //       navigate("/admin");
// //     } else {
// //       navigate("/user");
// //     }

// //   } catch (err) {
// //     const errorMsg = err.response?.data?.msg || "Invalid OTP or something went wrong";
// //     alert(errorMsg);
// //   }
// // };


// //   return (
// //     <div className="flex items-center justify-center min-h-screen">
// //       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
// //         <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
// //         <form onSubmit={handleOTPVerify} className="space-y-4">
// //           <div>
// //             <label className="block text-gray-700 mb-2">Enter OTP sent to {email}</label>
// //             <input
// //               type="text"
// //               onChange={(e) => setOtp(e.target.value)}
// //               className="w-full p-3 border border-green-600 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
// //               required
// //             />
// //           </div>
// //           <div className="flex justify-center">
// //             <button
// //               type="submit"
// //               className="px-6 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
// //             >
// //               Verify OTP
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default OtpVerify;
