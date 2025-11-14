import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import axios from "axios";

function Hero_section() {
  const [getcoursedata, setgetcoursedata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getcourses")
      .then((res) => {
        setgetcoursedata(res.data.coursedata);
      })
      .catch((error) => console.log(error));
  }, []);

  const expandmore = (course) => {
    console.log("Expand course details:", course);
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center px-4 py-12 text-gray-900">
      
      {/* Hero Section */}


      <div className="relative bg-white w-full py-12 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between shadow-lg border border-gray-200 rounded-2xl">
        {/* Left Content */}
        <div className="max-w-2xl text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            <span className="text-blue-600">One Roof</span>{" "}
            <span className="text-gray-800">Education</span>
          </h2>
          <h3 className="mt-4 text-3xl font-bold text-gray-800">
            Competition Programs
          </h3>
          <p className="mt-4 text-lg text-gray-600">
            Crack competitive exams with expert guidance, structured learning,
            and all-in-one resources — designed for achievers.
          </p>

          <h4 className="mt-6 text-lg font-semibold text-blue-600">
            Choose from programs like:
          </h4>

          {/* Specializations */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm font-medium text-gray-700">
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-600 w-10 h-10 flex items-center justify-center rounded-full">
                📊
              </span>
              <p>SSC / Banking</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-600 w-10 h-10 flex items-center justify-center rounded-full">
                ⚖️
              </span>
              <p>Law Entrance</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-600 w-10 h-10 flex items-center justify-center rounded-full">
                🧮
              </span>
              <p>IIT-JEE</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-600 w-10 h-10 flex items-center justify-center rounded-full">
                🔬
              </span>
              <p>NEET</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-600 w-10 h-10 flex items-center justify-center rounded-full">
                📝
              </span>
              <p>UPSC / PCS</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-600 w-10 h-10 flex items-center justify-center rounded-full">
                🌍
              </span>
              <p>Language Exams</p>
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Higher Success. Better Results.
          </p>

          {/* CTA */}
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition">
            Enroll Today
          </button>
        </div>

        {/* Right Image */}
        <div className="mt-10 md:mt-0 md:ml-10 relative">
          <div className="bg-blue-100 p-1 rounded-2xl shadow-lg border border-blue-200">
            <img
              src="https://www.asuprepdigital.org/wp-content/uploads/2024/09/benefits-of-online-high-school-for-your-child-scaled.jpg"
              alt="Student Learning"
              className="rounded-2xl w-80 h-96 object-cover"
            />
          </div>
          <div className="absolute -top-6 -right-6 text-blue-500 text-3xl animate-pulse">
            ✦
          </div>
          <div className="absolute bottom-6 -left-6 text-gray-400 text-2xl animate-bounce">
            ✧
          </div>
        </div>
      </div>

      {/* Explore Courses */}
      <h2 className="py-10 text-4xl md:text-5xl font-extrabold mb-10 text-center text-gray-900">
        Ex
        <span className="bg-gradient-to-r from-blue-600 to-gray-400 bg-clip-text text-transparent">
          plore Learning
        </span>
      </h2>

      <div className="w-full max-w-7xl">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={30}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2.5,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {getcoursedata.map((course, index) => (
            <SwiperSlide
              key={course._id || index}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={
                  course.imagePath
                    ? `http://localhost:5000/${course.imagePath}`
                    : "https://via.placeholder.com/320x180"
                }
                className="w-full h-64 object-cover cursor-pointer"
                alt={course.Coursename}
                onClick={() => expandmore(course)}
              />

              <div className="p-5 space-y-3 text-left">
                {/* Star Rating */}
                <div className="flex items-center text-blue-500 text-sm">
                  {Array(4)
                    .fill()
                    .map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 mr-1"
                      >
                        <path d="M12 .587l3.668 7.568L24 9.423l-6 5.843L19.335 24 12 19.897 4.665 24 6 15.266 0 9.423l8.332-1.268z" />
                      </svg>
                    ))}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 17.27l4.15 2.18-1.05-4.73L18 10.24l-4.81-.41L12 5l-1.19 4.83-4.81.41 3.7 3.48-1.05 4.73L12 17.27z"
                    />
                  </svg>
                  <span className="ml-2 text-gray-500">(4.0)</span>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 line-clamp-1">
                  {course.Coursename}
                </h3>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>📂 Category:</strong> {course.Category} /{" "}
                    {course.SubCategory}
                  </p>
                  <p>
                    <strong>⏱ Duration:</strong> {course.Course_Duration}{" "}
                    {course.Duration_Type}
                  </p>
                  <p>
                    <strong>🎯 Type:</strong> {course.CourseType} (
                    {course.Course_Category})
                  </p>
                  <p>
                    <strong>👨‍🏫 Instructor:</strong>{" "}
                    {course.Instructor || "John Doe"}
                  </p>
                  <p>
                    <strong>🌐 Language:</strong> {course.Language || "English"}
                  </p>
                </div>

                <div className="text-sm mt-3">
                  <p className="text-gray-400 line-through">
                    ₹{course.CruntPrice}
                  </p>
                  <p className="text-blue-600 font-bold text-lg">
                    Now ₹{course.Effectiveprice}
                  </p>
                </div>

                <button
                  onClick={() => expandmore(course)}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow transition"
                >
                  View Details
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Motivation Section */}
      <div className="mt-20 w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {[
          {
            icon: "📚",
            quote: "Learning never exhausts the mind.",
            desc: "Every course is a step towards building your dream career.",
          },
          {
            icon: "🎯",
            quote: "Knowledge is power.",
            desc: "Master skills that open new doors every single day.",
          },
          {
            icon: "🚀",
            quote: "Your future depends on what you do today.",
            desc: "Small actions today create massive results tomorrow.",
          },
          {
            icon: "💡",
            quote: "Dream big. Learn bigger.",
            desc: "Every great achievement starts with one curious mind.",
          },
          {
            icon: "🔥",
            quote: "Consistency is the key.",
            desc: "A little progress each day adds up to big success.",
          },
          {
            icon: "⚡",
            quote: "Upgrade yourself.",
            desc: "Skills you sharpen today shape tomorrow’s success.",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="relative group rounded-2xl p-1 bg-gradient-to-r from-gray-100 to-white hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <div className="bg-white rounded-2xl p-6 text-center h-full border border-gray-200">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-2xl">{card.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                “{card.quote}”
              </h3>
              <p className="text-sm text-gray-600">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero_section;
