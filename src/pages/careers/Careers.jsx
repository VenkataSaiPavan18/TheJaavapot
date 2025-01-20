import React, { useState, useEffect } from "react";
import axios from "axios";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useNavigate } from "react-router-dom";
import "./careers.css";
import active from "../../assets/img/careers/play.png";
import inactive from "../../assets/img/careers/play2.png";
import arrow from "../../assets/img/careers/arrow.png";
import uparrow from "../../assets/img/careers/uparrow.png";
import { Box, Typography, CircularProgress } from '@mui/material';
import { PowerSettingsNew, Share, ContentCopy } from '@mui/icons-material';
import loader from '../../assets/img/careers/loader.gif'
// import { color } from "../constants/colors.js";
import shinlogo from "../../assets/img/careers/shinnlog.png";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share';
import "./SocialLinks.css"; 
import { color, myColors } from "../../contants/Colors.js";
const Careers = () => {
  const [openDescriptionId, setOpenDescriptionId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [showActiveJobs, setShowActiveJobs] = useState(false);
  const [jobCounter, setJobCounter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState(false); // State to show copy confirmation
  const navigate = useNavigate(); // Use navigate for navigation
  // const [active, setActive] = useState(false);
  const [activeJobId, setActiveJobId] = useState(null); // State to manage which job's share options are active
  // const [activeShareId, setActiveShareId] = useState(null); // State to track the active share button

  const handleToggle = (jobId) => {
    setActiveJobId(activeJobId === jobId ? null : jobId); // Toggle between opening and closing the share options
  };


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "https://pagoanalytics.azurewebsites.net/get-jobs"
        );
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    setTimeout(fetchJobs, 3000);
  }, []);

  const handleJobClick = (job) => {
    navigate(`/job/${job._id}`, { state: { job } });
  };

  const activeJobsCount = jobs.filter((job) => job.status === "Active").length;

  const handleOpenPositionsClick = () => {
    setShowActiveJobs(!showActiveJobs);
  };

  const handleTeamsShare = (url) => {
    const teamsUrl = `https://teams.microsoft.com/l/chat/0/0?users=your.email@example.com&message=${encodeURIComponent(url)}`;
    window.open(teamsUrl, '_blank');
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "", paddingTop: '80px', minHeight: "100vh" }}>
      <div style={{ textAlign: "center", backgroundColor: "", margin: "20px" }}>
        <p style={{ letterSpacing: "2px", filter: "blur(0.5px)", fontSize: "18px", color: myColors.primaryOrange, fontFamily: "cursive", fontWeight: "bold", display: "inline", textShadow: "2px 2px  2px  5px darkblue", padding: "5px", borderRadius: "10px", margin: "" }}>Powered by SmartHireIn</p>
        <img src={shinlogo} alt="SHIN" style={{ backgroundColor: "whitesmoke", boxShadow: "", height: "40px", width: "40px", borderRadius: "40px", padding: "4px" }} />
      </div>

      <div className="container-fluid">
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}>
          <h3 style={{ textAlign: 'center', color: myColors.primaryOrange }} className="head1">Careers</h3>
          <div>
            <span className="btn btn-primary position-relative" style={{ background: myColors.primaryOrange }} onClick={handleOpenPositionsClick}>
              Open Positions
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {activeJobsCount}
              </span>
            </span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "30px" }}>
          <input
            type="text"
            placeholder="Search by job title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: '20px', padding: '10px', width: "50%" }}
          />
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <img src={loader} alt="Loading..." />
          </div>
        ) : (
          filteredJobs.map(
            (job, index) =>
              (!showActiveJobs || job.status === "Active") && (
                <div
                  className="eachjobsec"
                  key={job._id}
                  style={{
                    position: "relative",
                    paddingBottom: "5%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  <div
                    className="job"
                    style={{
                      backgroundColor: "whitesmoke",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      boxShadow: "0px 9px 15px 0px black",
                      borderTopRightRadius: "10px",
                      borderTopLeftRadius: "10px"
                    }}
                  >
                    <div className="justf" style={{
                      margin: "0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}>
                      <h2 style={{ margin: "10px", color: "#4077bc" }}>
                        {index < 9 ? `0${index + 1}` : index + 1}
                      </h2>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>                        <h3
                          className="titlestyle"
                          style={{ margin: "10px", color: "#4077bc", display: 'flex', justifyContent: 'space-between' }}

                        >
                          {job.title}
                        </h3>


                          <br />

                          {/* <div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <CopyToClipboard
                                text={`${window.location.origin}/job/${job._id}`} // Share the job description route
                                onCopy={() => {
                                  setCopied(true);
                                  alert("The Job Link was Copied");
                                }}
                              >
                                <Share
                                  style={{ marginLeft: '10px', cursor: 'pointer', color: '#4077bc' }}
                                />
                              </CopyToClipboard>

                              <div style={{ marginLeft: '10px', display: 'flex' }}>
                                <LinkedinShareButton url={`${window.location.origin}/job/${job._id}`} style={{ marginLeft: '5px' }}>
                                  <LinkedinIcon size={24} round />
                                </LinkedinShareButton>
                                <WhatsappShareButton url={`${window.location.origin}/job/${job._id}`} style={{ marginLeft: '5px' }}>
                                  <WhatsappIcon size={24} round />
                                </WhatsappShareButton>
                                <button
                                  onClick={() => handleTeamsShare(`${window.location.origin}/job/${job._id}`)}
                                  style={{
                                    backgroundColor: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    marginLeft: '5px',
                                    padding: '6px',
                                  }}
                                >
                                  <img
                                    src="https://img.icons8.com/color/48/000000/microsoft-teams.png"
                                    alt="Microsoft Teams"
                                    style={{ width: '24px', height: '24px' }}
                                  />
                                </button>
                              </div>

                            </div>
                          </div> */}
                        <div style={{display:'flex',justifyContent:'right'}}>
                        <div className="wrapper1">
                            <ul className="listSocial" style={{marginTop:'10px'}}>
                              <li id="listsocialicons" onClick={() => handleToggle(job._id)} className={activeJobId === job._id ? "active" : ""} style={{marginTop:'6px'}}>
                                {/* <a href="/"> */}
                                  <Share style={{color:'white',fontSize:'20px'}}/>
                                {/* </a> */}
                              </li>
                              {activeJobId === job._id && (
                                <>
                                  <li id="listsocialicons" className="active">
                                    <LinkedinShareButton url={`${window.location.origin}/job/${job._id}`} style={{ marginLeft: '5px' }}>
                                      <LinkedinIcon size={30} />
                                    </LinkedinShareButton>
                                  </li>
                                  <li id="listsocialicons" className="active">
                                    <WhatsappShareButton url={`${window.location.origin}/job/${job._id}`} style={{ marginLeft: '5px' }}>
                                      <WhatsappIcon size={30} />
                                    </WhatsappShareButton>
                                  </li>
                                  <li id="listsocialicons" className="active">
                                    <CopyToClipboard
                                      text={`${window.location.origin}/job/${job._id}`} 
                                      onCopy={() => {
                                        setCopied(true);
                                        alert("The Job Link was Copied");
                                      }}
                                    >
                                      <ContentCopy style={{ cursor: 'pointer', color: '#4077bc' }} />
                                    </CopyToClipboard>
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                        </div>

                        <span style={{ fontSize: "10px", color: "white", backgroundColor: "#4077bc", padding: "4px", width: 'fit-content' }}>{job.date}</span>
                        <div style={{
                          display: "flex",
                          maxHeight: "5rem",
                          overflow: "auto",
                          margin: "5px",
                          justifyContent: "",
                          alignItems: "center",
                        }}>
                          <img
                            src={job.iconPath}
                            style={{
                              height: "30%",
                              width: "10%",
                              margin: "10px",
                            }}
                            alt="icon"
                          />
                          <p style={{
                            margin: "10px",
                            color: "black",
                            fontSize: "12px",
                          }}
                            onClick={() => handleJobClick(job)}
                          >
                            {job.Qualifications}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (job.status === "Active") {
                          window.location.href = `/application/${job.title}`;
                        } else {
                          alert("Job is closed");
                        }
                      }}
                      className={`col-2 ${job.status === "Active" ? "activebtn" : "btn-inactive"} applybtn`}
                      style={{
                        color: "#4077bc",
                        fontWeight: "bolder",
                        letterSpacing: "0.5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "5px",
                      }}
                    >
                      Apply{" "}
                      <img
                        className="btnimgs"
                        src={job.status === "Active" ? active : inactive}
                        style={{ borderRadius: "50px" }}
                        alt={job.status === "Active" ? "Active" : "Inactive"}
                      />
                    </button>
                  </div>
                  <span className="job" onClick={() => handleJobClick(job)} style={{
                    color: "blue",
                    textAlign: "right",
                    backgroundColor: "whitesmoke",
                  }}>
                    {openDescriptionId === job._id ? (
                      <img
                        className="zooming-image"
                        src={uparrow}
                        style={{ height: "5%", width: "5%" }}
                        alt="up arrow"
                      />
                    ) : (
                      <img
                        className="zooming-image"
                        src={arrow}
                        style={{ height: "5%", width: "5%" }}
                        alt="down arrow"
                      />
                    )}
                    {openDescriptionId === job._id && (
                      <div className="job" style={{
                        backgroundColor: "whitesmoke",
                        padding: "10px",
                        display: "flex",
                        marginTop: "",
                        flexDirection: "column",
                        textAlign: "left",
                        color: "black",
                      }}>
                        <h4 style={{
                          color: "#4077bc",
                          paddingTop: "30px",
                          textDecoration: "underline",
                        }}>
                          Job Description
                        </h4>
                        <h6 style={{ color: "#4077bc" }}>Qualifications</h6>
                        <p>{job.Qualifications}</p>
                        <h6 style={{ color: "#4077bc" }}>Skills</h6>
                        <p>{job.Skills}</p>
                        <h6 style={{ color: "#4077bc" }}>Position Type</h6>
                        <p>{job.positontype}</p>
                        <h6 style={{ color: "#4077bc" }}>Location</h6>
                        <p>{job.Location}</p>
                      </div>
                    )}
                  </span>
                </div>
              )
          )
        )}
      </div>
    </div>
  );
};

export default Careers;
