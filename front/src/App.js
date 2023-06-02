import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import MainHeader from "./Components/Layout/MainHeader";
import Home from "./Components/Pages/Home";
import AllCourse from "./Components/Pages/AllCourse";
import About from "./Components/Pages/About";
import ContactUs from "./Components/Pages/ContactUs";
import Blog from "./Components/Pages/Blog";
import SignUp from "./Components/Pages/SignUp";
import SignUpTeacher from "./Components/Pages/SignUpTeacher";
import Login from "./Components/Pages/Login";

import RequireAuth from "./Components/RequireAuth/RequireAuth";

import Header from "./Components/Layout/Header";
import Sidebar from "./Components/Layout/Sidebar";

import TeacherDashboard from "./Components/Pages/Dashboard/TeacherDashboard";
import StudentDashBoard from "./Components/Pages/Dashboard/StudentDashBoard";

import AddCourse from "./Components/Teacher/AddCourse";
import TeacherNotes from "./Components/Teacher/TeacherNotes";
import Notes from "./Components/Pages/Notes";
import SingleCourse from "./Components/Pages/SingleCourse";
import CreateVideos from "./Components/Videos/CreateVideos";
import GetVideos from "./Components/Videos/GetVideos";
import TeacherQuestion from "./Components/Teacher/TeacherQuestion";
import Quiz from "./Components/Page/Quiz";
import Exam from "./Components/Page/Exam";
import EditEvaluation from "./Components/Teacher/EditEvaluation";
import TeacherEvaluation from "./Components/Teacher/TeacherEvaluation";
import StudentEvaluation from "./Components/Quiz/StudentEvaluation";

import useServer from "./Components/hooks/useServer";

import NotFound from "./Components/Pages/NotFound";


function App() {
  const [subject, setSubject] = useState(undefined);
  const [player, setPlayer] = useState(undefined);
  const [id, setId] = useState(undefined);
  const { TokenInfo } = useServer();
  const role = TokenInfo.role;
  const token = Cookies.get("token");
  return (
    <>
      <Header />
      <Sidebar />
      {role ? (
        <Routes>
          {role == "user" ? (
            <>
              <Route
                exact
                path="/"
                element={
                  <RequireAuth>
                    <StudentDashBoard />
                  </RequireAuth>
                }
              />
              <Route
                path="/allNotes"
                element={
                  <Notes /> 
                }
              />
              <Route
                exact
                path="/getVideos"
                element={
                  <RequireAuth>
                    <GetVideos />
                  </RequireAuth>
                }
              />
              <Route
                exact
                path="/course-details/:Course_Id/:Course_Name"
                element={
                  <RequireAuth>
                    <SingleCourse />
                  </RequireAuth>
                }
              />

              <Route
                path="/exam"
                element={
                  // <RequireAuth>
                  <Exam
                    player={player}
                    id={id}
                    subject={subject}
                    setSubject={setSubject}
                    setPlayer={setPlayer}
                    setId={setId}
                  />
                  // </RequireAuth>
                }
              />

              <Route
                path="/quiz"
                element={
                  <RequireAuth>
                    <Quiz player={player} subject={subject} id={id} />
                  </RequireAuth>
                }
              />
              

              <Route
                path="/evaluation"
                element={
                  <RequireAuth>
                    <StudentEvaluation />
                  </RequireAuth>
                }
              />
              
            </>
          ) : role == "admin" ? (
            <>
              <Route
                exact
                path="/"
                element={
                  <RequireAuth>
                    <TeacherDashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/createNotes"
                element={
                  <RequireAuth>
                    <TeacherNotes />
                  </RequireAuth>
                }
              />
              <Route
                path="/createVideos"
                element={
                  <RequireAuth>
                    <CreateVideos />
                  </RequireAuth>
                }
              />
              <Route
                exact
                path="/getVideos"
                element={
                  <RequireAuth>
                    <GetVideos />
                  </RequireAuth>
                }
              />
              <Route
                exact
                path="/add-Course"
                element={
                  <RequireAuth>
                    <AddCourse />
                  </RequireAuth>
                }
              />
              <Route
                exact
                path="/course-details/:Course_Id/:Course_Name"
                element={
                  <RequireAuth>
                    <SingleCourse />
                  </RequireAuth>
                }
              />
              <Route
                path="/addquiz"
                element={
                  <RequireAuth>
                    <TeacherQuestion />
                  </RequireAuth>
                }
              />
              <Route
                path="/evaluation"
                element={
                  <RequireAuth>
                    <TeacherEvaluation />
                  </RequireAuth>
                }
              />
              <Route
                path="/editevaluation/:id"
                element={
                  <RequireAuth>
                    <EditEvaluation />
                  </RequireAuth>
                }
              />
              
            </>
          ) : (
            ""
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <>
          <MainHeader />
          <Routes>
            {" "}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signupTeacher" element={<SignUpTeacher />} />
            <Route path="/all-course" element={<AllCourse />} />
            <Route path="/About" element={<About />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route exact path="/course-details/:Course_Id/:Course_Name" element={<SingleCourse />} />
          </Routes>
        </>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
