import axios from 'axios';
import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Login() {
  const [inputdata, setInputData] = useState({});
  const [spreadinpvalue, setspreadinpvalue] = useState({})
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const [Togelvarifyotp, setTogelvarifyotp] = useState(true)

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {

      if (userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    }
  }, [navigate]);

  // Handle input changes
  const handleInput = (e) => {
    setInputData({ ...inputdata, [e.target.name]: e.target.value });

  };
  let nenoid = nanoid();


  // Handle Login + OTP fallback
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      // Try password login first
      const res = await axios.post("http://localhost:5000/login", inputdata);
      const { token, email, role } = res.data;

      // Save to localStorage
      localStorage.setItem("token", JSON.stringify({ token }));

      toast.success("Login successful!");


    } catch (err) {
      // If password login failed, try OTP
      try {
        const otpRes = await axios.post("http://localhost:5000/request-otp", inputdata);
        toast.success(otpRes.data.msg);
        // navigate("/verify-otp", { state: { email: inputdata.email } });
        setTogelvarifyotp(false)
      } catch (otpErr) {
        toast.error("Error sending OTP or invalid credentials");
      }
    }
  };



  const  email  = inputdata.email

  console.log(inputdata.email)

  const handleOTPVerify = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/verify-otp", {
        email,
        otp
      })
      .then((res) => {
        alert(res.data.msg);

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify({
          email: res.data.email,
          role: res.data.role,
        }));
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("loginTime", Date.now());
        // Redirect based on role
        if (res.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      })
      .catch((err) => {
        alert("Invalid OTP or something went wrong");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      {
        Togelvarifyotp ?
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">
            <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
              Login To One Roof Education
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
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

              <div>
                <label className="block text-gray-600 font-medium mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleInput}
                  required
                  className="w-full p-3 border border-blue-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <input type="hidden" name="role" value={`user ${nenoid}`} />

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-5 font-bold bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              By signing up, you agree to our{" "}
              <a href="#" className="text-blue-500 hover:underline">T&C</a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
            </p>
          </div>

          :


          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold text-center mb-4">Verify OTP </h2>
              <form onSubmit={handleOTPVerify} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Enter OTP sent to {email}</label>
                  <input
                    type="text"
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-3 border border-green-600 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
                  >
                    Verify OTP
                  </button>
                </div>
              </form>
            </div>
          </div>
      }
    </div>
  );
}

export default Login;

