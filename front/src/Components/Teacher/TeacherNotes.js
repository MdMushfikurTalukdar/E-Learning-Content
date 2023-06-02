import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { public_api } from '../hooks/baseApi';

const TeacherNotes = () => {

    const [loadUpdate, setLoadUpdate] = useState(false);
    const [CourseName, setCourseName] = useState("");
    const Course_Name = CourseName.split('-');
    const Course_Id = Course_Name[1];
    console.log('Course_Id', Course_Id);


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
            const res = await public_api().post("/Note", {
                Note_Name: data.Note_Name,
                Note_type: data.Note_type,
                Note_File: data.Note_File,
                Note_Description: data.Note_Description,
                Note_Id: data.Note_Id,
                courseCourseId: Course_Id
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
    const [AllCourse, setAllCourse] = useState("");
 

    const GetAllCourse = async () => {
        const data = await public_api().get("/Course");
        setAllCourse(data.data.data);
    };
    useEffect(() => {
        setLoadUpdate(true)
     
        GetAllNotes();
        GetAllCourse();
    }, [loadUpdate]);

    const [show_Note_Description, setShow_Note_Description] = useState("");

    const [Note_Id, SetNotes_Id] = useState();
   
    const DeleteNotes = async () => {
        setLoadUpdate(true)
        try {
            const res = await public_api()
                .delete(`Note/${Note_Id}`)
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
                            <h3 className="page-title">Notes</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/">Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Notes</li>
                            </ul>
                        </div>
                        <div className="col-auto float-right ml-auto">
                            <a
                                href="#"
                                className="btn add-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#add_Notes"
                            >
                                <i className="fa fa-plus" /> Add Notes
                            </a>
                        </div>
                    </div>
                </div>
        
                <div className="row">
                    <div className="col-md-12">
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
                                                    <td><a
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#show_Note_Description"
                                                        onClick={() => setShow_Note_Description(item.Note_Description)}
                                                        className="btn btn-primary ml-4"
                                                    >Show Description
                                                    </a></td>
                                                    <td> <a className='btn btn-primary' href={item.Note_File}>Note File Link</a> </td>
                                                    <td>{item.courseCourseId}</td>
                                                    <td>
                                                        <a
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete_notes"
                                                            onClick={() => SetNotes_Id(item.Note_Id)}
                                                            className="edit-icon ml-4"
                                                        >
                                                            <i className="fa fa-trash-o"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </>
                                        ))
                                    ) : (
                                        <p style={{ textAlign: "center" }}>No Data Found</p>
                                    )}
                                </tbody>
                            </table>
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
                                aria-label="Close" >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                           
                            <form onSubmit={handleSubmit(onSubmit)}>
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
                                <div className="form-group">
                                    <label>
                                        Note Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="Note_Name"
                                        {...register("Note_Name")}
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
                                        {...register("Note_type")}
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
                                        {...register("Note_File")}
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
                                        {...register("Note_Description")}
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
                            <div className="py-2" style={{ overflowY: "auto", height: '20rem' }}>
                                <h3>{show_Note_Description}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
            <div
                className="modal custom-modal fade"
                id="delete_notes"
                role="dialog"
            >
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

export default TeacherNotes;