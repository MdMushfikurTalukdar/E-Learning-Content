import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './GetVideos.css';

const GetVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/api/v1/Videos');

      if (result.data.status === 'Success') {
        setVideos(result.data.data);
      } else {
        console.log(result.data.message);
      }
    };
    fetchData();
  }, []);

  return (

    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className='row'>
          <h1 className="display-4 text-center mb-5">Video Tutorials</h1>
          <div className="row">
            {videos.map((video) => (
              <div className="col-md-4 mb-5" key={video.id}>
                <div className="card card__custom">
                  <a href={video.videoUrl} target="_blank" rel="noreferrer">
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
    </div>
  );
};

export default GetVideos;
