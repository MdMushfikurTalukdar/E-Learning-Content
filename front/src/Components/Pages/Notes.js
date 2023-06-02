import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { public_api } from '../hooks/baseApi';

const Notes = () => {

    const [AllNotes, setAllNotes] = useState("");

    const GetAllNotes = async () => {
        const data = await public_api().get("/Note");
        setAllNotes(data.data.data);
    };

    useEffect(() => {

        GetAllNotes();

    }, []);

    const [show_Note_Description, setShow_Note_Description] = useState("");
    return (
        <div className="page-wrapper">
            <div className="content container-fluid">
                
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
           
        </div>
    );
};

export default Notes;