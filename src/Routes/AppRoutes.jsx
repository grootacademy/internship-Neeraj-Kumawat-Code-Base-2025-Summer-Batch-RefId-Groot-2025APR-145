// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Dashbord from "../pages/Dashbord";
// import Courses from "../pages/courses/Courses";
// import Applayout from "../layout/Applayout";
// import Exproldetal from "../pages/courses/Components/Exproldetal";
// import Managebatch from "../pages/batches/Managebatch";
// import Createanewcourse from "../pages/courses/Components/creatanewcourse/Createanewcourse";
// import Creatbatches from "../pages/batches/component/creatbatch/Creatbatches";
// import Users from "../pages/people_user/Users";
// import Createuser from "../pages/people_user/component/creatuser/Creatuser";
// import Up_vedio from "../pages/uplodvideo/Up_vedio";
// import Add_Content from "../pages/courses/Components/addcontents/Add_Content";
// import ScrollToTop from "../TopToScroll";
// import LoginWitnNumber from "../pages/login-sigup/LoginWitnNumber";
// import Login from "../pages/login-sigup/Login";
// import ExpolrBatch from "../pages/batches/component/ExpolrBatch";
// import CreatCpriceSec from "../pages/courses/Components/creatanewcourse/CreatCpriceSec";
// import AdvanceOpt from "../pages/courses/Components/creatanewcourse/AdvanceOpt";
// import AssStudentincourse from "../pages/courses/Components/AssStudentincourse";
// import User_Courses from "../pages/user/user_section/User_Courses";


// function AppRoutes() {
//   return (
//     <div >
//    <ScrollToTop/> 

//     <Routes>

//       <Route element={<Applayout />}>



//         <Route path="/loginwithnumbers" element={<LoginWitnNumber />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Dashbord />} />
//         <Route path="/courses" element={<Courses />} />
//         <Route path="/Addcourse" element={<Createanewcourse />} />
//         <Route path="/AddcoursePrice" element={<CreatCpriceSec />} />
//         <Route path="/addcontent" element={<Add_Content />} />
//         <Route path="/addstudents" element={<AssStudentincourse />} />
//         {/* <Route path="/advance" element={<AdvanceOpt />} /> */}


//         <Route path="/coursesdetales" element={<Exproldetal />} />

//         <Route path="/batches" element={<Managebatch />} />
//         <Route path="/explorbatches" element={<ExpolrBatch />} />



//         <Route path="/newbatches" element={<Creatbatches />} />

//         {/* prople-------------- */}
//         <Route path="/users" element={<Users />} />
//         <Route path="/users/createusers" element={<Createuser />} />

//         {/* uolod ----------------------- */}
//         <Route path="/video" element={<Up_vedio />} />
//       </Route>


//     </Routes>

//     </div>
//   );
// }

// export default AppRoutes;

import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import ScrollToTop from "../TopToScroll";

// Auth
import Login from "../pages/login-sigup/Login";
import LoginWitnNumber from "../pages/login-sigup/LoginWitnNumber";

// Layout
import Applayout from "../layout/Applayout";

// Admin Pages
import Dashbord from "../pages/Dashbord";
import Courses from "../pages/courses/Courses";
import Exproldetal from "../pages/courses/Components/Exproldetal";
import Createanewcourse from "../pages/courses/Components/creatanewcourse/Createanewcourse";
import CreatCpriceSec from "../pages/courses/Components/creatanewcourse/CreatCpriceSec";
import AdvanceOpt from "../pages/courses/Components/creatanewcourse/AdvanceOpt";
import Add_Content from "../pages/courses/Components/addcontents/Add_Content";
import AssStudentincourse from "../pages/courses/Components/AssStudentincourse";
import Managebatch from "../pages/batches/Managebatch";
import Creatbatches from "../pages/batches/component/creatbatch/Creatbatches";
import ExpolrBatch from "../pages/batches/component/ExpolrBatch";
import Users from "../pages/people_user/Users";
import Createuser from "../pages/people_user/component/creatuser/Creatuser";
import Up_vedio from "../pages/uplodvideo/Up_vedio";

// User Pages
import User from "../pages/user/User";
import User_Courses from "../pages/user/user_coursesec/User_Courses";
// import OtpVerify from "../pages/login-sigup/Varify_otp";
import ExplorUser_Course from "../pages/user/user_coursesec/ExplorUser_Course";
import User_Batch from "../pages/user/user_batchsec/User_Batch";
import Explor_batch_user from "../pages/user/user_batchsec/Explor_batch_user";
import Checkout from "../pages/user/checkoutpage/Checkout";
import Hero_section from "../pages/user/herosection/Hero_section";
import User_Buy_Courses from "../pages/user/buycourses/User_Buy_Courses";
import Page_Notfound from "../components/Page_Notfound";
import EditCourse from "../pages/courses/Components/EditCourse";
import ExplorVideos_in from "../pages/courses/Components/ExplorVideos_in";
import Explor_User from "../pages/user/exploruser/Explor_User";
import ExplorUser_Course_Contant from "../pages/user/user_coursesec/Contants_Courses_user";
import Payment from "../pages/user/payments/Payment";
import AddStudents from "../pages/batches/component/creatbatch/Addstudents";
import Liveclasses from "../pages/user/user_batchsec/Liveclasses";
import AdminLiveStream from "../pages/new/Livetsrem";
import UserWatchLive from "../pages/user/userlive/User_Live";
import UserDashboard from "../pages/user/userlive/Usernotifytolive";
import Edit_Batch from "../pages/batches/component/Edit_Batch";
import { ToastContainer } from "react-toastify";
import Singup from "../pages/login-sigup/Singup";
import Chatapp1 from "../pages/user/chat/Chatapp";
import Chat from "../pages/admin_chat/Chatapp";

function App() {
  return (
    <>
      <ScrollToTop />
      <ToastContainer/>
      <Routes>
        {/*  Public Route */}
        <Route path="/" element={<Login />} />
        <Route path="/singup" element={<Singup />} />
        {/* <Route path="/verify-otp" element={<OtpVerify />} /> */}

        
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<Applayout />}>
            <Route index element={<Dashbord />} />
            <Route path="courses" element={<Courses />} />
            <Route path="coursesdetales" element={<Exproldetal />} />
            <Route path="Addcourse" element={<Createanewcourse />} />
            <Route path="AddcoursePrice" element={<CreatCpriceSec />} />
            <Route path="Editcourse" element={<EditCourse />} />
            <Route path="ExploreVideos" element={<ExplorVideos_in />} />
            <Route path="addcontent" element={<Add_Content />} />
            <Route path="addstudents" element={<AssStudentincourse />} />
            {/* <Route path="advance" element={<AdvanceOpt />} /> */}

            <Route path="batches" element={<Managebatch />} />
            <Route path="explorbatches" element={<ExpolrBatch />} />
            <Route path="Addstudentsinbatch" element={<AddStudents />} />
            <Route path="newbatches" element={<Creatbatches />} />
            <Route path="edit_batch" element={<Edit_Batch />} />

            {/* People/Users */}
            <Route path="users" element={<Users />} />
            <Route path="users/createusers" element={<Createuser />} />

            {/* Video Upload */}
            <Route path="video" element={<Up_vedio />} />
            <Route path="live_stream" element={<AdminLiveStream />} />
            <Route path="Chatappadmin" element={<Chat />} />

          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user" element={<User />}>
            <Route index element={<Hero_section />} />
            <Route path="Course" element={<User_Courses />} />
            <Route path="Payment" element={<Payment />} />
            <Route path="ExplorCourse" element={<ExplorUser_Course />} />
            <Route path="ExplorCourse/content" element={<ExplorUser_Course_Contant />} />
            <Route path="batches" element={<User_Batch />} />
            <Route path="Explorbatch" element={<Explor_batch_user />} />
            <Route path="buycourses" element={<User_Buy_Courses />} />
            <Route path="exploruser" element={<Explor_User />} />
            <Route path="livecontent" element={<Liveclasses/>} />

            <Route path="checkout" element={<Checkout />} />
            <Route path="UserDashboard" element={<UserDashboard />} />
            <Route path="UserWatchLive" element={<UserWatchLive />} />

            <Route path="chatapp" element={<Chatapp1 />} />


          </Route>
        </Route>

        

        <Route path="*" element={<Page_Notfound />} />
      </Routes>
    </>
  );
}

export default App;
