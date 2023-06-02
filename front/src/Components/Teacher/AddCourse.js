import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { public_api } from '../hooks/baseApi';

const AddCourse = () => {
    const [loadUpdate, setLoadUpdate] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const onSubmit = async (data) => {
        
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
        setLoadUpdate(true)
        GetAllCourse();
    }, [loadUpdate]);


    const [Course_Id, SetCourse_Id] = useState();
    const DeleteCourse = async () => {
        setLoadUpdate(true)
        try {
            const res = await public_api()
                .delete(`Course/${Course_Id}`)
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
    return (
        <div className="page-wrapper">
            <div className="content container-fluid">
              
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="page-title">Add Course</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/">Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Add Course</li>
                            </ul>
                        </div>
                        <div className="col-auto float-right ml-auto">
                            <a
                                href="#"
                                className="btn add-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#add_Course"
                            >
                                <i className="fa fa-plus" /> Add Course
                            </a>
                        </div>
                    </div>
                </div>
               
                <div className="row m-auto">
                    {AllCourse.length > 0 ? (
                        AllCourse.map((item, index) => (
                            <>
                                <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3" style={{marginBottom:'1.5rem'}}>
                                    <div class="card-group">
                                        <div className="card">
                                           
                                            <div className="card-body">
                                                <div className="dropdown profile-action">
                                                    <a
                                                        href="#"
                                                        className="action-icon dropdown-toggle"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        <i className="material-icons">more_vert</i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete_course"
                                                            onClick={() => SetCourse_Id(item.Course_Id)}
                                                        >
                                                            <i className="fa fa-trash-o m-r-5" /> Delete
                                                        </a>
                                                    </div>
                                                </div>
                                                <h4><Link to={`/course-details/${item.Course_Id}/${item.Course_Name}`}>{item.Course_Name}</Link></h4>
                                                <ul style={{ listStyle: "none", color: "#000" }}>
                                                    <li>
                                                        <h5>
                                                            <span><span style={{ fontWeight: 'bolder' }}>Course Category:</span> {" "} {item.Course_Category}</span>
                                                        </h5>
                                                        <h5>
                                                            <span><span style={{ fontWeight: 'bolder' }}>Course Description:</span> {" "} {item.Course_Description.slice(0, 110)} <Link to={`/course-details/${item.Course_Id}/${item.Course_Name}`}>Loren More...</Link></span>
                                                        </h5>
                                                        <h5>
                                                            <span><span style={{ fontWeight: 'bolder' }}>Course Session:</span> {" "} {item.Course_Session}</span>
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
                        <p style={{ textAlign: "center" }}>No Data Found</p>
                    )}
                </div>
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
                                aria-label="Close"
                            >
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
          
            <div
                className="modal custom-modal fade"
                id="delete_course"
                role="dialog"
            >
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
                                            className="btn btn-primary continue-btn"
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

export default AddCourse;