import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  let location = useLocation()
  let data = location.state
  let amount = data.CruntPrice - data.Discountrice
  let incgst = (amount * 18) / 100
  let totleamountprice = amount + incgst
  console.log(totleamountprice)
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    address: "",
    country: "",
    city: "",
    state: "",
    pincode: "",
    status: "success",
    totalAmount: totleamountprice,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //  Razorpay loader
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation (optional)
    if (!formData.fname || !formData.email || !formData.mobile) {
      alert("Please fill in all required fields.");
      return;
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load Razorpay SDK. Check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_zLBz5tT46J6rSB", //  Test Key only
      amount: parseInt(formData.totalAmount) * 100, // Convert to paise
      currency: "INR",
      name: "Web Mastery",
      description: "Course Payment",
      handler: async function (response) {
        const paymentId = response.razorpay_payment_id;

        const checkoutData = {
          ...formData,
          paymentId,
          courseId: data._id,
          courseName: data.Coursename,
          amountPaid: formData.totalAmount,
        };
        let token = localStorage.getItem("token");
        if (!token) {
          alert("User not authenticated. Please log in.");
        }

        try {

          const res = await axios.post("https://classplut2.onrender.com/checkout", checkoutData, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            toast.success(res.data.message);
          }).catch((error) => toast.error(error.response.data.message))
          alert(" Payment successful and data saved!");

          // Reset form
          setFormData({
            fname: "",
            lname: "",
            email: "",
            mobile: "",
            address: "",
            country: "",
            city: "",
            state: "",
            pincode: "",
            totalAmount: totleamountprice
            ,
          });
        } catch (error) {
          console.log("❌ Error saving checkout data:", error);
          alert(" Payment was successful, but data saving failed.");
        }
      },
      prefill: {
        name: `${formData.fname} ${formData.lname}`,
        email: formData.email,
        contact: formData.mobile,
      },
      notes: {
        address: formData.address,
      },
      theme: {
        color: "#07a291db",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };


  return (
    <div className="container mx-auto mt-10 px-4 w-full">
      <div className="flex flex-col md:flex-row gap-x-10">

        {/* LEFT: Checkout Form */}
        <div className="md:w-2/3 bg-white shadow-xl rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">
            Checkout Form
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "fname", label: "First Name", type: "text", disabl: false },
                { name: "lname", label: "Last Name", type: "text", disabl: false },
                { name: "email", label: "Email", type: "email", disabl: false },
                { name: "mobile", label: "Mobile", type: "tel", disabl: false },
                { name: "address", label: "Address", type: "text", disabl: false },
                { name: "country", label: "Country", type: "text", disabl: false },
                { name: "city", label: "City", type: "text", disabl: false },
                { name: "state", label: "State", type: "text", disabl: false },
                { name: "pincode", label: "Pincode", type: "text", disabl: false },
                {
                  name: "totalAmount",
                  label: "Total Amount",
                  type: "number",
                  placeholder: totleamountprice,
                  disabl: true
                },
              ].map(({ name, label, type, placeholder, disabl }, index) => (
                <div key={index} className="flex flex-col">
                  <label htmlFor={name} className="text-md font-semibold mb-1 capitalize">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder || label}
                    className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData[name]}
                    onChange={handleChange}
                    disabled={disabl}  //  Fixed line
                    required
                  />
                </div>
              ))}

            </div>

            <div className="text-center mt-8">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold px-10 py-3 rounded-full transition"
              >
                Checkout
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT: Course Details */}
        <div className="md:w-1/3 mt-10 md:mt-0 bg-white shadow-xl rounded-xl p-6">
          <h3 className="text-2xl font-bold mb-4 text-[#07a291]">
            Course Details
          </h3>

          <img
            className="w-full rounded-lg mb-4"
            src={`https://classplut2.onrender.com/${data.imagePath}`}
            alt={data.Coursename}
          />

          <div className="space-y-2 text-gray-700 text-sm">
            <p><strong>Course Name:</strong> {data.Coursename}</p>
            <p><strong>Category:</strong> {data.Category}</p>
            <p><strong>SubCategory:</strong> {data.SubCategory}</p>
            <p><strong>Description:</strong> {data.Description}</p>
            <p><strong>Duration:</strong> {data.Course_Duration} {data.Duration_Type}</p>
            <p><strong>Course Type:</strong> {data.CourseType}</p>
            <p className="text-lg font-bold text-blue-600">
              Price: ₹{data.Effectiveprice}
            </p>
          </div>
        </div>
      </div>
    </div>




  );
};

export default Checkout;
