import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './GetVideos.css';
import swal from 'sweetalert';
import { public_api } from '../hooks/baseApi';
const CreateVideos = () => {
  const [loadUpdate, setLoadUpdate] = useState(false);
  const [videos, setVideos] = useState([]);
  const [AllCourse, setAllCourse] = useState("");

  const GetAllCourse = async () => {
    const data = await public_api().get("/Course");
    setAllCourse(data.data.data);
  };
  useEffect(() => {
    setLoadUpdate(true);
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/api/v1/Videos');

      if (result.data.status === 'Success') {
        setVideos(result.data.data);
      } else {
        console.log(result.data.message);
      }
    };
    fetchData();
    GetAllCourse();
  }, [loadUpdate]);

  const [CourseName, setCourseName] = useState("");
  const Course_Name = CourseName.split('-');
  const Course_Id = Course_Name[1];

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [thumbnailLink, setThumbnailLink] = useState('');
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
  
    const newVideo = {
      title: title,
      description: description,
      videoUrl: videoLink,
      thumbnailUrl: thumbnailLink,
      courseCourseId: Course_Id
    };
    try {
      await axios.post('http://localhost:5000/api/v1/Videos/createVideos', newVideo);
      setMessage('Video uploaded successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to upload video.');
    }
  };

  const [Video_Id, setVideoId] = useState();
  console.log("hiudhwiudga",Video_Id)
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
    window.$('#delete_Video').modal('hide');
  };
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
       
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Add Videos</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Add Videos</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn"
                data-bs-toggle="modal"
                data-bs-target="#add_Videos"
              >
                <i className="fa fa-plus" /> Add Videos
              </a>
            </div>
          </div>
        </div>
        
        <div className='row'>
          <h1 className="display-4 text-center mb-5">Video Tutorials</h1>
          <div className="row">
            {videos.map((video) => (
              <div className="col-md-4 mb-5" key={video.id}>
                <div className="card card__custom">
                  <a href={video.videoUrl} target="_blank" rel="noreferrer">
                    <div className="profile-action">
                      <a
                        className='p-1 btn btn-primary btn-sm card__custom-button'
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_Video"
                        onClick={() =>
                          setVideoId(video.Video_Id)
                        }
                        style={{ color: "#fff", fontSize: '15px', fontWeight: 'bolder' }}
                      >
                        <i className="fa fa-trash-o m-r-5" />Delete
                      </a>
                    </div>
                    <img className="card-img-top card__custom-img" src={video.thumbnailUrl} alt="thumbnail" />
                  </a>
                  <div className="card-body">
                    <h5 className="card-title card__custom-title">{video.title}</h5>
                    <p className="card-text card__custom-description">{video.description}</p>
                    <a href={video.videoUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm card__custom-button">View Tutorial</a>
                  </div>
                </div>
              </div>
            ))}
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
                aria-label="Close"
              >
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
                      className="form-control"
                    >
                      <option selected> {
                        !CourseName == "" ? Course_Name[0] : "Select Project"
                      }</option>
                      {AllCourse.length > 0 ?
                        AllCourse.map((item, index) => (
                          <option>
                            {item.Course_Name} - {item.Course_Id}
                          </option>
                        )) : <option>No Course Found</option>}
                    </select>
                    <label className="focus-label">Select Course</label>
                  </div>
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="videoLink">
                    <Form.Label>Video Link</Form.Label>
                    <Form.Control type="text" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} />
                    <Form.Text className="text-muted">
                      Paste the direct link to the video (e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ)
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="thumbnailLink">
                    <Form.Label>Thumbnail Link</Form.Label>
                    <Form.Control type="text" value={thumbnailLink} onChange={(e) => setThumbnailLink(e.target.value)} />
                    <Form.Text className="text-muted">
                      Paste the direct link to the thumbnail image (e.g. https://i.imgur.com/abc123.jpg)
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
      {/* /Add Videos Modal */}

      <div
        className="modal custom-modal fade"
        id="delete_Video"
        role="dialog"
      >
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
                      onClick={() => deleteVideo()}
                    >
                      Delete
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href=""
                      data-bs-dismiss="modal"
                      className="btn btn-primary cancel-btn"
                    >
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

export default CreateVideos;
