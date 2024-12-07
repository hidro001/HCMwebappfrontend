import { useState, useEffect } from "react";
import axios from "axios";

const JobFetchSuper = () => {
  const [pendingJobs, setPendingJobs] = useState([]);
  const [filledJobs, setFilledJobs] = useState([]);
  const [loadingFilled, setLoadingFilled] = useState(true);
  const [loadingVacant, setLoadingVacant] = useState(true);
  const [error, setError] = useState(null);

  // Fetch filled jobs separately
  const fetchFilledJobs = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("Access token is missing");
        setLoadingFilled(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/jobs/filled",

        config
      );
      setFilledJobs(response.data.data);
    } catch (err) {
      console.error("Error fetching filled jobs: ", err);
      setError("Failed to load filled jobs");
    } finally {
      setLoadingFilled(false);
    }
  };

  // Fetch vacant jobs separately
  const fetchVacantJobs = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("Access token is missing");
        setLoadingVacant(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/jobs/vacant",

        config
      );
      setPendingJobs(response.data.data);
    } catch (err) {
      console.error("Error fetching vacant jobs: ", err);
      setError("Failed to load vacant jobs");
    } finally {
      setLoadingVacant(false);
    }
  };

  useEffect(() => {
    // Call both APIs separately when the component mounts
    fetchVacantJobs();
    fetchFilledJobs();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="main">
      <div className="ems-content">
        <div className="hm-rzr-spradm-job container">
          <div className="all-head d-flex align-items-center justify-content-between mb-5">
            <h4>Job Vacancies</h4>
          </div>

          {/* Pending Vacancies Section */}
          <h3 className="subtitle">
            <b>Pending Vacancies</b>
          </h3>
          {loadingVacant ? (
            <p>Loading pending vacancies...</p>
          ) : pendingJobs.length > 0 ? (
            <table className="job-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Budget</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingJobs.map((job) => (
                  <tr key={job._id}>
                    <td>{job.department}</td>
                    <td>{job.designation}</td>
                    <td>{job.budget}</td>
                    <td>{job.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No pending vacancies available.</p>
          )}

          {/* Filled Vacancies Section */}
          <h3 className="subtitle">
            <b>Filled Vacancies</b>
          </h3>
          {loadingFilled ? (
            <p>Loading filled vacancies...</p>
          ) : filledJobs.length > 0 ? (
            <table className="job-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Budget</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filledJobs.map((job) => (
                  <tr key={job._id}>
                    <td>{job.department}</td>
                    <td>{job.designation}</td>
                    <td>{job.budget}</td>
                    <td>{job.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No filled vacancies available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobFetchSuper;
