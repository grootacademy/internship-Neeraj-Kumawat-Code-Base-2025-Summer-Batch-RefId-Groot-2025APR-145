  import React, { useEffect, useState } from 'react'
  import { useLocation, useNavigate } from 'react-router-dom';
  import { motion, scale, stagger } from 'motion/react'
  import { delay } from 'motion';
  import { useDispatch, useSelector } from 'react-redux';
  import { addCourse } from '../../../components/storeslice/Detalesslice';
  import axios from 'axios';

  function Courses_detales() {
    let dispatch = useDispatch();
    let go = useNavigate();
    let getdata = useLocation();
    const [getcoursedata, setgetcoursedata] = useState([])
    let Courese = [
      {
        Cname: "SAD + SPM (FOR ACP DEPUTY DIRECTOR)",
        image: "https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg",
        CreatedBy: "You(Owner)",
        Started: "1 year",
        live: true,
        isonprice: "1500",
        oldprice: "2000",
        descripction: "This course covers System Analysis and Design (SAD) and Software Project Management (SPM) for ACP Deputy Director. It includes live sessions, recorded lectures, and practical assignments to enhance your skills in software development and project management."
      },
      {
        Cname: "A.C.P. (Deputy Director)",
        image: "https://chennai.vit.ac.in/wp-content/uploads/2021/06/Cyber-Security-Certification-Course-Computer-Science-Certification-Courses.jpg",
        CreatedBy: "You(Owner)",
        Started: "1 year",
        live: true,
        isonprice: "4499",
        oldprice: "9999",
        descripction: "Comprehensive preparation for ACP Deputy Director exam, with deep focus on cybersecurity, management, and IT systems."
      },
      {
        Cname: "RPSC PROGRAMMER (LIVE)",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1u3cFd_brIkrWkVpLiR6StVR3X90Bmk6tQr8HRweCH0azvaxWUTqe_ys1kO7ewoHe8V4&usqp=CAU",
        CreatedBy: "You(Owner)",
        Started: "1 year",
        live: true,
        isonprice: "4999",
        oldprice: "10000",
        descripction: "Live course for RPSC Programmer exam preparation covering DBMS, coding, algorithms, and practical projects."
      },
      {
        Cname: "DBMS-RPSC PROGRAMMER (LIVE + RECORDED) COURSE 24",
        image: "https://img.freepik.com/premium-vector/database-concept-illustration_86047-768.jpg",
        CreatedBy: "You(Owner)",
        Started: "1 year",
        live: true,
        isonprice: "1999",
        oldprice: "4000",
        descripction: "Database Management System (DBMS) complete course with live + recorded lectures, ideal for RPSC Programmer aspirants."
      },
      {
        Cname: "General Knowledge Crash Course",
        image: "https://img.freepik.com/free-vector/quiz-show-abstract-concept-illustration_335657-3914.jpg",
        CreatedBy: "You(Owner)",
        Started: "6 months",
        live: true,
        isonprice: "1200",
        oldprice: "2500",
        descripction: "Quick revision crash course on Indian GK, Rajasthan GK, Current Affairs, and Exam-oriented topics."
      },
      {
        Cname: "Maths Mastery for RPSC",
        image: "https://img.freepik.com/premium-vector/maths-subject-illustration_2175-5095.jpg",
        CreatedBy: "You(Owner)",
        Started: "1 year",
        live: true,
        isonprice: "2200",
        oldprice: "4500",
        descripction: "Master mathematics for RPSC exams with advanced tricks, shortcuts, and problem-solving practice."
      },
      {
        Cname: "English Language Course",
        image: "https://img.freepik.com/free-vector/english-language-learning-concept-illustration_114360-7506.jpg",
        CreatedBy: "You(Owner)",
        Started: "6 months",
        live: true,
        isonprice: "1800",
        oldprice: "3600",
        descripction: "Improve your English grammar, comprehension, and spoken skills specially designed for competitive exams."
      },
      {
        Cname: "Computer Awareness",
        image: "https://img.freepik.com/free-vector/desktop-computer-concept-illustration_114360-12154.jpg",
        CreatedBy: "You(Owner)",
        Started: "1 year",
        live: true,
        isonprice: "1500",
        oldprice: "3000",
        descripction: "Basic to advanced computer awareness course for government exams with practical knowledge."
      },
      {
        Cname: "Current Affairs Special",
        image: "https://img.freepik.com/premium-vector/current-affairs-news-flat-illustration_145666-1252.jpg",
        CreatedBy: "You(Owner)",
        Started: "1 year",
        live: true,
        isonprice: "999",
        oldprice: "2000",
        descripction: "Stay updated with monthly current affairs, exam-specific analysis, and important reports."
      },
      {
        Cname: "RPSC Interview Prep",
        image: "https://img.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg",
        CreatedBy: "You(Owner)",
        Started: "1 year",
        live: true,
        isonprice: "3500",
        oldprice: "7000",
        descripction: "Exclusive guidance to crack RPSC interviews with mock sessions, confidence building, and real-time feedback."
      },
      {
        Cname: "RPSC Advanced Programming",
        image: "https://img.freepik.com/free-vector/programming-concept-illustration_114360-1213.jpg",
        CreatedBy: "You(Owner)",
        Started: "1 year",
        live: true,
        isonprice: "4999",
        oldprice: "10000",
        descripction: "In-depth programming course for advanced coding topics including Data Structures, Algorithms, and Projects."
      },
      {
        Cname: "SAD Strategy Course",
        image: "https://img.freepik.com/premium-vector/strategy-planning-concept-illustration_251005-2083.jpg",
        CreatedBy: "You(Owner)",
        Started: "6 months",
        live: true,
        isonprice: "1400",
        oldprice: "2800",
        descripction: "Learn strategies of System Analysis and Design (SAD) with practical implementation case studies."
      },
      {
        Cname: "Leadership and Management",
        image: "https://img.freepik.com/free-vector/leadership-management-concept_74855-7072.jpg",
        CreatedBy: "You(Owner)",
        Started: "1 year",
        live: true,
        isonprice: "2500",
        oldprice: "5000",
        descripction: "Develop leadership and management skills with live case studies, role plays, and decision making techniques."
      },
      {
        Cname: "RPSC Mock Test Series",
        image: "https://img.freepik.com/free-vector/online-test-concept-illustration_114360-5637.jpg",
        CreatedBy: "You(Owner)",
        Started: "1 year",
        live: true,
        isonprice: "999",
        oldprice: "2000",
        descripction: "Complete mock test series for RPSC exam preparation with real exam pattern practice."
      },
      {
        Cname: "Exam Oriented Preparation",
        image: "https://img.freepik.com/free-vector/exam-preparation-concept-illustration_114360-11053.jpg",
        CreatedBy: "You(Owner)",
        Started: "1 year",
        live: true,
        isonprice: "1999",
        oldprice: "4000",
        descripction: "Targeted exam-oriented preparation course focusing on RPSC, SSC, and other state exams."
      },
      // 🔥 Latest & Unique Added Courses
      {
        Cname: "AI & Machine Learning Fundamentals",
        image: "https://img.freepik.com/free-vector/artificial-intelligence-concept-illustration_114360-2161.jpg",
        CreatedBy: "You(Owner)",
        Started: "3 months",
        live: true,
        isonprice: "4999",
        oldprice: "9000",
        descripction: "Beginner-friendly AI and Machine Learning course with Python, covering data analysis and model building."
      },
      {
        Cname: "Cyber Security Essentials",
        image: "https://img.freepik.com/free-vector/cyber-security-concept_23-2148532223.jpg",
        CreatedBy: "You(Owner)",
        Started: "4 months",
        live: true,
        isonprice: "3999",
        oldprice: "8000",
        descripction: "Practical course on cybersecurity basics, ethical hacking, and protection against cyber threats."
      },
      {
        Cname: "Full Stack Web Development Bootcamp",
        image: "https://img.freepik.com/free-vector/illustration-social-media-concept_53876-18383.jpg",
        CreatedBy: "You(Owner)",
        Started: "2 months",
        live: true,
        isonprice: "6999",
        oldprice: "12000",
        descripction: "Hands-on full stack development bootcamp with MERN stack projects, perfect for beginners and intermediates."
      }
    ];



    const maindev = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.1,
          delay: 0.1,
          staggerChildren: 0.1,
          delayChildren: 0.1,
          when: "beforeChildren"
        }
      }
    }

    const maindev_in = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.1, }
      }
    }
    let expandmore = (course) => {
      go("/admin/coursesdetales", { state: course || [] })
    }






    // search by-----------------------------------

  let data;
  useEffect(() => {
      axios.get("http://localhost:5000/getcourses").then((res) => {
        
        setgetcoursedata(res.data.coursedata)
      }).catch((error) => console.log(error))
      
    }, [])
    // console.log(getcoursedata)

    return (
      <>
        {/* All courses list */}
        <motion.div
          variants={maindev}
          initial="hidden"
          animate="visible"
          className={`rounded-2xl flex flex-wrap justify-center p-3 sm:p-0 gap-8 pt-5 transition-all duration-300 `}
        >
          {getcoursedata.map((course, index) => (
            <motion.div
              variants={maindev_in}
              key={index}
              className="bg-white shadow-lg rounded-2xl w-[300px] overflow-hidden hover:shadow-2xl transition"
            >
              <img
                src={`http://localhost:5000/${course.imagePath}` || "https://via.placeholder.com/320x180"}
                className="w-full h-48 object-cover cursor-pointer"
                alt={course.Coursename}
                onClick={() => expandmore(course)}
              />
              <div className="px-5 py-4">
                <h2 className="text-lg font-bold mb-2">{course.Coursename}</h2>
                <p className="text-gray-500 mb-1">
                  {course.Description.slice(0,40)} <span className='cursor-pointer' onClick={() => expandmore(course)}>[....]</span>
                </p>
                <p className="text-gray-500 mb-1">
                  Course Type: {course.CourseType}
                </p>
                {/* <p className="text-gray-500 mb-1">
                  Started:{" "}
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded text-sm">
                    {course.Started}
                  </span>
                </p> */}
                <p className="text-green-600 font-semibold mb-1">
                  Live: {course.live ? "Yes" : "No"}
                </p>
                <div className="flex gap-3 items-center">
                  <p className="text-black text-xl font-bold">{course.CruntPrice}</p>
                  <p className="line-through text-red-500">{course.Discountrice }</p>
                </div>
                <button
                  className="mt-3 w-full px-4 py-2 cursor-pointer rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition"
                  onClick={() => expandmore(course)}
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </>
    )
  }

  export default Courses_detales
