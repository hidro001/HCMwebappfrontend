import { useState, useEffect } from "react";
import axios from "axios";

const HRJobFetching = () => {
  const [jobs, setJobs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBudgetJobId, setEditingBudgetJobId] = useState(null);
  const [newBudget, setNewBudget] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  // Get the accessToken from localStorage
  const accessToken = localStorage.getItem("accessToken");

  // Fetch jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/admin/jobs",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const fetchedJobs = response.data.data;

        // Group jobs by department
        const groupedJobs = fetchedJobs.reduce((acc, job) => {
          if (!acc[job.department]) {
            acc[job.department] = [];
          }
          acc[job.department].push(job);
          return acc;
        }, {});

        setJobs(groupedJobs);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch jobs");
        setLoading(false);
      }
    };

    fetchJobs();
  }, [accessToken]);

  // Handle job status update (Vacant or Filled)
  const handleStatusChange = async (jobId, status) => {
    try {
      // API call to update the job status
      await axios.patch(
        `https://apiv2.humanmaximizer.com/api/v1/admin/jobs/${jobId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Update the UI after successful API call
      setJobs((prevJobs) => {
        const updatedJobs = { ...prevJobs };
        for (const department in updatedJobs) {
          updatedJobs[department] = updatedJobs[department].map((job) =>
            job._id === jobId ? { ...job, status } : job
          );
        }
        return updatedJobs;
      });
    } catch (err) {
      setError("Failed to update job status");
    }
  };

  // Handle budget allocation
  const handleBudgetAllocation = async (jobId) => {
    try {
      // API call to allocate budget for the job
      await axios.patch(
        `https://apiv2.humanmaximizer.com/api/v1/admin/jobs/budget/${jobId}`,
        {
          budget: newBudget,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Update the UI after successful budget allocation
      setJobs((prevJobs) => {
        const updatedJobs = { ...prevJobs };
        for (const department in updatedJobs) {
          updatedJobs[department] = updatedJobs[department].map((job) =>
            job._id === jobId ? { ...job, budget: newBudget } : job
          );
        }
        return updatedJobs;
      });

      // Reset editing state
      setEditingBudgetJobId(null);
      setNewBudget("");
    } catch (err) {
      setError("Failed to allocate budget");
    }
  };

  // Handle viewing Job Description (JD)
  const handleViewJD = (imgUrl) => {
    if (imgUrl) {
      // Open the URL in a new tab
      window.open(imgUrl, "_blank");
    } else {
      setError("No Job Description available");
    }
  };

  // Get filtered and sorted jobs
  const getFilteredJobs = () => {
    let filteredJobs = { ...jobs };

    // Filter by department
    if (departmentFilter !== "All") {
      filteredJobs = {
        [departmentFilter]: filteredJobs[departmentFilter] || [],
      };
    }

    // Filter by status
    for (const department in filteredJobs) {
      if (Array.isArray(filteredJobs[department])) {
        filteredJobs[department] = filteredJobs[department].filter((job) =>
          statusFilter === "All"
            ? true
            : job.status.toLowerCase() === statusFilter.toLowerCase()
        );

        // Remove department if no jobs after filtering
        if (filteredJobs[department].length === 0) {
          delete filteredJobs[department];
          continue;
        }

        // Sort jobs by designation
        filteredJobs[department].sort((a, b) => {
          if (sortOrder === "asc") {
            return a.designation.localeCompare(b.designation);
          } else {
            return b.designation.localeCompare(a.designation);
          }
        });
      } else {
        // Remove department if it's not an array
        delete filteredJobs[department];
      }
    }

    return filteredJobs;
  };

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const filteredJobs = getFilteredJobs();

  return (
    <div className="main">
      <div className="ems-content">
        <div className="container">
          <div className="hm-rzr-job-posting">
            <h2 className="title">Job Postings</h2>
            {/* Filters */}
            <div className="filters">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="filter-select"
              >
                <option value="All">All Departments</option>
                {Object.keys(jobs).map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="All">All Status</option>
                <option value="Vacant">Vacant</option>
                <option value="Filled">Filled</option>
              </select>
            </div>

            {Object.keys(filteredJobs).length === 0 ? (
              <p>No job postings available.</p>
            ) : (
              Object.keys(filteredJobs).map((department) => (
                <div key={department} className="department-section">
                  <h3 className="department-title">{department} Jobs</h3>
                  <table className="job-table">
                    <thead>
                      <tr>
                        <th>Designation</th>
                        <th>Budget</th>
                        <th>Status</th>
                        <th>Date Posted</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(filteredJobs[department]) &&
                        filteredJobs[department].map((job) => (
                          <tr key={job._id}>
                            <td>{job.designation}</td>
                            <td>
                              {/* Hide budget allocation controls if status is 'Filled' */}
                              {job.status.toLowerCase() === "filled" ? (
                                <div className="budget-display">
                                  {job.budget || "Not allocated"}
                                </div>
                              ) : editingBudgetJobId === job._id ? (
                                <div className="budget-edit">
                                  <input
                                    type="text"
                                    value={newBudget}
                                    onChange={(e) =>
                                      setNewBudget(e.target.value)
                                    }
                                    className="budget-input"
                                  />
                                  <button
                                    onClick={() =>
                                      handleBudgetAllocation(job._id)
                                    }
                                    className="save-budget-button"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingBudgetJobId(null)}
                                    className="cancel-budget-button"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="budget-display">
                                  {job.budget || "Not allocated"}
                                  <button
                                    onClick={() => {
                                      setEditingBudgetJobId(job._id);
                                      setNewBudget(job.budget || "");
                                    }}
                                    className="allocate-budget-button"
                                  >
                                    Budget
                                  </button>
                                </div>
                              )}
                            </td>
                            <td>
                              {job.status.toLowerCase() === "filled" ? (
                                <span>Filled</span>
                              ) : (
                                <select
                                  value={job.status || "Vacant"}
                                  onChange={(e) =>
                                    handleStatusChange(job._id, e.target.value)
                                  }
                                  className="status-select"
                                >
                                  <option value="Vacant">Vacant</option>
                                  <option value="Filled">Filled</option>
                                </select>
                              )}
                            </td>
                            <td>
                              {new Date(job.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              <div className="razr-hm-job-jd-actions">
                                {job.img && (
                                  <button
                                    className="mark-filled-button"
                                    onClick={() => handleViewJD(job.img)}
                                  >
                                    View JD
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRJobFetching;
