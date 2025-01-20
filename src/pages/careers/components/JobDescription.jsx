import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import active from "../../../assets/img/careers/play.png";
import "../careers.css";
import { myColors } from "../../../contants/Colors";

const JobDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [job, setJob] = useState(location.state?.job || null);
  const [loading, setLoading] = useState(!job);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        if (!job) {
          const response = await axios.get("https://pagoanalytics.azurewebsites.net/get-jobs");
          if (response.status === 200) {
            const fetchedJob = response.data.find((job) => job._id === id);
            if (fetchedJob) {
              setJob(fetchedJob);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, job]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return <div>Job not found.</div>;
  }

  return (
    <div>
      <div style={{ paddingTop: '80px', minHeight: "100vh", position: 'relative' }}>
        <div className="container">
          <button 
            onClick={() => navigate(-1)}
            style={{
              position: 'absolute',
              top: '80px',
              right: '20px',
              backgroundColor: myColors.primaryOrange,
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Back
          </button>

          <h3 className="head1" style={{ textAlign: 'center', color: myColors.primaryOrange }}>
            {job.title}
          </h3>

          <div style={{ padding: "20px", backgroundColor: "whitesmoke", color: "black", borderRadius: "10px", boxShadow: "0px 9px 15px 0px black" }}>
            <h4 style={{ color: myColors.primaryOrange, textDecoration: "underline" }}>
              Job Description
            </h4>
            <h6 style={{ color: myColors.primaryOrange }}>Qualifications</h6>
            <p>{job.Qualifications}</p>
            <h6 style={{ color: myColors.primaryOrange }}>Skills</h6>
            <p>{job.Skills}</p>
            <h6 style={{ color: myColors.primaryOrange }}>Position Type</h6>
            <p>{job.positontype}</p>
            <h6 style={{ color: myColors.primaryOrange }}>Location</h6>
            <p>{job.Location}</p>
            <button 
              onClick={() => {
                if (job.status === "Active") {
                  window.location.href = `/application/${job.title}`;
                } else {
                  alert("Job is closed");
                }
              }}
              style={{
                backgroundColor: myColors.primaryOrange,
                color: 'white',
                padding: '15px 30px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Apply Now
              <img 
                src={active} 
                alt="Apply Now" 
                style={{ marginLeft: '10px', height: '20px', width: '20px' }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;