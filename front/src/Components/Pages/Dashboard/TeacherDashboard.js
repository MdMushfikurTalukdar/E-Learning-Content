import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useServer from "../../hooks/useServer";
import moment from "moment";
import { Private_api, public_api } from "../../hooks/baseApi";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
const TeacherDashboard = () => {
  const { User_Info } = useServer();
  // console.log("first", User_Info);
  //Add Course
  const [loadUpdate, setLoadUpdate] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    // console.log('submit',data);
    setLoadUpdate(false);
    try {
      const res = await public_api().post("/Course", {
        Course_Name: data.Course_Name,
        Course_Category: data.Course_Category,
        Course_Description: data.Course_Description,
        Course_Session: data.Course_Session,
      });

      swal({
        title: "Success",
        text: res.data.message,
        icon: "success",
      });
      setLoadUpdate(false);
    } catch (err) {
      setLoadUpdate(false);
      console.log(err.message);
    }
    window.$("#add_Course").modal("hide");
  };
 
  const [AllCourse, setAllCourse] = useState("");


  const GetAllCourse = async () => {
    const data = await public_api().get("/Course");
    setAllCourse(data.data.data);
  };
  useEffect(() => {
    setLoadUpdate(true);
  
    GetAllCourse();
  }, [loadUpdate]);

  const [Course_Id, SetCourse_Id] = useState();
  
  const DeleteCourse = async () => {
    setLoadUpdate(true);
    try {
      const res = await public_api().delete(`Course/${Course_Id}`);
      swal({
        title: "Success",
        text: res.data.message,
        icon: "success",
      });
      setLoadUpdate(false);
    } catch (err) {
      setLoadUpdate(false);
    }
    window.$("#delete_course").modal("hide");
  };
 
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setLoadUpdate(true);
    const fetchData = async () => {
      const result = await axios.get("http://localhost:5000/api/v1/Videos");

      if (result.data.status === "Success") {
        setVideos(result.data.data);
      } else {
        console.log(result.data.message);
      }
    };
    fetchData();
  }, [loadUpdate]);
 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [thumbnailLink, setThumbnailLink] = useState("");
  const [message, setMessage] = useState("");

  const [CourseName, setCourseName] = useState("");
  const Course_Name = CourseName.split("-");
  const CourseId = Course_Name[1];
  
  const handleUpload = async (e) => {
    e.preventDefault();
    
    const newVideo = {
      title: title,
      description: description,
      videoUrl: videoLink,
      thumbnailUrl: thumbnailLink,
      courseCourseId: CourseId,
    };
    try {
      
      await axios.post(
        "http://localhost:5000/api/v1/Videos/createVideos",
        newVideo
      );
      
      setMessage("Video uploaded successfully!");
    } catch (error) {
      console.error(error);
     
      setMessage("Failed to upload video.");
    }
    window.$("#add_Videos").modal("hide");
  };

  
  const [Video_Id, setVideoId] = useState();
  console.log("hiudhwiudga", Video_Id);
  const deleteVideo = async () => {
    setLoadUpdate(true);
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/Videos/delete/${Video_Id}`
      );
      swal({
        title: "Success",
        text: res.data.message,
        icon: "success",
      });
      setLoadUpdate(false);
    } catch (err) {
      console.log("Error", err.message);
      setLoadUpdate(false);
    }
    window.$("#delete_Video").modal("hide");
  };
  

  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    getValues: getValues1,
  } = useForm({
    mode: "onTouched",
  });

  const AddNote = async (data1) => {
    
    setLoadUpdate(false);
    try {
      const res = await public_api().post("/Note", {
        Note_Name: data1.Note_Name,
        Note_type: data1.Note_type,
        Note_File: data1.Note_File,
        Note_Description: data1.Note_Description,
        Note_Id: data1.Note_Id,
        courseCourseId: CourseId,
      });

      swal({
        title: "Success",
        text: res.data.message,
        icon: "success",
      });
      setLoadUpdate(false);
    } catch (err) {
      setLoadUpdate(false);
      console.log(err.message);
    }
    window.$("#add_Notes").modal("hide");
  };
  
  const [AllNotes, setAllNotes] = useState("");
  console.log(" -----AllNotes ---------------", AllNotes);

  const GetAllNotes = async () => {
    const data = await public_api().get("/Note");
    setAllNotes(data.data.data);
  };
  useEffect(() => {
    setLoadUpdate(true);
    
    GetAllNotes();
  }, [loadUpdate]);

  const [show_Note_Description, setShow_Note_Description] = useState("");

  const [Note_Id, SetNotes_Id] = useState();
  
  const DeleteNotes = async () => {
    setLoadUpdate(true);
    try {
      const res = await public_api().delete(`Note/${Note_Id}`);
      swal({
        title: "Success",
        text: res.data.message,
        icon: "success",
      });
      setLoadUpdate(false);
    } catch (err) {
      setLoadUpdate(false);
    }
    window.$("#delete_notes").modal("hide");
  };
  

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <div className="welcome-det">
                <h5>
                  Welcome,{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {User_Info.User_Name}
                    <span />
                  </span>
                </h5>
                <p>{moment(new Date()).format("dddd, D MMM , YYYY")}</p>
              </div>
            </div>
            <div className="col-auto float-right ml-auto">
              <a
                href="/addquiz"
                className="btn add-btn"
                style={{ marginRight: "10px", marginBottom: "5px" }}>
                <i className="fa fa-plus" /> Add Quiz
              </a>
              <a
                href="#"
                className="btn add-btn"
                data-bs-toggle="modal"
                data-bs-target="#add_Notes"
                style={{ marginRight: "10px", marginBottom: "5px" }}>
                <i className="fa fa-plus" /> Add Notes
              </a>
              <a
                href="#"
                className="btn add-btn"
                data-bs-toggle="modal"
                data-bs-target="#add_Videos"
                style={{ marginRight: "10px", marginBottom: "5px" }}>
                <i className="fa fa-plus" /> Add Videos
              </a>
              <a
                href="#"
                className="btn add-btn"
                data-bs-toggle="modal"
                data-bs-target="#add_Course"
                style={{ marginRight: "10px", marginBottom: "5px" }}>
                <i className="fa fa-plus" /> Add Course
              </a>
            </div>
          </div>
        </div>
 
        {AllCourse.length > 0 ? (
          <div className="row m-auto">
            <h3 className="text-center">All Course</h3>
            <hr></hr>
            {AllCourse.length > 0 ? (
              AllCourse.map((item, index) => (
                <>
                  <div
                    className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                    style={{ marginBottom: "1.5rem" }}>
                    <div class="card-group">
                      <div className="card">
                      
                        <div className="card-body">
                          <div className="dropdown profile-action">
                            <a
                              href="#"
                              className="action-icon dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false">
                              <i className="material-icons">more_vert</i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a
                                className="dropdown-item"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_course"
                                onClick={() => SetCourse_Id(item.Course_Id)}>
                                <i className="fa fa-trash-o m-r-5" /> Delete
                              </a>
                            </div>
                          </div>
                          <h4>
                            <Link
                              to={`/course-details/${item.Course_Id}/${item.Course_Name}`}>
                              {item.Course_Name}
                            </Link>
                          </h4>
                          <ul style={{ listStyle: "none", color: "#000" }}>
                            <li>
                              <h5>
                                <span>
                                  <span style={{ fontWeight: "bolder" }}>
                                    Course Category:
                                  </span>{" "}
                                  {item.Course_Category}
                                </span>
                              </h5>
                              <h5>
                                <span>
                                  <span style={{ fontWeight: "bolder" }}>
                                    Course Description:
                                  </span>{" "}
                                  {item.Course_Description.slice(0, 110)}{" "}
                                  <Link
                                    to={`/course-details/${item.Course_Id}/${item.Course_Name}`}>
                                    Loren More...
                                  </Link>
                                </span>
                              </h5>
                              <h5>
                                <span>
                                  <span style={{ fontWeight: "bolder" }}>
                                    Course Session:
                                  </span>{" "}
                                  {item.Course_Session}
                                </span>
                              </h5>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <></>
             
            )}
          </div>
        ) : (
          <></>
        )}
   
        {videos.length > 0 ? (
          <div className="row">
            <h3 className="text-center">Video Tutorials</h3>
            <hr />
            <div className="row">
              {videos.map((video) => (
                <div className="col-md-4 mb-5" key={video.id}>
                  <div className="card card__custom">
                    <a href={video.videoUrl} target="_blank" rel="noreferrer">
                      <div className="profile-action">
                        <a
                          className="p-1 btn btn-primary btn-sm card__custom-button"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_Video"
                          onClick={() => setVideoId(video.Video_Id)}
                          style={{
                            color: "#fff",
                            fontSize: "15px",
                            fontWeight: "bolder",
                          }}>
                          <i className="fa fa-trash-o m-r-5" />
                          Delete
                        </a>
                      </div>
                      <img
                        className="card-img-top card__custom-img"
                        src={video.thumbnailUrl}
                        alt="thumbnail"
                      />
                    </a>
                    <div className="card-body">
                      <h5 className="card-title card__custom-title">
                        {video.title}
                      </h5>
                      <p className="card-text card__custom-description">
                        {video.description}
                      </p>
                      <a
                        href={video.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary btn-sm card__custom-button">
                        View Tutorial
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
     
        {AllNotes.length > 0 ? (
          <div className="row">
            <div className="col-md-12">
              <h3 className="text-center">All Note</h3>
              <hr />
              <div className="table-responsive">
                <table className="table table-striped custom-table mb-0">
                  <thead>
                    <tr>
                      <th>Note Name</th>
                      <th>Note type</th>
                      <th>Note Description</th>
                      <th>Note File</th>
                      <th>Course Id</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AllNotes.length > 0 ? (
                      AllNotes.map((item, index) => (
                        <>
                          <tr className="holiday-completed">
                            <td>{item.Note_Name}</td>
                            <td>{item.Note_type}</td>
                            <td>
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#show_Note_Description"
                                onClick={() =>
                                  setShow_Note_Description(
                                    item.Note_Description
                                  )
                                }
                                className="btn btn-primary ml-4">
                                Show Description
                              </a>
                            </td>
                            <td>
                              {" "}
                              <a
                                className="btn btn-primary"
                                href={item.Note_File}>
                                Note File Link
                              </a>{" "}
                            </td>
                            <td>{item.courseCourseId}</td>
                            <td>
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#delete_notes"
                                onClick={() => SetNotes_Id(item.Note_Id)}
                                className="edit-icon ml-4">
                                <i className="fa fa-trash-o"></i>
                              </a>
                            </td>
                          </tr>
                        </>
                      ))
                    ) : (
                    
                      <></>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div id="add_Course" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Course</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
           
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label>
                    Course Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="Course_Name"
                    {...register("Course_Name")}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Course Category <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="Course_Category"
                    {...register("Course_Category")}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Course Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    type="text"
                    name="Course_Description"
                    {...register("Course_Description")}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Course Session <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="Course_Session"
                    {...register("Course_Session")}
                  />
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
 
      <div className="modal custom-modal fade" id="delete_course" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Course</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a
                      onClick={() => DeleteCourse()}
                      className="btn btn-primary continue-btn">
                      Delete
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href=""
                      data-bs-dismiss="modal"
                      className="btn btn-primary cancel-btn">
                      Cancel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
      <div id="add_Videos" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Videos</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
           
              <Container>
                <h1 className="text-center">Upload Video</h1>
                {message && <p className="text-center">{message}</p>}
                <Form onSubmit={handleUpload}>
                  <div className="form-group form-focus select-focus">
                    <select
                      value=""
                      onChange={(e) => {
                        setCourseName(e.target.value);
                      }}
                      className="form-control">
                      <option selected>
                        {" "}
                        {!CourseName == "" ? Course_Name[0] : "Select Project"}
                      </option>
                      {AllCourse.length > 0 ? (
                        AllCourse.map((item, index) => (
                          <option>
                            {item.Course_Name} - {item.Course_Id}
                          </option>
                        ))
                      ) : (
                        <option>No Course Found</option>
                      )}
                    </select>
                    <label className="focus-label">Select Course</label>
                  </div>
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="videoLink">
                    <Form.Label>Video Link</Form.Label>
                    <Form.Control
                      type="text"
                      value={videoLink}
                      onChange={(e) => setVideoLink(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      Paste the direct link to the video (e.g.
                      https://www.youtube.com/watch?v=dQw4w9WgXcQ)
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="thumbnailLink">
                    <Form.Label>Thumbnail Link</Form.Label>
                    <Form.Control
                      type="text"
                      value={thumbnailLink}
                      onChange={(e) => setThumbnailLink(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      Paste the direct link to the thumbnail image (e.g.
                      https://i.imgur.com/abc123.jpg)
                    </Form.Text>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Upload
                  </Button>
                </Form>
              </Container>
            </div>
          </div>
        </div>
      </div>
   

      <div className="modal custom-modal fade" id="delete_Video" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Video</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a
                      className="btn btn-primary continue-btn"
                      onClick={() => deleteVideo()}>
                      Delete
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href=""
                      data-bs-dismiss="modal"
                      className="btn btn-primary cancel-btn">
                      Cancel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div id="add_Notes" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Notes</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
      
              <form onSubmit={handleSubmit1(AddNote)}>
                <div className="form-group form-focus select-focus">
                  <select
                    value=""
                    onChange={(e) => {
                      setCourseName(e.target.value);
                    }}
                    className="form-control">
                    <option selected>
                      {" "}
                      {!CourseName == "" ? Course_Name[0] : "Select Project"}
                    </option>
                    {AllCourse.length > 0 ? (
                      AllCourse.map((item, index) => (
                        <option>
                          {item.Course_Name} - {item.Course_Id}
                        </option>
                      ))
                    ) : (
                      <option>No Course Found</option>
                    )}
                  </select>
                  <label className="focus-label">Select Course</label>
                </div>
                <div className="form-group">
                  <label>
                    Note Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="Note_Name"
                    {...register1("Note_Name")}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Note type <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="Note_type"
                    {...register1("Note_type")}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Note File Link<span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="Note_File"
                    {...register1("Note_File")}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Note Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    type="text"
                    name="Note_Description"
                    {...register1("Note_Description")}
                  />
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal custom-modal fade"
        id="show_Note_Description"
        role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Description</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div
                className="py-2"
                style={{ overflowY: "auto", height: "20rem" }}>
                <h3>{show_Note_Description}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
     
      <div className="modal custom-modal fade" id="delete_notes" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Notes</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a
                      onClick={() => DeleteNotes()}
                      className="btn btn-primary continue-btn">
                      Delete
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href=""
                      data-bs-dismiss="modal"
                      className="btn btn-primary cancel-btn">
                      Cancel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
    </div>
  );
};

export default TeacherDashboard;
