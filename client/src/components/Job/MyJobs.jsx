import React from "react";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { message } from "antd";
import { setLoading, hideLoading } from "../../redux/slices/alertSlice";
const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const navigate = useNavigate();
  const { isAuthorized } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const getMyJobs = async () => {
    try {
      dispatch(setLoading());
      const res = await axios.get(
        "http://localhost:4000/api/v1/job/get-my-jobs",
        { withCredentials: true }
      );
      dispatch(hideLoading());
      console.log(res.data);

      if (res.data.status === "success") {
        setMyJobs(res.data.jobs);
      } else if (res.data.status === "fail") {
        message.error(res.data.message);
        message.fail(res.data.message);
        setMyJobs([]);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
      message.error("Failed to get jobs");
      setMyJobs([]);
    }
  };

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = (jobId) => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    const res = await axios.put(
      `http://localhost:4000/api/v1/job/update-jpb/${jobId}`,
      updatedJob,
      { withCredentials: true }
    );
    if (res.data.status === "success") {
      message.success(res.data.message);
      setEditingMode(null);
      getMyJobs();
    } else if (res.data.status === "fail") {
      message.error(res.data.message);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/job/delete-job/${id}`,
        { withCredentials: true }
      );
      if (res.data.status === "success") {
        message.success(res.data.message);
        const newJobs = myJobs.filter((job) => job._id !== id);
        setMyJobs(newJobs);
        getMyJobs();
      } else if (res.data.status === "fail") {
        message.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) => {
      prevJobs.map((job) => {
        job._id === jobId ? { ...job, [field]: value } : job;
      });
    });
  };
  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h3>Your Posted Jobs</h3>
          {myJobs.length > 0 ? (
            <>
              <div className="banner">
                {myJobs.map((myJob) => {
                  return (
                    <div className="card" key={myJob._id}>
                      <div className="content">
                        <div className="short_fields">
                          <div>
                            <span>Title: </span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== myJob._id ? true : false
                              }
                              value={myJob.title}
                              onChange={(e) =>
                                handleInputChange(
                                  myJob._id,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div>
                            <span>Country: </span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== myJob._id ? true : false
                              }
                              value={myJob.country}
                              onChange={(e) =>
                                handleInputChange(
                                  myJob._id,
                                  "country",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <span>City: </span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== myJob._id ? true : false
                              }
                              value={myJob.city}
                              onChange={(e) =>
                                handleInputChange(
                                  myJob._id,
                                  "city",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <span>Category: </span>
                            <select
                              value={myJob.category}
                              onChange={(e) =>
                                handleInputChange(
                                  myJob._id,
                                  "category",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== myJob._id ? true : false
                              }
                            >
                              <option value="">Select Category</option>
                              <option value="Graphics & Design">
                                Graphics & Design
                              </option>
                              <option value="Mobile App Development">
                                Mobile App Development
                              </option>
                              <option value="Frontend Web Development">
                                Frontend Web Development
                              </option>
                              <option value="MERN Stack Development">
                                MERN Stack Development
                              </option>
                              <option value="Artificial Intelligence">
                                Artificial Intelligence
                              </option>
                              <option value="MEVN Stack Development">
                                MEVN Stack Development
                              </option>
                              <option value="Data Entry Operator">
                                Data Entry Operator
                              </option>
                              <option value="Video Animation">
                                Video Animation
                              </option>
                            </select>
                          </div>

                          <div>
                            <span>
                              Salary:{" "}
                              {myJob.fixedSalary ? (
                                <input
                                  type="number"
                                  value={myJob.fixedSalary}
                                  onChange={(e) =>
                                    handleInputChange(
                                      myJob._id,
                                      "fixedSalary",
                                      e.target.value
                                    )
                                  }
                                  disabled={
                                    editingMode !== myJob._id ? true : false
                                  }
                                />
                              ) : (
                                <div>
                                  <input
                                    type="number"
                                    value={myJob.salaryFrom}
                                    onChange={(e) =>
                                      handleInputChange(
                                        myJob._id,
                                        "salaryFrom",
                                        e.target.value
                                      )
                                    }
                                    disabled={
                                      editingMode !== myJob._id ? true : false
                                    }
                                  />

                                  <input
                                    type="number"
                                    value={myJob.salaryTo}
                                    onChange={(e) =>
                                      handleInputChange(
                                        myJob._id,
                                        "salaryTo",
                                        e.target.value
                                      )
                                    }
                                    disabled={
                                      editingMode !== myJob._id ? true : false
                                    }
                                  />
                                </div>
                              )}
                            </span>
                          </div>
                          <div>
                            <span>Expired: </span>
                            <select
                              value={myJob.expired}
                              onChange={(e) =>
                                handleInputChange(
                                  myJob._id,
                                  "expired",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== myJob._id ? true : false
                              }
                            >
                              <option value={true}>True</option>
                              <option value={false}>False</option>
                            </select>
                          </div>
                        </div>

                        <div className="long_field">
                          <div>
                            <span>Decription</span>
                            <textarea
                              rows={5}
                              value={myJob.description}
                              onChange={(e) =>
                                handleInputChange(
                                  myJob._id,
                                  "expired",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== myJob._id ? true : false
                              }
                            />
                          </div>
                          <div>
                            <span>Address: </span>
                            <textarea
                              rows={5}
                              value={myJob.address}
                              onChange={(e) =>
                                handleInputChange(
                                  myJob._id,
                                  "address",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== myJob._id ? true : false
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p>You have not posted any Job!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;
